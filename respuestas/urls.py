from respuestas import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'respuestas', views.RespuestaView, 'respuestas')

urlpatterns = router.urls
