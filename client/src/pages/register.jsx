import React, { useState } from 'react';
import './css/register.css';
import { registerUser } from '../api/register.api'; // Importamos la API

export const RegisterPage = () => {
    const [userType, setUserType] = useState('maestro');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        userCode: '',
        password: ''
    });
    const [message, setMessage] = useState(null);

    const handleUserTypeChange = (type) => {
        setUserType(type);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const userData = {
                nombre: formData.name,
                correo: formData.email,
                contrasena: formData.password,
                tipo_usuario: userType, // "maestro" o "alumno"
                numero_cuenta: userType === "maestro" ? formData.userCode : undefined,
                matricula: userType === "alumno" ? formData.userCode : undefined
            };
    
            const response = await registerUser(userData);
            setMessage("Registro exitoso. Ahora puedes iniciar sesión.");
        } catch (error) {
            setMessage("Error al registrar el usuario.");
        }
    };
    

    return (
        <div className="register-container">
            <div className="logo">Auto.Quest</div>
            <h1>Registro</h1>

            {message && <div className="message">{message}</div>} {/* Mensajes de éxito/error */}

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

            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label htmlFor="name">Nombre:</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nombre completo" 
                        value={formData.name}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">Correo electrónico:</label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        placeholder="tu@email.com" 
                        value={formData.email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="userCode">Código (Empleado o Matrícula):</label>
                    <input 
                        type="text" 
                        id="userCode" 
                        name="userCode" 
                        placeholder="Código de empleado o matrícula" 
                        value={formData.userCode}
                        onChange={handleChange}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">Contraseña:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Contraseña" 
                        value={formData.password}
                        onChange={handleChange}
                        required 
                    />
                </div>

                <input type="hidden" id="userType" name="userType" value={userType} />

                <button type="submit" className="register-btn">
                    {userType === 'maestro' ? 'Registrar Maestro' : 'Registrar Alumno'}
                </button>
            </form>

            <div className="login-link">
                ¿Ya tienes una cuenta? <a href="/login">Inicia sesión</a>
            </div>
        </div>
    );
};

export default RegisterPage;
