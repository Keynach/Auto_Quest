from django.contrib import admin

# Register your models here.
from django.contrib import admin
from .models import Maestro, Alumno

admin.site.register(Maestro)
admin.site.register(Alumno)
