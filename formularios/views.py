from .models import Formulario
# formularios/views.py
from .serializer import FormularioSerializer  # Asegúrate de que el nombre coincida exactamente

from rest_framework import viewsets


# Create your views here.
class FormularioView(viewsets.ModelViewSet):
    queryset = Formulario.objects.all()
    serializer_class = FormularioSerializer