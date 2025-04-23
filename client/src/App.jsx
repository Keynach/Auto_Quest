import {BrowserRouter, Routes, Route } from 'react-router-dom';
import { IndexPage } from './pages/index';
import { LoginPage } from './pages/login';
import { RegisterPage } from './pages/register';
import StudentDashboard from './pages/dashboard_alumno';
import TeacherDashboard from './pages/dashboard_maestro';
import Option from './pages/option';
import Upload from './pages/upload_md';
import FormViewer from './pages/FormViewer';
import CreateExam from "./pages/CreateExam";
import StudentExams from "./pages/StudentExams";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/dashboard_alumno" element={<StudentDashboard />} />
        <Route path="/cursos/:courseCode/examenes" element={<StudentExams />} />
        <Route path="/dashboard_maestro" element={<TeacherDashboard />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="/dashboard_maestro/option" element={<Option/>} />
        <Route path="/upload-markdown" element={<FormViewer />} />
        <Route path="/view-form" element={<FormViewer />} />
        <Route path="/upload-form" element={<Upload />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App; 
//<Route path="/upload-form" element={<Upload/>} />
//<Route path="/upload-markdown" element={<FormViewer />} />