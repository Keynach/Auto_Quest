import "./css/maestro.css";
import { useState, useEffect } from "react";

export default function Dashboard() {
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [newCourse, setNewCourse] = useState({ name: "", semester: "", group: "" });

    useEffect(() => {
        console.log("showForm ha cambiado:", showForm);
    }, [showForm]);

    const showCourseDetails = (course) => {
        setSelectedCourse(course);
    };

    const handleInputChange = (e) => {
        setNewCourse({ ...newCourse, [e.target.name]: e.target.value });
    };

    const saveNewCourse = async () => {
        if (!newCourse.name || !newCourse.semester || !newCourse.group) {
            alert("Por favor, completa todos los campos.");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/api/courses", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCourse),
            });

            if (response.ok) {
                const savedCourse = await response.json();
                setCourses([...courses, savedCourse]);
                setShowForm(false);
            } else {
                alert("Error al guardar el curso.");
            }
        } catch (error) {
            console.error("Error al conectar con el servidor:", error);
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
                                <div key={course.id} className="course-card" onClick={() => showCourseDetails(course)}>
                                    <h3>{course.name}</h3>
                                    <p>Semestre: {course.semester} - Grupo: {course.group}</p>
                                </div>
                            ))}
                            <div className="course-card add-course-card" onClick={() => {
                                console.log("Se hizo clic en añadir curso");
                                setShowForm(true);
                            }}>
                                <span style={{ fontSize: "2rem" }}>+</span>
                                <p>Añadir Curso</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="course-details">
                        <h2>{selectedCourse.name}</h2>
                        <p>Semestre: {selectedCourse.semester} - Grupo: {selectedCourse.group}</p>
                    </div>
                )}
            </main>

            {showForm && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>Crear Nuevo Curso</h3>
                        <input type="text" name="name" placeholder="Nombre del curso" onChange={handleInputChange} />
                        <input type="text" name="semester" placeholder="Semestre" onChange={handleInputChange} />
                        <input type="text" name="group" placeholder="Grupo" onChange={handleInputChange} />
                        <button onClick={saveNewCourse}>Guardar</button>
                        <button onClick={() => setShowForm(false)}>Cancelar</button>
                    </div>
                </div>
            )}
        </div>
    );
}
