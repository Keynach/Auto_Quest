from rest_framework import viewsets
from .models import Respuesta
from .serializer import respuestaSerializer

# Create your views here.

class RespuestaView(viewsets.ModelViewSet):
    queryset = Respuesta.objects.all()
    serializer_class = respuestaSerializer
    