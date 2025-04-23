import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/maestro.css";

export default function DashboardMaestro() {
    const navigate = useNavigate();
    const [courses, setCourses] = useState(() => {
        const savedCourses = localStorage.getItem("teacherCourses");
        return savedCourses ? JSON.parse(savedCourses) : [];
    });
    const [exams, setExams] = useState(() => {
        return JSON.parse(localStorage.getItem("exams")) || [];
    });
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newCourse, setNewCourse] = useState({ name: "", semester: "", group: "" });

    useEffect(() => {
        localStorage.setItem("teacherCourses", JSON.stringify(courses));
        localStorage.setItem("exams", JSON.stringify(exams));
    }, [courses, exams]);

    const generateClassCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const saveNewCourse = () => {
        if (!newCourse.name || !newCourse.semester || !newCourse.group) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        const classCode = generateClassCode();
        const newCourseData = { ...newCourse, code: classCode };
        setCourses([...courses, newCourseData]);
        setShowForm(false);
        setNewCourse({ name: "", semester: "", group: "" });
    };

    const saveExam = (examData) => {
        if (!selectedCourse) return;
        
        const newExam = {
            ...examData,
            courseCode: selectedCourse.code,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        };
        setExams([...exams, newExam]);
        navigate("/dashboard_maestro");
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
                            {courses.map(course => (
                                <div key={course.code} className="course-card" onClick={() => setSelectedCourse(course)}>
                                    <h3>{course.name}</h3>
                                    <p>Semestre: {course.semester} - Grupo: {course.group}</p>
                                    <p>Código: {course.code}</p>
                                </div>
                            ))}
                            <div className="course-card add-course-card" onClick={() => setShowForm(true)}>
                                <span style={{ fontSize: "2rem" }}>+</span>
                                <p>Añadir Curso</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="course-details">
                        <h2>{selectedCourse.name}</h2>
                        <p>Semestre: {selectedCourse.semester} - Grupo: {selectedCourse.group}</p>
                        <p>Código: {selectedCourse.code}</p>
                        <button 
                            className="add-exam-button" 
                            onClick={() => navigate("/dashboard_maestro/option", { state: { courseCode: selectedCourse.code } })}
                        >
                            Añadir Examen
                        </button>
                    </div>
                )}
            </main>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Crear Nuevo Curso</h3>
                        <input 
                            type="text" 
                            name="name" 
                            placeholder="Nombre del curso" 
                            value={newCourse.name}
                            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            name="semester" 
                            placeholder="Semestre" 
                            value={newCourse.semester}
                            onChange={(e) => setNewCourse({ ...newCourse, semester: e.target.value })} 
                        />
                        <input 
                            type="text" 
                            name="group" 
                            placeholder="Grupo" 
                            value={newCourse.group}
                            onChange={(e) => setNewCourse({ ...newCourse, group: e.target.value })} 
                        />
                        <div className="modal-buttons">
                            <button onClick={saveNewCourse}>Guardar</button>
                            <button onClick={() => setShowForm(false)}>Cancelar</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}