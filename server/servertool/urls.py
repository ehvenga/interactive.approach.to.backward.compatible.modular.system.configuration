from django.urls import path
from .views import ParameterListView, InputParameterListView, OutputParameterListView, WebServiceListView, InitialGoalParameterListView, GetResultView

urlpatterns = [
    path('parameters/', ParameterListView.as_view(), name='parameters'),
    path('parts/', WebServiceListView.as_view(), name='parts'),
    path('inputparameters/', InputParameterListView.as_view(), name='inputparameters'),
    path('outputparameters/', OutputParameterListView.as_view(), name='outputparameters'),
    path('initialgoalparameters/', InitialGoalParameterListView.as_view(), name='initialgoalparameters'),
    path('get_result/', GetResultView.as_view(), name='get_result'),
]
