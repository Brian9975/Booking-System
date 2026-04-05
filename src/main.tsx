import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import BookingsContextProvider from './context/BookingsContext.tsx'
import AuthContextProvider from './context/AuthContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthContextProvider>
    <BookingsContextProvider>
    <App />
    </BookingsContextProvider>
    </AuthContextProvider>
  </StrictMode>,
)
