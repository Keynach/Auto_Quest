# forms.py
from django import forms

class formulario(forms.Form):
    file = forms.FileField()
