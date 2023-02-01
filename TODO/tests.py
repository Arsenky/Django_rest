import json
from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIRequestFactory, force_authenticate, APIClient, APISimpleTestCase, APITestCase
from mixer.backend.django import mixer
from django.contrib.auth.models import User
from .views import UserModelViewSet, ProjectModelViewSet
from .models import User as MyUser, Project, Todo

class TestUserViewSet(TestCase):

    def test_get_list(self): 
        factory = APIRequestFactory() 
        request = factory.get('/api/user/') 
        view = UserModelViewSet.as_view({'get':'list'}) 
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_guest(self):
        factory = APIRequestFactory()
        request = factory.post('/api/user/', {'username':'Gun', 'firstname': 'Александр', 'lastname' : 'Пушкин', 'email' : 'pushka@yandex.ru'}, format='json') 
        view = UserModelViewSet.as_view({'post':'create'}) 
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    # тест не проходит, так как метод create у этой view переопределён
    def test_create_admin(self):
        factory = APIRequestFactory()
        request = factory.post('/api/user/', {'username':'Gun', 'firstname': 'Александр', 'lastname' : 'Пушкин', 'email' : 'pushka@yandex.ru'}, format='json')
        admin = User.objects.create_superuser('admin', 'admin@admin.com','admin123456')
        force_authenticate(request, admin)
        view = UserModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestProjectViewSet(TestCase):

    def test_get_list(self): 
        factory = APIRequestFactory() 
        request = factory.get('/api/Project/') 
        view = ProjectModelViewSet.as_view({'get':'list'}) 
        response = view(request) 
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_get_detail(self):
        project = Project.objects.create(project_name='Пушкин', users_list='Arsenky, Valera', git_link = 'git/pull/10')
        client = APIClient()
        response = client.get(f'/api/Project/{project.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

class TestProjectViewSet(APITestCase):

    def test_create_project(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com','admin123456')
        self.client.login(username='admin', password='admin123456')
        response = self.client.post('/api/Project/', {'project_name' : 'Пушкин', 'users_list' :  'Arsenky, Valera', 'git_link' :'git/pull/10'} )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_create_project1(self):
        admin = User.objects.create_superuser('admin', 'admin@admin.com','admin123456')
        self.client.login(username='admin', password='admin123456')
        project = mixer.blend(Project)
        response = self.client.post('/api/Project/', {'project_name' : project.project_name ,'users_list' :  'Arsenky, Valera', 'git_link' :'git/pull/10'})
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

class TestTodoViewSet(APITestCase):

    def test_get_list(self):
        response = self.client.get('/api/Todo/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    