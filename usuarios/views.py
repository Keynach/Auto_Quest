from usuarios.models import Maestro, Alumno

from .serializer import MaestroSerializer, AlumnoSerializer
from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from usuarios.models import Alumno, Maestro
from django.contrib.auth.hashers import check_password
from rest_framework import status


@api_view(["POST"])
def login_view(request):
    email = request.data.get("email")
    password = request.data.get("password")

    # Verifica si el correo pertenece a un Alumno
    usuario = None
    try:
        usuario = Alumno.objects.get(correo=email)
    except Alumno.DoesNotExist:
        try:
            usuario = Maestro.objects.get(correo=email)
        except Maestro.DoesNotExist:
            return Response({"error": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)

    # Verificar la contraseña
    if check_password(password, usuario.contrasena):
        return Response({
            "token": "fake-jwt-token", 
            "user": {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "email": usuario.correo,
                "tipo": "maestro" if isinstance(usuario, Maestro) else "alumno",
            }
        })
    else:
        return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_400_BAD_REQUEST)

class MaestroView(viewsets.ModelViewSet):
    queryset = Maestro.objects.all()
    serializer_class = MaestroSerializer

class AlumnoView(viewsets.ModelViewSet):
    queryset = Alumno.objects.all()
    serializer_class = AlumnoSerializer
    from django.contrib.auth.hashers import check_password

