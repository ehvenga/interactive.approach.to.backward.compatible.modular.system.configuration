from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PartDetailsViewSet, ParameterListViewSet, PartInputParametersViewSet, PartOutputParametersViewSet, ParameterVersionHierarchyViewSet

router = DefaultRouter()
router.register(r'partdetails', PartDetailsViewSet)
router.register(r'parameterlist', ParameterListViewSet)
router.register(r'partinputparameters', PartInputParametersViewSet)
router.register(r'partoutputparameters', PartOutputParametersViewSet)
router.register(r'parameterversionhierarchy', ParameterVersionHierarchyViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]
