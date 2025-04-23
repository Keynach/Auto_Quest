import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./css/exam-creator.css";

export default function CreateExam() {
    const location = useLocation();
    const navigate = useNavigate();
    const { courseCode } = location.state || {};
    const [examData, setExamData] = useState({
        title: "",
        sections: [{
            title: "",
            questions: [{
                text: "",
                type: "multiple_choice",
                options: [
                    { text: "", correct: false },
                    { text: "", correct: false }
                ]
            }]
        }]
    });

    const handleInputChange = (sectionIndex, questionIndex, field, value) => {
        const updatedExamData = { ...examData };
        
        if (field === 'sectionTitle') {
            updatedExamData.sections[sectionIndex].title = value;
        } else if (field === 'questionText') {
            updatedExamData.sections[sectionIndex].questions[questionIndex].text = value;
        } else if (field === 'optionText') {
            const [sIdx, qIdx, oIdx] = value.split('-').map(Number);
            updatedExamData.sections[sIdx].questions[qIdx].options[oIdx].text = value;
        }
        
        setExamData(updatedExamData);
    };

    const addSection = () => {
        setExamData({
            ...examData,
            sections: [
                ...examData.sections,
                {
                    title: "",
                    questions: [{
                        text: "",
                        type: "multiple_choice",
                        options: [
                            { text: "", correct: false },
                            { text: "", correct: false }
                        ]
                    }]
                }
            ]
        });
    };

    const addQuestion = (sectionIndex) => {
        const updatedExamData = { ...examData };
        updatedExamData.sections[sectionIndex].questions.push({
            text: "",
            type: "multiple_choice",
            options: [
                { text: "", correct: false },
                { text: "", correct: false }
            ]
        });
        setExamData(updatedExamData);
    };

    const addOption = (sectionIndex, questionIndex) => {
        const updatedExamData = { ...examData };
        updatedExamData.sections[sectionIndex].questions[questionIndex].options.push({
            text: "",
            correct: false
        });
        setExamData(updatedExamData);
    };

    const toggleCorrectOption = (sectionIndex, questionIndex, optionIndex) => {
        const updatedExamData = { ...examData };
        updatedExamData.sections[sectionIndex].questions[questionIndex].options.forEach((opt, idx) => {
            opt.correct = idx === optionIndex;
        });
        setExamData(updatedExamData);
    };

    const saveExam = () => {
        if (!examData.title.trim()) {
            alert("Por favor ingresa un título para el examen");
            return;
        }

        const savedExams = JSON.parse(localStorage.getItem("exams")) || [];
        const newExam = {
            ...examData,
            courseCode,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        
        localStorage.setItem("exams", JSON.stringify([...savedExams, newExam]));
        navigate("/dashboard_maestro");
    };

    return (
        <div className="exam-creator-container">
            <h1>Crear Nuevo Examen</h1>
            <p>Curso: {courseCode}</p>
            
            <div className="exam-title-input">
                <label>Título del Examen:</label>
                <input 
                    type="text" 
                    value={examData.title}
                    onChange={(e) => setExamData({...examData, title: e.target.value})}
                />
            </div>
            
            {examData.sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="exam-section">
                    <div className="section-header">
                        <h2>Sección {sectionIndex + 1}</h2>
                        <input
                            type="text"
                            placeholder="Título de la sección"
                            value={section.title}
                            onChange={(e) => handleInputChange(sectionIndex, null, 'sectionTitle', e.target.value)}
                        />
                    </div>
                    
                    {section.questions.map((question, questionIndex) => (
                        <div key={questionIndex} className="question-card">
                            <div className="question-input">
                                <label>Pregunta {questionIndex + 1}:</label>
                                <input
                                    type="text"
                                    placeholder="Texto de la pregunta"
                                    value={question.text}
                                    onChange={(e) => handleInputChange(sectionIndex, questionIndex, 'questionText', e.target.value)}
                                />
                            </div>
                            
                            <div className="options-list">
                                <h4>Opciones:</h4>
                                {question.options.map((option, optionIndex) => (
                                    <div key={optionIndex} className="option-item">
                                        <input
                                            type="radio"
                                            name={`correct-${sectionIndex}-${questionIndex}`}
                                            checked={option.correct}
                                            onChange={() => toggleCorrectOption(sectionIndex, questionIndex, optionIndex)}
                                        />
                                        <input
                                            type="text"
                                            placeholder={`Opción ${optionIndex + 1}`}
                                            value={option.text}
                                            onChange={(e) => {
                                                const updatedExamData = { ...examData };
                                                updatedExamData.sections[sectionIndex]
                                                    .questions[questionIndex]
                                                    .options[optionIndex]
                                                    .text = e.target.value;
                                                setExamData(updatedExamData);
                                            }}
                                        />
                                    </div>
                                ))}
                                <button 
                                    className="add-option-btn"
                                    onClick={() => addOption(sectionIndex, questionIndex)}
                                >
                                    + Añadir Opción
                                </button>
                            </div>
                        </div>
                    ))}
                    
                    <button 
                        className="add-question-btn"
                        onClick={() => addQuestion(sectionIndex)}
                    >
                        + Añadir Pregunta
                    </button>
                </div>
            ))}
            
            <div className="exam-actions">
                <button className="add-section-btn" onClick={addSection}>
                    + Añadir Sección
                </button>
                <button className="save-exam-btn" onClick={saveExam}>
                    Guardar Examen
                </button>
            </div>
        </div>
    );
}