from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('api/signup', views.SignUpView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/logout', views.LogoutView.as_view()),
    path('api/signup/activate', views.VerifyEmailView.as_view()),
    path('signup/activate', views.index, name='activate-account'),
    path('login/recovery/<uidb64>/<token>', views.index, name='password-reset-confirm'),
    path('api/login/recovery/<uidb64>/<token>', views.PasswordTokenCheckAPI.as_view()),
    path('api/login/recovery/complete', views.NewPasswordAPIView.as_view(), name='complete'),
    path('api/login/recovery', views.PasswordResetView.as_view(), name='recovery'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='token_refresh'),
]
