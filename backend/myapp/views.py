from rest_framework import viewsets
from .models import PartDetails, ParameterList, PartInputParameters, PartOutputParameters, ParameterVersionHierarchy
from .serializers import PartDetailsSerializer, ParameterListSerializer, PartInputParametersSerializer, PartOutputParametersSerializer, ParameterVersionHierarchySerializer

class PartDetailsViewSet(viewsets.ModelViewSet):
    queryset = PartDetails.objects.all()
    serializer_class = PartDetailsSerializer

class ParameterListViewSet(viewsets.ModelViewSet):
    queryset = ParameterList.objects.all()
    serializer_class = ParameterListSerializer

class PartInputParametersViewSet(viewsets.ModelViewSet):
    queryset = PartInputParameters.objects.all()
    serializer_class = PartInputParametersSerializer

class PartOutputParametersViewSet(viewsets.ModelViewSet):
    queryset = PartOutputParameters.objects.all()
    serializer_class = PartOutputParametersSerializer

class ParameterVersionHierarchyViewSet(viewsets.ModelViewSet):
    queryset = ParameterVersionHierarchy.objects.all()
    serializer_class = ParameterVersionHierarchySerializer
