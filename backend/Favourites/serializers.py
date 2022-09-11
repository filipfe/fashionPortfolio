from rest_framework import serializers
from .models import Favourite

class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = ('id', 'user_id', 'clothing_id', 'created_at', 'updated_at')