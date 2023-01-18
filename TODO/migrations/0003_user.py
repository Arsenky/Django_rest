# Generated by Django 4.1.3 on 2023-01-18 17:47

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('TODO', '0002_todo_text'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=32, unique=True)),
                ('firstname', models.CharField(max_length=32)),
                ('lastname', models.CharField(max_length=32)),
                ('email', models.EmailField(max_length=32, unique=True)),
            ],
        ),
    ]
