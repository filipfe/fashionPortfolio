from audioop import reverse
from csv import reader
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from .models import Order, UserAddress
from .serializers import OrderSerializer, UserAddressSerializer
from django.conf import settings
from decimal import Decimal
from paypal.standard.forms import PayPalPaymentsForm
from django.views.decorators.csrf import csrf_exempt


# Create your views here.

class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class UserAddressView(generics.ListCreateAPIView):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer