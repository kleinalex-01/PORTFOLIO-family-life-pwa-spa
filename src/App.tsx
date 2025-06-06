import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './layouts/Layout'
import Login from './pages/Log-in/Login'
import Dashboard from './pages/Landing-page/LandingPage'

const App: React.FC = () => {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />

          <Route path="/*" 
                element={<Layout />}
          >
            <Route index element={<Dashboard />} />

            {/* Ide jön a többi oldal */}

          </Route>
        </Routes>
      </BrowserRouter>
  )
}

export default App
