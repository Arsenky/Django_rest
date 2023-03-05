from rest_framework import serializers
from rest_framework.serializers import HyperlinkedModelSerializer
from .models import Project, Todo, User

class ProjectModelSerializer(HyperlinkedModelSerializer):
    class Meta:
        model = Project
        fields = '__all__'

class TodoModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = Todo
        fields = '__all__'

class UserModelSerializer(HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'firstname', 'lastname' , 'email')

class UserModelSerializerWithFlags(HyperlinkedModelSerializer):

    class Meta:
        model = User
        fields = '__all__'
    
