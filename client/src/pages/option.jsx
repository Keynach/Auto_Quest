import { useLocation, useNavigate } from "react-router-dom";
import "./css/option.css";

function OptionPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseCode } = location.state || {};

    return (
        <div className="option-container">
            <h1>Crear Examen para {courseCode}</h1>
            <p>Elige cómo deseas crear el examen:</p>
            
            <div className="options-grid">
                <div 
                    className="option-card"
                    onClick={() => navigate('/upload-form', { state: { courseCode } })}
                >
                    <h2>Subir Archivo</h2>
                    <p>Usa un archivo Markdown (.md) con el formato especificado</p>
                </div>
                
                <div 
                    className="option-card"
                    onClick={() => navigate('/create-exam', { state: { courseCode } })}
                >
                    <h2>Editor de Formulario</h2>
                    <p>Crea el examen manualmente usando nuestro editor</p>
                </div>
            </div>
            
            <button 
                className="back-btn"
                onClick={() => navigate('/dashboard_maestro')}
            >
                Volver
            </button>
        </div>
    );
}

export default OptionPage;