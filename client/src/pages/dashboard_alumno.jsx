import "./css/estudiante.css";
import React, { useState } from 'react';

const StudentDashboard = () => {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Matemáticas Avanzadas', quizzes: ['Álgebra', 'Cálculo'] },
        { id: 2, name: 'Física Cuántica', quizzes: ['Mecánica Cuántica'] },
        { id: 3, name: 'Programación en Python', quizzes: ['Básico', 'Intermedio', 'Avanzado'] }
    ]);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const confirmLogout = () => {
        if (window.confirm('¿Estás seguro de que deseas cerrar sesión?')) {
            window.location.href = "/logout";
        }
    };

    return (
        <div className="container">
            <header>
                <h1>AutoQuest.ai Classroom</h1>
                <nav>
                    <ul>
                        <li><button onClick={() => setSelectedCourse(null)}>Mis Cursos</button></li>
                        <li><button>Configuración</button></li>
                        <li><button onClick={confirmLogout}>Cerrar Sesión</button></li>
                    </ul>
                </nav>
            </header>

            <main>
                {!selectedCourse ? (
                    <div>
                        <h2>Mis Cursos</h2>
                        <div className="courses-grid">
                            {courses.map(course => (
                                <div key={course.id} className="course-card" onClick={() => showCourseDetails(course)}>
                                    <h3>{course.name}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="course-details">
                        <h2>{selectedCourse.name}</h2>
                        <section>
                            <h3>Cuestionarios</h3>
                            <ul>
                                {selectedCourse.quizzes.map((quiz, index) => (
                                    <li key={index}>{quiz}</li>
                                ))}
                            </ul>
                        </section>
                    </div>
                )}
            </main>
        </div>
    );
};

export default StudentDashboard;
