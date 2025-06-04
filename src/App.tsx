import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Log-in/Login'
import LandingPage from './pages/Landing-page/LandingPage'
import type { JSX } from 'react'

const PrivateRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  return Boolean(localStorage.getItem("token") ? children : <Navigate to="/login" replace />);
}

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/*" 
              element={<PrivateRoute>
                         <Layout />
                       </PrivateRoute>}>
          <Route index element={<LandingPage />} />

          // Ide jön a többi oldal

        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
