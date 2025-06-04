import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Log-in/Login'
import LandingPage from './pages/Landing-page/LandingPage'
import { AuthProvider } from './context/AuthContext'

const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/*" 
                element={<Layout />}
          >
            <Route index element={<LandingPage />} />

            {/* Ide jön a többi oldal */}

          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
