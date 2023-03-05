from django_filters import rest_framework 
from .models import Project, Todo


class ProjectFilter(rest_framework.FilterSet):
    project_name = rest_framework.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = Project
        fields = ['project_name']

class TodoFilter(rest_framework.FilterSet):
    project_name = rest_framework.CharFilter(lookup_expr='contains')
    
    class Meta:
        model = Todo
        fields = ['project_name']