from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, filters
from .models import Favourite
from .serializers import FavouriteSerializer, FavouriteUserIdSerializer
from Auth.models import User


# Create your views here.


class FavouriteView(generics.ListCreateAPIView):
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer

class RemoveFavouriteView(generics.DestroyAPIView):
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer
    
class FavouriteUserIdView(generics.GenericAPIView):
    serializer_class = FavouriteUserIdSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        favourite = Favourite.objects.filter(user=serializer.data['user_id']).values()

        return Response(favourite)


    