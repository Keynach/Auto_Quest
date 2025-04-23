#from django.db import models
#
## Cambia "Clases" a "Clase"
#class Formulario(models.Model):
#    nombre = models.CharField(max_length=50)
#    formulario = models.FileField(upload_to='formularios/')
#    clase = models.ForeignKey('clases.Clase', on_delete=models.CASCADE)
#
#    def __str__(self):
#        return self.nombre
# models.py
from django.db import models

class Formulario(models.Model):
    file = models.FileField(upload_to='formularios/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Markdown File uploaded at {self.uploaded_at}"
