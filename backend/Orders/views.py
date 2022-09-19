from rest_framework import generics
from .models import Order, UserAddress
from .serializers import OrderSerializer, UserAddressSerializer



# Create your views here.

class OrderView(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

class UserAddressView(generics.ListCreateAPIView):
    queryset = UserAddress.objects.all()
    serializer_class = UserAddressSerializer
