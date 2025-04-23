import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './css/formGenerator.css';

const FormViewer = () => {
  const [formData, setFormData] = useState(null);
  const [answers, setAnswers] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const savedForm = localStorage.getItem('currentForm');
    if (savedForm) {
      setFormData(JSON.parse(savedForm));
    } else {
      navigate('/upload-form');
    }
  }, [navigate]);

  const handleAnswerChange = (sectionIndex, questionIndex, optionIndex) => {
    setAnswers(prev => ({
      ...prev,
      [`${sectionIndex}-${questionIndex}`]: optionIndex
    }));
  };

  const handleSubmit = () => {
    console.log('Respuestas enviadas:', answers);
    // Enviar las respuestas al backend
    alert('¡Respuestas enviadas correctamente!');
    navigate('/');
  };

  if (!formData) return <div>Cargando formulario...</div>;

  return (
    <div className="form-viewer-container">
      <div className="form-header">
        <h1>{formData.title}</h1>
      </div>
      
      <div className="form-content">
        {formData.sections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="form-section">
            <h2>{section.title}</h2>
            
            {section.questions.map((question, questionIndex) => (
              <div key={questionIndex} className="question-card">
                <h3>{question.text}</h3>
                
                <div className="options-list">
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="option-item">
                      <input
                        type="radio"
                        id={`opt-${sectionIndex}-${questionIndex}-${optionIndex}`}
                        name={`q-${sectionIndex}-${questionIndex}`}
                        onChange={() => handleAnswerChange(sectionIndex, questionIndex, optionIndex)}
                        checked={answers[`${sectionIndex}-${questionIndex}`] === optionIndex}
                      />
                      <label htmlFor={`opt-${sectionIndex}-${questionIndex}-${optionIndex}`}>
                        {option.text}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      
      <button onClick={handleSubmit} className="submit-form-btn">
        Enviar Respuestas
      </button>
    </div>
  );
};

export default FormViewer;