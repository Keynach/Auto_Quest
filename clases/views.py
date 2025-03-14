from rest_framework import viewsets
from .models import Clase
from .serializer import claseSerializer

# Create your views here.
class ClaseView(viewsets.ModelViewSet):
    queryset = Clase.objects.all()
    serializer_class = claseSerializer