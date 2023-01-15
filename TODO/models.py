from django.db import models
from uuid import uuid4

class Project(models.Model):
    id = models.UUIDField(default = uuid4, primary_key = True)
    project_name = models.CharField(max_length=64)
    users_list = models.CharField(max_length=256)
    git_link = models.CharField(max_length=64)


class Todo(models.Model):
    id = models.UUIDField(default = uuid4, primary_key = True)
    project_name = models.ForeignKey(Project, on_delete=models.CASCADE)
    create_date = models.DateTimeField(auto_now=False, auto_now_add=True)
    updated_date = models.DateTimeField(auto_now=True, auto_now_add=False)
    creator = models.CharField(max_length=64)
    is_active = models.BooleanField(default=True)
    text = models.CharField(max_length=256, default='Пусто')
