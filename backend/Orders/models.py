from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class Order(models.Model):
    id = models.AutoField
    user_id = models.IntegerField(default=0)
    '''ordered_clothes = ArrayField(models.IntegerField(blank=True, default=''), blank=True)'''
    order_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

phone_number_regex = RegexValidator(regex = r"^\+?1?\d{8,15}$")

class UserAddress(models.Model):
    id = models.AutoField
    user_id = models.IntegerField(default=0)
    address = models.CharField(max_length=128)
    city = models.CharField(max_length=128)
    postal_code = models.CharField(max_length=5)
    country = models.CharField(max_length=128)
    phone_number = models.CharField(validators = [phone_number_regex], max_length = 16, unique = True)

    def __str__(self):
        return str(self.id)

