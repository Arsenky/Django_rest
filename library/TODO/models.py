from django.db import models
from uuid import uuid4

# суперпользователь: логин - django, пароль - rest

class User(models.Model):
    id = models.UUIDField(default = uuid4, primary_key = True)
    username = models.CharField(max_length=32, unique = True)
    firstname = models.CharField(max_length=32)
    lastname = models.CharField(max_length=32)
    email = models.EmailField(max_length=32, unique = True)
    is_superuser = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)

    def __str__ (self):
        return self.username


class Project(models.Model):
    id = models.UUIDField(default = uuid4, primary_key = True)
    project_name = models.CharField(max_length=64)
    users_list = models.ManyToManyField(User)
    git_link = models.CharField(max_length=64)


    def __str__ (self):
        return self.project_name


class Todo(models.Model):
    id = models.UUIDField(default = uuid4, primary_key = True)
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.CharField(max_length=64)
    is_active = models.BooleanField(default=True)
    text = models.CharField(max_length=256, default='Пусто')
