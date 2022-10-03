from django.shortcuts import render
from rest_framework import generics
from .models import Clothing
from .serializers import ClothingSerializer

class ClothingView(generics.ListAPIView):
    queryset = Clothing.objects.all()
    serializer_class = ClothingSerializer

def ImagesUrls(request, id):
    obj = Clothing.objects.get(pk=id)
    context= {
        'object': obj
    }
    return render(request, 'dist/index.html', context)
