from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo

class ProjectModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__'
    
