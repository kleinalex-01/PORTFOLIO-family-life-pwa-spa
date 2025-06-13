import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import { CalendarTaskProvider } from './context/CalendarTaskContext.tsx'
import { CalendarProvider } from './context/CalendarContext.tsx' // Assuming this is the correct import path for CalendarContext


createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <AuthProvider>
        <CalendarTaskProvider>
          <CalendarProvider>
            <App />
          </CalendarProvider>
        </CalendarTaskProvider>
      </AuthProvider>
  </StrictMode>
)
