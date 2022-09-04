from django.shortcuts import render
from rest_framework import generics
from .models import Clothing
from .serializers import ClothingSerializer


# Create your views here.

class ClothingListCreate(generics.ListCreateAPIView):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer
