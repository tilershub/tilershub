import { Navigate } from 'react-router-dom'
import { useAuth } from '../lib/AuthProvider'

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/admin/login" replace />
  return children
}