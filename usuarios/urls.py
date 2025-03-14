from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MaestroView, AlumnoView, login_view

router = DefaultRouter()
router.register(r'maestro', MaestroView)
router.register(r'alumno', AlumnoView)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name="login"), 
]