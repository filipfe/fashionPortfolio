from django.urls import path
from . import views
from django.conf.urls.static import static
from django.conf import settings
from .models import Clothing


urlpatterns = [
    path('clothing/api/', views.ClothingListCreate.as_view()),
    path('clothing/<int:id>', views.ImagesUrls),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
