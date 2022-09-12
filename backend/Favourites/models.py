from django.db import models
from Auth.models import User
from ClothingApi.models import Clothing

# Create your models here.

class Favourite(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(default=0)
    clothing_id = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {} - {} - {}".format(self.id,
                                               self.user_id,
                                               self.clothing_id,
                                               self.created_at,
                                               self.updated_at)