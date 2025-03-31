# Auto_Quest

**Plataforma Automatizada de Creación de Formularios con Retroalimentación con IA**

## Descripción

Auto_Quest es una plataforma diseñada para automatizar la creación de formularios y proporcionar retroalimentación inteligente utilizando inteligencia artificial. Facilita la generación y gestión de formularios, mejorando la eficiencia y precisión en la recopilación de datos.

## Características

- **Automatización de formularios:** Genera formularios personalizados de manera automática según las necesidades del usuario.
- **Retroalimentación con IA:** Utiliza algoritmos de inteligencia artificial para ofrecer sugerencias y mejoras en tiempo real.
- **Gestión de respuestas:** Almacena y organiza las respuestas de los formularios para un análisis eficiente.
- **Interfaz amigable:** Diseñada para ser intuitiva y fácil de usar, incluso para usuarios sin experiencia técnica.

## Estructura del Proyecto

El repositorio está organizado de la siguiente manera:

- `Auto_quest_api/`: Contiene la lógica principal de la API y las configuraciones relacionadas.
- `clases/`: Incluye las definiciones de clases utilizadas en el proyecto.
- `client/`: Contiene los archivos relacionados con el cliente o la interfaz de usuario.
- `formularios/`: Almacena plantillas y configuraciones de formularios predefinidos.
- `respuestas/`: Directorio donde se gestionan las respuestas recopiladas de los formularios.
- `usuarios/`: Maneja la información y autenticación de los usuarios.
- `venv/`: Entorno virtual que contiene las dependencias del proyecto.
- `db.sqlite3`: Base de datos SQLite utilizada para almacenar información del proyecto.
- `manage.py`: Script de gestión principal para ejecutar comandos administrativos de Django.

## Instalación

Para configurar el proyecto en tu entorno local, sigue estos pasos:

1. **Clona el repositorio:**
   
   ```bash
   git clone https://github.com/keynach/Auto_Quest.git
   ```

2. **Navega al directorio del proyecto:**
   
   ```bash
   cd Auto_Quest
   ```

3. **Activa el entorno virtual:**
   
   - En sistemas Unix o MacOS:
     
     ```bash
     source venv/bin/activate
     ```
   - En sistemas Windows:
     
     ```bash
     venv\Scripts\activate
     ```

4. **Instala las dependencias requeridas:**
   
   ```bash
   pip install -r requirements.txt
   ```

5. **Inicia el servidor de desarrollo:**
   
   ```bash
   python manage.py runserver 192.168.1.161:8000
   
   ```
   
   El proyecto estará disponible en `http://127.0.0.1:8000/`.

6. **Inicia el servidor de FrontEnd**
   
   ```bash
   npm run dev -- --host
   ```

## Uso

1. **Accede a la plataforma** a través del navegador en la dirección proporcionada anteriormente.
2. **Crea un nuevo formulario** utilizando las opciones disponibles en la interfaz.
3. **Comparte el formulario** con los destinatarios deseados.
4. **Recibe y analiza las respuestas** con la retroalimentación proporcionada por la IA integrada.

## Dudas:

Comuniquese con mi amigo [chat]([ChatGPT - Error ModuleNotFound corsheaders](https://chatgpt.com/share/67ea0273-35b0-8005-b13f-31b4e7915c7a))
