from django.db import models
from Auth.models import User
from ClothingApi.models import Clothing

# Create your models here.

class Favourite(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    clothing_id = models.ForeignKey(Clothing, on_delete=models.SET_NULL, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {} - {} - {}".format(self.id,
                                               self.user_id,
                                               self.clothing_id,
                                               self.created_at,
                                               self.updated_at)