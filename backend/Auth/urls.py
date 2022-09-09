from django.urls import path
from . import views


urlpatterns = [
    path('api/signup', views.RegisterView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/user', views.UserView.as_view()),
    path('api/logout', views.LogoutView.as_view()),
    path('login/recovery/<uidb64>/token', views.PasswordTokenCheckAPI.as_view(), name='password-reset-confirm'),
]