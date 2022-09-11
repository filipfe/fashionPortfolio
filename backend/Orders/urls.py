from django.urls import path
from . import views


urlpatterns = [
    path('api/orders', views.OrderView.as_view()),
    path('api/user-address', views.OrderView.as_view()),
]
