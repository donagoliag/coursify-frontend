import { Routes, Route } from 'react-router-dom'
import ProtectedRoute from './components/common/ProtectedRoute'
import PublicLayout from './components/layout/PublicLayout'
import DashboardLayout from './components/layout/DashboardLayout'
import Home from './pages/public/Home'
import Catalogue from './pages/public/Catalogue'
import CoursePage from './pages/public/CoursePage'
import Login from './pages/auth/Login'
import ForgotPassword from './pages/auth/ForgotPassword'
import TeacherDashboard from './pages/teacher/TeacherDashboard'
import CreateCourse from './pages/teacher/CreateCourse'
import EditCourse from './pages/teacher/EditCourse'
import Profile from './pages/student/Profile'
import StudentDashboard from './pages/student/StudentDashboard'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminCourses from './pages/admin/AdminCourses'
import AdminCreateUser from './pages/admin/AdminCreateUser'
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
      {/* Pages publiques sans sidebar */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
      </Route>

      {/* Cours — accessible à tous mais avec sidebar si connecté */}
      <Route path="/cours/:slug" element={<CoursePage />} />

      {/* Pages enseignant */}
      <Route element={
        <ProtectedRoute roles={['teacher', 'admin']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/teacher/dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher/create" element={<CreateCourse />} />
        <Route path="/teacher/edit/:id" element={<EditCourse />} />
      </Route>

      {/* Pages admin */}
      <Route element={
        <ProtectedRoute roles={['admin']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/courses" element={<AdminCourses />} />
        <Route path="/admin/create-user" element={<AdminCreateUser />} />
      </Route>

      {/* Pages étudiant + profil */}
      <Route element={
        <ProtectedRoute roles={['admin', 'teacher', 'student']}>
          <DashboardLayout />
        </ProtectedRoute>
      }>
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App