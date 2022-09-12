from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import generics, status
from .models import Favourite
from .serializers import FavouriteSerializer
from rest_framework.generics import get_object_or_404

# Create your views here.

class FavouriteView(generics.ListCreateAPIView):
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer
    '''def post(self, request, *args, **kwargs):
        
        
        return self.create(request, *args, **kwargs)

    def delete(self, request, id):
        item = Favourite.objects.get(id=id)
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)'''



class RemoveFavouriteView(generics.DestroyAPIView):
    queryset = Favourite.objects.all()
    serializer_class = FavouriteSerializer

    