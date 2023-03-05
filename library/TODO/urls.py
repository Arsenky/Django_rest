from django.urls import path 
from.views import UserModelViewSet

app_name ='userapp' 
urlpatterns = [ 
    path('', UserModelViewSet.as_view({'get': 'list','put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'})), 
    ]