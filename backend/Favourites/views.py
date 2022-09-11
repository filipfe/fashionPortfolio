from django.shortcuts import render
from rest_framework import generics
from .models import Favourite
from .serializers import FavouriteSerializer

# Create your views here.

class FavouriteView(generics.CreateAPIView):
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer

class RemoveFavouriteView(generics.DestroyAPIView):
    pass