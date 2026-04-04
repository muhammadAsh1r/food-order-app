from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'api', views.FoodViewSet, basename='food')

urlpatterns = [
    path('', include(router.urls)),
    path('order/', views.order),
]
