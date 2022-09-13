from django.urls import path
from . import views


urlpatterns = [
    path('api/favourites', views.FavouriteView.as_view()),
    path('api/favourites/remove/<int:pk>', views.RemoveFavouriteView.as_view()),
    path('api/favourites/id', views.FavouriteUserIdView.as_view()),
]
