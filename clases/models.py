from django.db import models
from formularios.models import Formulario

# Cambia "Clases" a "Clase"
class Clase(models.Model):
    nombre = models.CharField(max_length=50)
    profesor = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    alumnos = models.ManyToManyField('auth.User', related_name='alumnos')

    def __str__(self):
        return self.nombre
