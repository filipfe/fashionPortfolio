from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from rest_framework.exceptions import AuthenticationFailed
from .models import User

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password', 'is_superuser', 'is_staff']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
            
        instance.save()

        return instance

class PasswordResetSerializer(serializers.Serializer):
    email = serializers.EmailField(max_length=255)

    class Meta:
        fields = ['email']

class NewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(max_length=255, write_only=True)
    token = serializers.CharField(max_length=255, write_only=True)
    uidb64 = serializers.CharField(max_length=255, write_only=True)

    class Meta:
        fields = ['password', 'token', 'uidb64']

    def validate(self, attrs):
        try:
            password = attrs.get('password')
            token = attrs.get('token')
            uidb64 = attrs.get('uidb64')

            id = force_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                raise AuthenticationFailed('Link is invalid', 401)

            user.set_password(password)
            user.save()

        except Exception as e:
            raise AuthenticationFailed('Link is invalid', 401)
        return super().validate(attrs)

'''class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('favourites',)'''