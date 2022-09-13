from rest_framework import serializers
from .models import Order, UserAddress

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ('id', 'user_id', 'order_date', 'created_at', 'updated_at')

class UserAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAddress
        fields = ('id', 'user_id', 'name', 'surname', 'country', 'region', 'city', 'postal_code', 'address', 'company', 'phone_number', 'created_at', 'updated_at')