import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { IndexPage } from './pages/index';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import StudentDashboard from './pages/dashboard_alumno';
import TeacherDashboard from './pages/dashboard_maestro';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard_alumno" element={<StudentDashboard />} />
        <Route path="/dashboard_maestro" element={<TeacherDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App; 
