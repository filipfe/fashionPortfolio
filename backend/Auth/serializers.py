from rest_framework import serializers
from .models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse

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

    def validate(self, attrs):
        email = attrs['data'].get('email', '')
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(user.id)
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=attrs['data'].get('request')).domain
            relativeLink = reverse('password-reset-confirm', kwargs={'uidb64':uidb64, 'token':token})
            absurl = 'https://' + current_site + relativeLink
            email_body = 'Hi' + user.first_name + '\n Reset password: ' + absurl
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your password'}
            
            Util.send_email(data)

        return super().validate(attrs)




'''class FavouritesSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('favourites',)'''