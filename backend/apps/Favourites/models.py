from django.db import models
from apps.Auth.models import User
from apps.Clothing.models import Clothing

class Favourite(models.Model):
    user_id = models.ForeignKey(
        User, on_delete=models.CASCADE)
    clothing_id = models.ForeignKey(
        Clothing, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {} - {} - {}".format(self.pk,
                                               self.user_id,
                                               self.clothing_id,
                                               self.created_at,
                                               self.updated_at)