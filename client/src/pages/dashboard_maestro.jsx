import "./css/maestro.css";
import { useState } from "react";

const coursesData = [
    { id: 1, name: 'Matemáticas Avanzadas', students: ['Ana', 'Carlos', 'Elena'], quizzes: ['Álgebra', 'Cálculo'] },
    { id: 2, name: 'Física Cuántica', students: ['David', 'Fátima'], quizzes: ['Mecánica Cuántica'] },
    { id: 3, name: 'Programación en Python', students: ['Gabriela', 'Hugo', 'Irene'], quizzes: ['Básico', 'Intermedio', 'Avanzado'] }
];

export default function Dashboard() {
    const [courses, setCourses] = useState(coursesData);
    const [selectedCourse, setSelectedCourse] = useState(null);

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const addNewCourse = () => {
        const newCourseName = prompt('Ingrese el nombre del nuevo curso:');
        if (newCourseName) {
            const newCourse = {
                id: courses.length + 1,
                name: newCourseName,
                students: [],
                quizzes: []
            };
            setCourses([...courses, newCourse]);
        }
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
                        <li><button onClick={() => setSelectedCourse(null)}>Cursos</button></li>
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
                                    <p>{course.students.length} estudiantes</p>
                                </div>
                            ))}
                            <div className="course-card add-course-card" onClick={addNewCourse}>
                                <span style={{ fontSize: "2rem" }}>+</span>
                                <p>Añadir Curso</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="course-details">
                        <h2>{selectedCourse.name}</h2>
                        <section>
                            <h3>Estudiantes</h3>
                            <ul>
                                {selectedCourse.students.map((student, index) => <li key={index}>{student}</li>)}
                            </ul>
                        </section>
                        <section>
                            <h3>Cuestionarios</h3>
                            <ul>
                                {selectedCourse.quizzes.map((quiz, index) => <li key={index}>{quiz}</li>)}
                            </ul>
                        </section>
                    </div>
                )}
            </main>

            <button className="add-button" onClick={addNewCourse}>+</button>
        </div>
    );
}
