from rest_framework import serializers
from .models import Clothing

class ClothingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clothing
        fields = ('title', 'price', 'sale', 'type', 'sex', 'trending', 'collection', 'new', 'image', )