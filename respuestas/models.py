from django.db import models

# Create your models here.
from django.db import models
from django.contrib.auth.models import User
from formularios.models import Formulario  # Asegúrate de importar el modelo Formulario

# Modelo de respuesta
class Respuesta(models.Model):
    alumno = models.ForeignKey(User, on_delete=models.CASCADE)  # Relacionar con el usuario (alumno)
    formulario = models.ForeignKey(Formulario, on_delete=models.CASCADE)  # Relacionar con el formulario
    respuestas = models.JSONField()  # Guardar respuestas en formato JSON

    def __str__(self):
        return f'Respuestas de {self.alumno.username} al formulario {self.formulario.nombre}'
