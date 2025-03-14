import "./css/login.css";
import React, { useState } from "react";
import { login } from "../api/login.api"; // Importamos la función de la API
import { useNavigate } from "react-router-dom"; // Para redirigir

export const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(""); // Estado para errores
    const [userType, setUserType] = useState("maestro"); // Estado para el tipo de usuario
    const navigate = useNavigate(); // Hook para redirección

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Limpiar errores anteriores
        try {
            const user = await login(email, password, userType); // Llamamos a la API para login
            console.log("Respuesta del servidor:", user); // Ver qué está devolviendo el backend
            if (user && user.token) { // Asegúrate de que el backend dev
                localStorage.setItem("token", user.access); // Guardar el token en localStorage
                localStorage.setItem("user", JSON.stringify(user)); // Guardar el usuario
                navigate(userType === "maestro" ? "/dashboard_maestro" : "/dashboard_alumno"); // Redirigir segun el tipo de usuario
            } else {
                setError("Credenciales incorrectas"); // Manejo de error
            }
        } catch (err) {
            console.error("Error en login:", err);
            setError("Error en el servidor. Intenta nuevamente.");
        }
    };

    return (
        <div className="background-pattern">
            <div className="login-container">
                <div className="logo">Auto.Quest</div>
                <h1>Iniciar Sesión</h1>

                {error && <p className="error-message">{error}</p>} {/* Mostrar error */}

                <div className="user-type-selector">
                    <button
                        className={`user-type-btn ${userType === 'maestro' ? 'active' : ''}`}
                        onClick={() => handleUserTypeChange('maestro')}
                    >
                        Maestro
                    </button>
                    <button
                        className={`user-type-btn ${userType === 'alumno' ? 'active' : ''}`}
                        onClick={() => handleUserTypeChange('alumno')}
                    >
                        Alumno
                    </button>
                </div>

                <form id="login-form" onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label htmlFor="email">Correo Electrónico</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="tu@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-group">
                        <label htmlFor="password">Contraseña</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Tu contraseña"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-btn">Iniciar Sesión</button>
                </form>

                <div className="forgot-password">
                    <a href="/password">¿Olvidaste tu contraseña?</a>
                </div>
                <div className="register-link">
                    ¿No tienes una cuenta? <a href="/register">Regístrate</a>
                </div>
            </div>

            <div className="shape shape-1"></div>
            <div className="shape shape-2"></div>
        </div>
    );
};

export default LoginPage;
