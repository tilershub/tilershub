import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import Tilers from './pages/Tilers'
import Login from './pages/admin/Login'
import TilersAdmin from './pages/admin/TilersAdmin'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './lib/AuthProvider'

export default function App() {
  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tilers" element={<Tilers />} />
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/tilers" element={<ProtectedRoute><TilersAdmin /></ProtectedRoute>} />
        {/* TODO: add routes for /estimator /quotation /invoice /blog and profile pages */}
      </Routes>
      <Footer />
    </AuthProvider>
  )
}