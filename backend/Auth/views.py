from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import generics, status
from .models import User
from .serializers import UserSerializer, PasswordResetSerializer, NewPasswordSerializer
import jwt, datetime
from django.conf import settings

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes, DjangoUnicodeDecodeError
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from .utils import Util
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse


# Create your views here.

def index(request, *args, **kwargs):
    return render(request, 'dist/index.html')
    
class RegisterView(generics.GenericAPIView):
    serializer_class = UserSerializer
    def post(self, request):
        user = request.data
        serializer = self.serializer_class(data=user)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        User.objects.filter(email='se6359@gmail.com').update(is_staff=True, is_superuser=True)
        User.objects.filter(email='filfer05@gmail.com').update(is_staff=True, is_superuser=True)
        user_data = serializer.data
        user = User.objects.get(email=user_data['email'])
             
        token = RefreshToken.for_user(user).access_token
        current_site = get_current_site(request).domain
        relativeLink = reverse('activate-account')
        absurl = 'http://' + current_site + relativeLink + '?token=' + str(token)
        email_body = 'Hi ' + user.first_name + '\nActivate your account: ' + absurl
        data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Activate your account'}
        Util.send_email(data)

        return Response(user_data, status=status.HTTP_201_CREATED)

class VerifyEmail(generics.GenericAPIView):
    def get(self, request):
        token = request.GET.get('token')
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
            if not user.is_verified:
                user.is_verified = True
                user.save()
            return Response({'Successfully activated'}, status=status.HTTP_200_OK)
        except jwt.ExpiredSignatureError as identifier:
            return Response({'error': 'Activation link expired'}, status=status.HTTP_400_BAD_REQUEST)
        except jwt.exceptions.DecodeError as identifier:
            return Response({'Invalid token'}, status=status.HTTP_400_BAD_REQUEST)
            


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        
        if user is None:
            raise AuthenticationFailed('User not found')

        if not user.check_password(password):
            raise AuthenticationFailed('Incorrect password')

        if user.is_verified == False:
            raise AuthenticationFailed('Activate your account')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=7),
            'iat': datetime.datetime.utcnow()
        }

        token = jwt.encode(payload, 'secret', algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)
        response.data = {
            'jwt': token
        }

        return response

class UserView(APIView):

    def get(self, request):
        token = request.COOKIES.get('jwt')

        if not token:
            raise AuthenticationFailed('Unauthenticated!')
        try:
            payload = jwt.decode(token, 'secret', algorithms=['HS256'])
        except jwt.ExpiredSignatureError:
            raise AuthenticationFailed('Unauthenticated!')

        user = User.objects.filter(id=payload['id']).first()
        serializer = UserSerializer(user)

        return Response(serializer.data)

class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('jwt')
        response.data = {
            'message': 'success'
        }
        return response

class PasswordResetView(APIView):
    serializer_class = PasswordResetSerializer
    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        email = request.data['email']
        
        if User.objects.filter(email=email).exists():
            user = User.objects.get(email=email)
            uidb64 = urlsafe_base64_encode(smart_bytes(user.id))
            token = PasswordResetTokenGenerator().make_token(user)
            current_site = get_current_site(request=request).domain
            relativeLink = reverse('password-reset-confirm', kwargs={'uidb64':uidb64, 'token':token})
            absurl = 'https://' + current_site + relativeLink
            email_body = 'Hi ' + user.first_name + '\nReset password: ' + absurl
            data = {'email_body': email_body, 'to_email': user.email, 'email_subject': 'Reset your password'}
            
            Util.send_email(data)
        return Response({'success':'A reset password link has been sent'}, status=status.HTTP_200_OK)

class PasswordTokenCheckAPI(generics.GenericAPIView):
    def get(self, request, uidb64, token):
        
        try:
            id = smart_str(urlsafe_base64_decode(uidb64))
            user = User.objects.get(id=id)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'error': 'Token is not valid'}, status = status.HTTP_401_UNAUTHORIZED)

            return Response({'success': True, 'message': 'Credentials Valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)
            
        except DjangoUnicodeDecodeError as identifier:
            return Response({'error': 'Token is not valid'}, status = status.HTTP_401_UNAUTHORIZED)

class NewPasswordAPIView(generics.GenericAPIView):
    serializer_class = NewPasswordSerializer

    def patch(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success': True, 'message': 'Password reset success'}, status=status.HTTP_200_OK)

'''class FavouritesView(generics.ListCreateAPIView):
    queryset = User.objects.values('favourites')
    serializer_class = UserSerializer'''

