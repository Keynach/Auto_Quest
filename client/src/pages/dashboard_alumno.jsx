import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/estudiante.css";

export default function DashboardAlumno() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem("courses");
        return savedCourses ? JSON.parse(savedCourses) : [
            { name: "Matemáticas", semester: "1", group: "A", code: "123456" },
            { name: "Física", semester: "2", group: "B", code: "654321" }
        ];
    });
    const [studentCourses, setStudentCourses] = useState(() => {
        const savedStudentCourses = localStorage.getItem("studentCourses");
        return savedStudentCourses ? JSON.parse(savedStudentCourses) : [];
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [classCode, setClassCode] = useState("");
    const [showJoinForm, setShowJoinForm] = useState(false);

    useEffect(() => {
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("studentCourses", JSON.stringify(studentCourses));
    }, [courses, studentCourses]);

    const joinCourse = () => {
        // Buscar en los cursos del maestro (teacherCourses)
        const teacherCourses = JSON.parse(localStorage.getItem("teacherCourses")) || [];
        const foundCourse = teacherCourses.find(course => course.code === classCode);
        
        if (foundCourse) {
            const studentCourses = JSON.parse(localStorage.getItem("studentCourses")) || [];
            
            if (!studentCourses.some(course => course.code === foundCourse.code)) {
                setStudentCourses([...studentCourses, foundCourse]);
                alert("Te has unido al curso exitosamente.");
            } else {
                alert("Ya estás inscrito en este curso.");
            }
        } else {
            alert("Código de clase incorrecto.");
        }
        setShowJoinForm(false);
        setClassCode("");
    };

    return (
        <div className="container">
            <header>
                <h1>AutoQuest.ai Classroom</h1>
                <nav>
                    <ul>
                        <li><button onClick={() => setSelectedCourse(null)}>Cursos</button></li>
                        <li><button>Configuración</button></li>
                        <li><button onClick={() => window.location.href = "/"}>Cerrar Sesión</button></li>
                    </ul>
                </nav>
            </header>

            <main>
                {!selectedCourse ? (
                    <div>
                        <h2>Mis Cursos</h2>
                        <div className="courses-grid">
                            {studentCourses.map(course => (
                                <div 
                                    key={course.code} 
                                    className="course-card" 
                                    onClick={() => setSelectedCourse(course)}
                                >
                                    <h3>{course.name}</h3>
                                    <p>Semestre: {course.semester} - Grupo: {course.group}</p>
                                    <button 
                                        className="view-exams-btn"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigate(`/cursos/${course.code}/examenes`);
                                        }}
                                    >
                                        Ver Exámenes
                                    </button>
                                </div>
                            ))}
                            <div 
                                className="course-card add-course-card" 
                                onClick={() => setShowJoinForm(true)}
                            >
                                <span style={{ fontSize: "2rem" }}>+</span>
                                <p>Unirse a un Curso</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="course-details">
                        <h2>{selectedCourse.name}</h2>
                        <p>Semestre: {selectedCourse.semester} - Grupo: {selectedCourse.group}</p>
                        <button 
                            className="view-exams-btn"
                            onClick={() => navigate(`/cursos/${selectedCourse.code}/examenes`)}
                        >
                            Ver Exámenes
                        </button>
                    </div>
                )}
            </main>

            {showJoinForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Unirse a un Curso</h3>
                        <input 
                            type="text" 
                            placeholder="Código de Clase" 
                            value={classCode}
                            onChange={(e) => setClassCode(e.target.value)} 
                        />
                        <div className="modal-buttons">
                            <button onClick={joinCourse}>Unirse</button>
                            <button onClick={() => setShowJoinForm(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}