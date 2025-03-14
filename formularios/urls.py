from formularios import views
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'formularios', views.FormularioView, 'formularios')


urlpatterns = router.urls