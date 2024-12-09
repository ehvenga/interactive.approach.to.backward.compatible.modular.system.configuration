from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.forms.models import model_to_dict
import json
import random
import subprocess

from .models import Inputparameter, Webservicelist, Outputparameter, Initialgoalparameter, Parameterlist, Result
from .serializers import (
    InputParameterSerializer,
    WebServiceListSerializer,
    OutputParameterSerializer,
    InitialGoalParameterSerializer,
    ParameterListSerializer,
    WebServiceSerializer
)

#####################################
# Helper Functions
#####################################
def has_common_member(list1, list2):
    """Check if two lists have at least one common member."""
    return any(item in list1 for item in list2)

def write_knowledge_to_table(transactID, parameter_ids, iorg):
    """
    Writes knowledge parameters (initials or goals) to the table.
    """
    for param_id in parameter_ids:
        parameter_instance = Parameterlist.objects.get(parameterid=param_id)
        Initialgoalparameter.objects.create(
            transactionid=transactID, 
            iorg=iorg, 
            parameterid=parameter_instance
        )


#####################################
# Parameter List
#####################################
class ParameterListView(APIView):
    def get(self, request):
        parameters = Parameterlist.objects.filter(parameterid__startswith='pr')
        serializer = ParameterListSerializer(parameters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ParameterListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParameterDetailView(APIView):
    def delete(self, request, parameterid):
        try:
            param = Parameterlist.objects.get(parameterid=parameterid)
        except Parameterlist.DoesNotExist:
            raise Http404("Parameter not found")
        
        param.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#####################################
# Parts (Web Services)
#####################################
class WebServiceListView(APIView):
    def get(self, request):
        web_services = Webservicelist.objects.filter(webserviceid__startswith='P')
        # Use a serializer that includes all fields: webserviceid, webservicename, reputation, price, duration, provider, url
        serializer = WebServiceListSerializer(web_services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # Add a new part
        serializer = WebServiceListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class WebServiceDetailView(APIView):
    def delete(self, request, webserviceid):
        try:
            ws = Webservicelist.objects.get(webserviceid=webserviceid)
        except Webservicelist.DoesNotExist:
            raise Http404("Part not found")

        ws.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#####################################
# Input Parameters
#####################################
class InputParameterListView(APIView):
    def get(self, request):
        input_parameters = Inputparameter.objects.filter(parameterid__startswith='pr')
        serializer = InputParameterSerializer(input_parameters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = InputParameterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class InputParameterDetailView(APIView):
    def delete(self, request, webserviceid, parameterid):
        try:
            ip = Inputparameter.objects.get(webserviceid=webserviceid, parameterid=parameterid)
        except Inputparameter.DoesNotExist:
            raise Http404("Input Parameter not found")

        ip.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#####################################
# Output Parameters
#####################################
class OutputParameterListView(APIView):
    def get(self, request):
        output_parameters = Outputparameter.objects.filter(parameterid__startswith='pr')
        serializer = OutputParameterSerializer(output_parameters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = OutputParameterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class OutputParameterDetailView(APIView):
    def delete(self, request, webserviceid, parameterid):
        try:
            op = Outputparameter.objects.get(webserviceid=webserviceid, parameterid=parameterid)
        except Outputparameter.DoesNotExist:
            raise Http404("Output Parameter not found")

        op.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


#####################################
# Initial Goal Parameters
#####################################
class InitialGoalParameterListView(APIView):
    def get(self, request):
        initial_goal_parameters = Initialgoalparameter.objects.all()
        filtered_parameters = [
            param for param in initial_goal_parameters
            if param.parameterid.parameterid.startswith('pr')
        ]
        serializer = InitialGoalParameterSerializer(filtered_parameters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = InitialGoalParameterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    # No DELETE as per instructions


#####################################
# Filtered WebService View (parameters/filter/)
#####################################
class FilteredWebServiceView(APIView):
    def post(self, request):
        parameters = request.data.get('parameters', [])
        if not parameters or not isinstance(parameters, list):
            return Response({"error": "Please provide a valid list of parameters."}, status=status.HTTP_400_BAD_REQUEST)

        input_matches = Inputparameter.objects.filter(parameterid__in=parameters).values_list('webserviceid', flat=True)
        webservice_ids = set(input_matches)
        web_services = Webservicelist.objects.filter(webserviceid__in=webservice_ids)

        response_data = []
        for service in web_services:
            input_params = Inputparameter.objects.filter(webserviceid=service.webserviceid).values_list('parameterid', flat=True)
            output_params = Outputparameter.objects.filter(webserviceid=service.webserviceid).values_list('parameterid', flat=True)
            response_data.append({
                "webserviceid": service.webserviceid,
                "webservicename": service.webservicename,
                "input_parameters": list(input_params),
                "output_parameters": list(output_params),
            })

        return Response(response_data, status=status.HTTP_200_OK)


#####################################
# get_result Endpoint
#####################################
@method_decorator(csrf_exempt, name='dispatch')
class GetResultView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)
            initials, goals, depth, child = self.parse_request_data(data)

            transactID = self.generate_transaction_id()
            self.write_initials_and_goals(transactID, initials, goals)
            self.run_external_process(transactID, depth, child)
            results = self.fetch_results(transactID)

            return JsonResponse({'transactionID': transactID, 'results': results}, status=200)

        except ValueError as ve:
            return JsonResponse({'error': str(ve)}, status=400)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)

    def parse_request_data(self, data):
        initials = data.get('initials', [])
        goals = data.get('goals', [])
        depth = data.get('depth', '0')
        child = data.get('child', '0')

        if not initials or not goals:
            raise ValueError('Initials or goals are missing')

        if has_common_member(initials, goals):
            raise ValueError('Initials and goals should not overlap')

        return initials, goals, depth, child

    def generate_transaction_id(self):
        random.seed()
        return random.randint(9000000, 10000000)

    def write_initials_and_goals(self, transactID, initials, goals):
        write_knowledge_to_table(transactID, initials, 'I')
        write_knowledge_to_table(transactID, goals, 'G')

    def run_external_process(self, transactID, depth, child):
        subprocess.call([
            'java', '-jar', 'C:\\AutoPlan\\AutoWSC-AIPSYooMath.jar',
            str(transactID), depth, child
        ])

    def fetch_results(self, transactID):
        lCourseObj = []
        resultList = Result.objects.filter(transactionid=transactID).order_by('stage')

        webservice_ids = [res.webserviceid for res in resultList]
        courses = Webservicelist.objects.filter(webserviceid__in=webservice_ids)
        courses_dict = {course.webserviceid: course for course in courses}

        input_params = Inputparameter.objects.filter(webserviceid__in=webservice_ids)
        output_params = Outputparameter.objects.filter(webserviceid__in=webservice_ids)

        input_params_dict = {}
        for ip in input_params:
            input_params_dict.setdefault(ip.webserviceid, []).append(ip.parameterid)

        output_params_dict = {}
        for op in output_params:
            output_params_dict.setdefault(op.webserviceid, []).append(op.parameterid)

        for res in resultList:
            webserviceid = res.webserviceid
            course = courses_dict.get(webserviceid)
            if not course:
                continue

            course_dict = model_to_dict(course)
            course_dict['stage'] = res.stage
            course_dict['input_parameters'] = input_params_dict.get(webserviceid, [])
            course_dict['output_parameters'] = output_params_dict.get(webserviceid, [])
            lCourseObj.append(course_dict)

        return lCourseObj


#####################################
# End of Views
#####################################


