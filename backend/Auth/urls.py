from django.urls import path
from . import views



urlpatterns = [
    path('api/signup', views.RegisterView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/user', views.UserView.as_view()),
    path('api/logout', views.LogoutView.as_view()),
    path('api/signup/activate', views.VerifyEmail.as_view()),
    path('signup/activate', views.index, name='activate-account'),
    path('login/recovery/<uidb64>/<token>', views.index, name='password-reset-confirm'),
    path('api/login/recovery/<uidb64>/<token>', views.PasswordTokenCheckAPI.as_view()),
    path('api/login/recovery/complete', views.NewPasswordAPIView.as_view(), name='complete'),
    path('api/login/recovery', views.PasswordResetView.as_view(), name='recovery'),
]
