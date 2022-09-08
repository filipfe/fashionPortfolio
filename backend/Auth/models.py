from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    email = models.EmailField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
    '''favourites = ArrayField(models.IntegerField(blank=True, default=''), blank=True)'''
    username = None

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []