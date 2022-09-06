from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup', views.RegisterView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/user', views.UserView.as_view()),
    path('api/logout', views.LogoutView.as_view()),
]