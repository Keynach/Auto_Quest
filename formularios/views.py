from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
import json
import os
from datetime import datetime

@csrf_exempt
def generate_form(request):
    if request.method == 'POST':
        try:
            # Guardar el archivo subido
            uploaded_file = request.FILES['file']
            file_name = f"md_forms/{datetime.now().strftime('%Y%m%d%H%M%S')}_{uploaded_file.name}"
            file_path = default_storage.save(file_name, uploaded_file)
            
            # Procesar los datos parseados
            parsed_data = json.loads(request.POST['parsed_data'])
            
            # Aquí puedes guardar en tu base de datos
            # Ejemplo:
            # form = Form(
            #     title=parsed_data['title'],
            #     content=parsed_data,
            #     original_file=file_path
            # )
            # form.save()
            
            return JsonResponse({
                'status': 'success',
                'form_data': parsed_data,
                'file_path': file_path
            })
        except Exception as e:
            return JsonResponse({
                'status': 'error',
                'message': str(e)
            }, status=400)
    
    return JsonResponse({'status': 'invalid_method'}, status=405)