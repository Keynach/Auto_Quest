from django.urls import path, include
from rest_framework import routers
from clases import views

#api versioning
router = routers.DefaultRouter()
router.register(r'clases', views.ClaseView, 'clases')

urlpatterns = router.urls

