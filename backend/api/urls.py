from django.urls import path
from . import views

urlpatterns = [
    path('api', views.FoodViewSet.as_view({'get': 'list', 'post': 'create'})),
    path('order', views.order),
]
