from django.urls import path
from . import views

urlpatterns = [
    path('clothing/api/', views.ClothingListCreate.as_view()),
]