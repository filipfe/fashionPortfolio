from django.shortcuts import render
from rest_framework import generics
from .models import Clothing
from .serializers import ClothingSerializer


class ClothingListCreate(generics.ListCreateAPIView):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer

def ImagesUrls(request, id):
    obj = Clothing.objects.get(id=id)
    context= {
        'object': obj
    }
    return render(request, 'dist/index.html', context)
