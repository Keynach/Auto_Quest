from django.contrib.auth.models import User
from django.db import models

# Clase para representar a un maestro
class Maestro(models.Model):
    nombre = models.CharField(max_length=100,  blank=True)
    correo = models.EmailField(default="no-email@default.com")
    #contraseña
    contrasena = models.CharField(max_length=100,default='contraseña123')
    
    numero_cuenta = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.nombre

# Clase para representar a un alumno
class Alumno(models.Model):
    nombre = models.CharField(max_length=100, blank=True)
    correo = models.EmailField(default="no-email@default.com")
    #contraseña
    contrasena = models.CharField(max_length=100, default='contraseña123')
    matricula = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return self.nombre

