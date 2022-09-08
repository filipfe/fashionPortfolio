from django.urls import path
from . import views


urlpatterns = [
    path('api/signup', views.RegisterView.as_view()),
    path('api/login', views.LoginView.as_view()),
    path('api/user', views.UserView.as_view()),
    path('api/logout', views.LogoutView.as_view()),
]