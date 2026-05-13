import { Routes, Route } from 'react-router-dom'

// Layouts
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'

// Pages publiques
import Home from './pages/public/Home'
import Catalogue from './pages/public/Catalogue'
import CoursePage from './pages/public/CoursePage'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import ForgotPassword from './pages/auth/ForgotPassword'

// Teacher
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import CreateCourse from './pages/teacher/CreateCourse'
import EditCourse from './pages/teacher/EditCourse'

// Student
import Profile from './pages/student/Profile'

// Admin
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCourses from './pages/admin/AdminCourses'
import AdminCreateUser from './pages/admin/AdminCreateUser'

// Utilitaires
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Pages publiques */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/cours/:slug" element={<CoursePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
      </Route>

      {/* Pages avec sidebar (connecté) */}
      <Route element={<DashboardLayout />}>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/create" element={<CreateCourse />} />
        <Route path="/teacher/edit/:id" element={<EditCourse />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App