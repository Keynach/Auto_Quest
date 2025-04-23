import React from 'react';
import MarkdownFormGenerator from './upload_md';

const FormGeneratorPage = () => {
  return (
    <div className="page-container">
      <h1>Generador de Formularios</h1>
      <p>Carga un archivo Markdown para generar un formulario automáticamente</p>
      
      <MarkdownFormGenerator />
      
      <div className="markdown-guide">
        <h3>Guía de formato Markdown:</h3>
        <ul>
          <li><strong># Título del formulario</strong></li>
          <li><strong>## Sección 1</strong> (Encabezado de sección)</li>
          <li>Texto de la pregunta</li>
          <li><strong>- [ ] Opción incorrecta</strong></li>
          <li><strong>- [x] Opción correcta</strong></li>
        </ul>
      </div>
    </div>
  );
};

export default FormGeneratorPage;