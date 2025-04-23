import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/student-exams.css";

export default function StudentExams() {
    const { courseCode } = useParams();
    const navigate = useNavigate();
    const [exams, setExams] = useState([]);
    const [course, setCourse] = useState(null);
    const [studentAnswers, setStudentAnswers] = useState({});

    useEffect(() => {
        const savedExams = JSON.parse(localStorage.getItem("exams")) || [];
        const studentCourses = JSON.parse(localStorage.getItem("studentCourses")) || [];
        
        const courseExams = savedExams.filter(exam => exam.courseCode === courseCode);
        const currentCourse = studentCourses.find(c => c.code === courseCode);
        
        setExams(courseExams);
        setCourse(currentCourse);
    }, [courseCode]);

    const handleAnswerChange = (examId, questionId, answer) => {
        setStudentAnswers(prev => ({
            ...prev,
            [examId]: {
                ...prev[examId],
                [questionId]: answer
            }
        }));
    };

    const submitExam = (examId) => {
        if (!window.confirm("¿Estás seguro de que quieres enviar este examen? No podrás modificarlo después.")) {
            return;
        }

        const examResults = {
            examId,
            courseCode,
            answers: studentAnswers[examId] || {},
            submittedAt: new Date().toISOString(),
            studentId: localStorage.getItem("studentId")
        };
        
        const savedResults = JSON.parse(localStorage.getItem("examResults")) || [];
        localStorage.setItem("examResults", JSON.stringify([...savedResults, examResults]));
        
        alert("Examen enviado correctamente");
        navigate(`/cursos/${courseCode}/examenes`);
    };

    if (!course) return <div className="loading">Cargando...</div>;

    return (
        <div className="student-exams-container">
            <div className="course-header">
                <h1>{course.name}</h1>
                <p>Semestre: {course.semester} - Grupo: {course.group}</p>
                <button 
                    className="back-button"
                    onClick={() => navigate(`/dashboard_alumno`)}
                >
                    Volver a mis cursos
                </button>
            </div>
            
            {exams.length === 0 ? (
                <div className="no-exams">
                    <p>No hay exámenes disponibles para este curso</p>
                </div>
            ) : (
                exams.map(exam => (
                    <div key={exam.id} className="exam-card">
                        <div className="exam-header">
                            <h2>{exam.title}</h2>
                            <p className="exam-date">
                                Creado: {new Date(exam.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        
                        <div className="exam-questions">
                            {exam.sections.map((section, sectionIndex) => (
                                <div key={sectionIndex} className="exam-section">
                                    {section.title && <h3>{section.title}</h3>}
                                    
                                    {section.questions.map((question, questionIndex) => (
                                        <div key={questionIndex} className="exam-question">
                                            <p className="question-text">
                                                {questionIndex + 1}. {question.text}
                                            </p>
                                            
                                            <div className="question-options">
                                                {question.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className="option">
                                                        <input
                                                            type="radio"
                                                            name={`${exam.id}-${sectionIndex}-${questionIndex}`}
                                                            id={`${exam.id}-${sectionIndex}-${questionIndex}-${optionIndex}`}
                                                            onChange={() => handleAnswerChange(
                                                                exam.id, 
                                                                `${sectionIndex}-${questionIndex}`, 
                                                                optionIndex
                                                            )}
                                                            checked={
                                                                studentAnswers[exam.id]?.[`${sectionIndex}-${questionIndex}`] === optionIndex
                                                            }
                                                            disabled={localStorage.getItem(`examSubmitted-${exam.id}`)}
                                                        />
                                                        <label 
                                                            htmlFor={`${exam.id}-${sectionIndex}-${questionIndex}-${optionIndex}`}
                                                        >
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
                        
                        {!localStorage.getItem(`examSubmitted-${exam.id}`) ? (
                            <button 
                                onClick={() => submitExam(exam.id)}
                                className="submit-exam-btn"
                            >
                                Enviar Examen
                            </button>
                        ) : (
                            <div className="exam-submitted">
                                <p>✔ Examen enviado el {new Date(
                                    JSON.parse(localStorage.getItem("examResults"))
                                    .find(r => r.examId === exam.id)?.submittedAt
                                ).toLocaleString()}</p>
                            </div>
                        )}
                    </div>
                ))
            )}
        </div>
    );
}