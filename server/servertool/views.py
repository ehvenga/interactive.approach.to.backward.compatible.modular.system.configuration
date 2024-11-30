from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.http import JsonResponse
import random
import subprocess
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.views import View
from django.forms.models import model_to_dict
import json
from .models import Inputparameter, Webservicelist, Outputparameter, Initialgoalparameter, Parameterlist, Result
from .serializers import InputParameterSerializer, WebServiceListSerializer, OutputParameterSerializer, InitialGoalParameterSerializer, ParameterListSerializer


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


class WebServiceListView(APIView):
    def get(self, request):
        web_services = Webservicelist.objects.filter(webserviceid__startswith='P')
        serializer = WebServiceListSerializer(web_services, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

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

class InitialGoalParameterListView(APIView):
    def get(self, request):
        # Fetch all initial goal parameters
        initial_goal_parameters = Initialgoalparameter.objects.all()
        
        # Filter objects where parameterid starts with 'pr'
        filtered_parameters = [
            param for param in initial_goal_parameters
            if param.parameterid.parameterid.startswith('pr')  # Assuming `parameterid` is a ForeignKey and has a field `parameterid`
        ]
        
        serializer = InitialGoalParameterSerializer(filtered_parameters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = InitialGoalParameterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ParameterListView(APIView):
    def get(self, request):
        # Fetch parameters that start with 'pr'
        parameters = Parameterlist.objects.filter(parameterid__startswith='pr')
        serializer = ParameterListSerializer(parameters, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ParameterListSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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


@method_decorator(csrf_exempt, name='dispatch')
class GetResultView(View):
    def post(self, request):
        try:
            data = json.loads(request.body)  # Parse the JSON body
            initials = data.get('initials', [])
            goals = data.get('knowledges', [])
            depth = data.get('depth', '0')
            child = data.get('child', '0')

            if not initials or not goals:
                return JsonResponse({'error': 'Initials or goals are missing'}, status=400)

            if has_common_member(initials, goals):
                return JsonResponse({'error': 'Initials and goals should not overlap'}, status=400)

            # Generate transaction ID
            random.seed()
            transactID = random.randint(900000, 1000000)

            # Write initials and goals to the database
            write_knowledge_to_table(transactID, initials, 'I')
            write_knowledge_to_table(transactID, goals, 'G')
            print('init: ', initials, goals, transactID, depth, child,)

            # Run external Java process
            subprocess.call(['java', '-jar', 'C:\\AutoPlan\\AutoWSC-AIPSYooMath.jar', str(transactID), depth, child])

            # Fetch results
            lCourseObj = []
            resultList = Result.objects.filter(transactionid=transactID).order_by('stage')
            print('resultList:',resultList)
            for res in resultList:
              course = Webservicelist.objects.get(webserviceid=res.webserviceid)
              course.stage = res.stage
              lCourseObj.append(model_to_dict(course))

            # Return results as JSON
            return JsonResponse({
              'transactionID': transactID,
              'results': lCourseObj
            }, status=200)

        except Parameterlist.DoesNotExist as e:
            return JsonResponse({'error': f'Parameter ID not found: {str(e)}'}, status=400)

        except Exception as e:
            return JsonResponse({'error': str(e)}, status=500)
