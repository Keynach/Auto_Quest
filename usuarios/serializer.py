from django.contrib.auth.hashers import make_password
from rest_framework import serializers
from usuarios.models import Maestro, Alumno

class MaestroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Maestro
        fields = "__all__"

    def create(self, validated_data):
        validated_data["contrasena"] = make_password(validated_data["contrasena"])
        return super().create(validated_data)

class AlumnoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alumno
        fields = "__all__"

    def create(self, validated_data):
        validated_data["contrasena"] = make_password(validated_data["contrasena"])
        return super().create(validated_data)