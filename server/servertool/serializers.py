from rest_framework import serializers
from .models import Inputparameter, Webservicelist, Outputparameter, Initialgoalparameter, Parameterlist

class InputParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inputparameter
        fields = '__all__'


class WebServiceListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webservicelist
        fields = '__all__'

class WebServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Webservicelist
        fields = ('webserviceid', 'webservicename')

class OutputParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outputparameter
        fields = '__all__'  # Include all fields in the model

class InitialGoalParameterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Initialgoalparameter
        fields = '__all__'

class ParameterListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parameterlist
        fields = '__all__'  # Includes all fields in the model