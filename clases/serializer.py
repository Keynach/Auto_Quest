from rest_framework import serializers
from .models import Clase


class claseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = '__all__'
        