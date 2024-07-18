from rest_framework import serializers
from .models import PartDetails, ParameterList, PartInputParameters, PartOutputParameters, ParameterVersionHierarchy

class PartDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = PartDetails
        fields = ['partId', 'partName', 'partCost']

class ParameterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParameterList
        fields = ['parameterId', 'parameterName']

class PartInputParametersSerializer(serializers.ModelSerializer):
    part = PartDetailsSerializer()
    partInputParameter = ParameterListSerializer()

    class Meta:
        model = PartInputParameters
        fields = ['part', 'partInputParameter']

class PartOutputParametersSerializer(serializers.ModelSerializer):
    part = PartDetailsSerializer()
    partOutputParameter = ParameterListSerializer()

    class Meta:
        model = PartOutputParameters
        fields = ['part', 'partOutputParameter']

class ParameterVersionHierarchySerializer(serializers.ModelSerializer):
    parentParameter = ParameterListSerializer()
    childParameter = ParameterListSerializer()

    class Meta:
        model = ParameterVersionHierarchy
        fields = ['parentParameter', 'childParameter']
