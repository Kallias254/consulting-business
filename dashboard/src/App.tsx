import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/hooks/useAuth'
import LoginPage from '@/pages/LoginPage'
import DashboardLayout from '@/components/DashboardLayout'
import ProjectsPage from '@/pages/ProjectsPage'
import ProjectDetailPage from '@/pages/ProjectDetailPage'
import ResearcherPage from '@/pages/ResearcherPage'
import AdminPage from '@/pages/AdminPage'
import CorrespondencePage from '@/pages/CorrespondencePage'

/** Redirects unauthenticated users to /login */
function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isValid } = useAuth()
  if (!isValid) return <Navigate to="/login" replace />
  return <>{children}</>
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      {/* All dashboard routes require auth */}
      <Route
        path="/"
        element={
          <RequireAuth>
            <DashboardLayout />
          </RequireAuth>
        }
      >
        {/* Default redirect */}
        <Route index element={<Navigate to="/projects" replace />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="projects/:id" element={<ProjectDetailPage />} />
        <Route path="projects/:id/correspondence" element={<CorrespondencePage />} />
        <Route path="researcher" element={<ResearcherPage />} />
        <Route path="admin" element={<AdminPage />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
