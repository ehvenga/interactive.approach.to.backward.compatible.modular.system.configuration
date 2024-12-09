from django.urls import path
from .views import (
    ParameterListView, InputParameterListView, OutputParameterListView, WebServiceListView,
    InitialGoalParameterListView, GetResultView, FilteredWebServiceView,
    ParameterDetailView, WebServiceDetailView, InputParameterDetailView, OutputParameterDetailView
)

urlpatterns = [
    # Parameter Endpoints
    path('parameters/', ParameterListView.as_view(), name='parameters'),
    path('parameters/<str:parameterid>', ParameterDetailView.as_view(), name='parameter-detail'),

    # Parts (Web Services) Endpoints
    path('parts/', WebServiceListView.as_view(), name='parts'),
    path('parts/<str:webserviceid>', WebServiceDetailView.as_view(), name='part-detail'),

    # Input Parameters
    path('inputparameters/', InputParameterListView.as_view(), name='inputparameters'),
    path('inputparameters/<str:webserviceid>/<str:parameterid>', InputParameterDetailView.as_view(), name='inputparameter-detail'),

    # Output Parameters
    path('outputparameters/', OutputParameterListView.as_view(), name='outputparameters'),
    path('outputparameters/<str:webserviceid>/<str:parameterid>', OutputParameterDetailView.as_view(), name='outputparameter-detail'),

    # Initial Goal Parameters
    path('initialgoalparameters/', InitialGoalParameterListView.as_view(), name='initialgoalparameters'),

    # Result and Filtering
    path('get_result', GetResultView.as_view(), name='get_result'),
    path('parameters/filter/', FilteredWebServiceView.as_view(), name='filtered-webservices'),
]
