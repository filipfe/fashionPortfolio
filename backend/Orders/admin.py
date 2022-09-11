from django.contrib import admin
from Orders.models import Order, UserAddress
# Register your models here.

admin.site.register(Order)
admin.site.register(UserAddress)

