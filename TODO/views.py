from django.shortcuts import render
from rest_framework.viewsets import ModelViewSet
from .models import Project, Todo, User
from .serializers import ProjectModelSerializer, TodoModelSerializer, UserModelSerializer, UserModelSerializerWithFlags
from rest_framework.pagination import LimitOffsetPagination
from .filters import ProjectFilter, TodoFilter
from rest_framework import status
from rest_framework.response import Response


class ProjectPag(LimitOffsetPagination): 
   default_limit = 10

class TodoPag(LimitOffsetPagination): 
   default_limit = 20

class ProjectModelViewSet(ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer
    pagination_class = ProjectPag
    filterset_class = ProjectFilter

class TodoModelViewSet(ModelViewSet):
    queryset = Todo.objects.all()
    serializer_class = TodoModelSerializer
    pagination_class = TodoPag
    filterset_class = TodoFilter

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        instance.is_active = False
        instance.save()
        return Response('Обьект удалён.')

class UserModelViewSet(ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserModelSerializer

    def destroy(self, request, *args, **kwargs):
        return Response('Вы не можете удалять пользователей через API')

    def create(self, request, *args, **kwargs):
        return Response('Вы не можете создавать  пользователей через API')

    def get_serializer_class(self): 
        if self.request.version =='0.2': 
            return UserModelSerializerWithFlags 
        return UserModelSerializer
