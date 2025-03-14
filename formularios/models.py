from django.db import models

# Cambia "Clases" a "Clase"
class Formulario(models.Model):
    nombre = models.CharField(max_length=50)
    formulario = models.FileField(upload_to='formularios/')
    clase = models.ForeignKey('clases.Clase', on_delete=models.CASCADE)

    def __str__(self):
        return self.nombre
