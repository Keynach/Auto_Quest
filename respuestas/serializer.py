from rest_framework import serializers
from .models import Respuesta


class respuestaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Respuesta
        fields = '__all__'