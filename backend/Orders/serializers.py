from email.headerregistry import Address
from rest_framework import serializers
from .models import Order, UserAddress

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'user_id', 'order_date')

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ('id', 'user_id', 'address', 'city', 'postal_code', 'country', 'phone_number')