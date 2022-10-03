from rest_framework import serializers
from .models import Favourite

class FavouriteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Favourite
        fields = '__all__'

class FavouriteUserIdSerializer(serializers.Serializer):
    user_id = serializers.IntegerField(default=0)
    class Meta:
        fields = ['user_id']
