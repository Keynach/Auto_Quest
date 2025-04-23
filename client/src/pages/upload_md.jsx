import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MDEditor from "@uiw/react-md-editor";
import ReactMarkdown from "react-markdown";
import "./css/upload_md.css";

export default function UploadMarkdownPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseCode } = location.state || {};
    const [file, setFile] = useState(null);
    const [markdown, setMarkdown] = useState("");
    const [error, setError] = useState("");
    const [activeTab, setActiveTab] = useState("upload"); // 'upload' o 'editor'

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.name.endsWith('.md')) {
            setFile(selectedFile);
            
            // Leer el contenido del archivo
            const reader = new FileReader();
            reader.onload = (e) => {
                setMarkdown(e.target.result);
            };
            reader.readAsText(selectedFile);
            
            setError("");
        } else {
            setError("Por favor, selecciona un archivo .md válido");
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!file && !markdown) {
            setError("Debes seleccionar un archivo o crear un examen");
            return;
        }

        const examContent = file ? markdown : `# Examen\n\n${markdown}`;
        
        // Guardar el examen en localStorage
        const exams = JSON.parse(localStorage.getItem("exams")) || [];
        const newExam = {
            id: Date.now().toString(),
            courseCode,
            title: file ? file.name.replace('.md', '') : "Nuevo Examen",
            content: examContent,
            createdAt: new Date().toISOString(),
            type: "markdown"
        };
        
        localStorage.setItem("exams", JSON.stringify([...exams, newExam]));
        navigate(`/dashboard_maestro`);
    };

    return (
        <div className="upload-markdown-container">
            <h1>Subir Examen Markdown</h1>
            <p>Curso: {courseCode}</p>
            
            <div className="tab-buttons">
                <button 
                    className={`tab-button ${activeTab === 'upload' ? 'active' : ''}`}
                    onClick={() => setActiveTab('upload')}
                >
                    Subir Archivo
                </button>
                <button 
                    className={`tab-button ${activeTab === 'editor' ? 'active' : ''}`}
                    onClick={() => setActiveTab('editor')}
                >
                    Crear con Editor
                </button>
            </div>
            
            <form onSubmit={handleSubmit} className="upload-form">
                {activeTab === 'upload' ? (
                    <div className="file-input-container">
                        <input 
                            type="file" 
                            id="markdown-file" 
                            accept=".md" 
                            onChange={handleFileChange}
                            className="file-input"
                        />
                        <label htmlFor="markdown-file" className="file-label">
                            {file ? file.name : "Seleccionar archivo .md"}
                        </label>
                    </div>
                ) : (
                    <div className="editor-container">
                        <MDEditor
                            value={markdown}
                            onChange={setMarkdown}
                            height={300}
                            preview="edit"
                        />
                        <div className="preview-container">
                            <h4>Vista Previa:</h4>
                            <div className="markdown-preview">
                                <ReactMarkdown>{markdown || "*Escribe tu examen aquí...*"}</ReactMarkdown>
                            </div>
                        </div>
                    </div>
                )}
                
                {error && <p className="error-message">{error}</p>}
                
                <div className="separator"></div>
                
                <div className="form-actions">
                    <button 
                        type="button" 
                        className="cancel-btn"
                        onClick={() => navigate('/dashboard_maestro')}
                    >
                        CANCELAR
                    </button>
                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={!file && !markdown}
                    >
                        {activeTab === 'upload' ? 'SUBIR EXAMEN' : 'GUARDAR EXAMEN'}
                    </button>
                </div>
            </form>
            
            <div className="markdown-guide">
                <h3>Formato requerido:</h3>
                <ul>
                    <li># Título del Examen</li>
                    <li>## Sección 1</li>
                    <li>Texto de la pregunta</li>
                    <li>- [ ] Opción incorrecta</li>
                    <li>- [x] Opción correcta</li>
                    <li>- [ ] Otra opción incorrecta</li>
                    <li>## Sección 2</li>
                    <li>Otra pregunta</li>
                    <li>- [x] Respuesta correcta</li>
                    <li>- [ ] Incorrecta</li>
                </ul>
            </div>
        </div>
    );
}