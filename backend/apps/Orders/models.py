from django.db import models
from django.core.validators import RegexValidator

# Create your models here.

class Order(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {} - {}".format(self.id,
                                          self.user_id,
                                          self.created_at,
                                          self.updated_at)

phone_number_regex = RegexValidator(regex = r"^\+?1?\d{8,15}$")

class UserAddress(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(default=0)
    name = models.CharField(max_length=255, default='')
    surname = models.CharField(max_length=255, blank=True)
    country = models.CharField(max_length=255)
    region = models.CharField(max_length=255, blank=True)
    city = models.CharField(max_length=255)
    postal_code = models.CharField(max_length=5)
    address = models.CharField(max_length=255)
    company = models.CharField(max_length=255, blank=True)
    phone_number = models.CharField(validators = [phone_number_regex], max_length = 16, unique = True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {} - {} - {} - {} - {} - {} - {}".format(self.id,
                                                                   self.user_id,
                                                                   self.phone_number,
                                                                   self.country,
                                                                   self.city,
                                                                   self.postal_code,
                                                                   self.address,
                                                                   self.created_at,
                                                                   self.updated_at)

class UserPayment(models.Model):
    id = models.AutoField(primary_key=True)
    user_id = models.IntegerField(default=0)
    payment_type = models.CharField(max_length=255)
    provider = models.CharField(max_length=255)
    account_no = models.IntegerField(default=0, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return "{} - {} - {} - {} - {} - {} - {}".format(self.id,
                                                         self.user_id,
                                                         self.payment_type,
                                                         self.provider,
                                                         self.account_no,
                                                         self.created_at,
                                                         self.updated_at)


    

