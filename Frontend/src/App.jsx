import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Start from './pages/Start'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserLogout from './pages/UserLogout'
import UserProtectWrapper from './pages/UserProtectWrapper'
import Captainlogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'

// Debug environment variable
// Check if VITE_BASE_URL is defined
if (import.meta.env.VITE_BASE_URL) {
  console.log('VITE_BASE_URL:', import.meta.env.VITE_BASE_URL);
} else {
  console.warn('VITE_BASE_URL is not defined in environment variables');
}

function App() {
  return (
    <Routes>
      <Route path='/' element={<Start />} />
      <Route path='/user-login' element={<UserLogin />} />
      <Route path='/user-signup' element={<UserSignup />} />
      <Route path='/user-logout' element={<UserLogout />} />
      <Route path='/home' element={<UserProtectWrapper><Home /></UserProtectWrapper>} />
      <Route path='/riding' element={<Riding />} />
      <Route path='/captain-riding' element={<CaptainRiding />} />

      <Route path='/user-signup' element={<UserSignup />} />
      <Route path='/captain-login' element={<Captainlogin />} />
      <Route path='/captain-signup' element={<CaptainSignup />} />
      <Route path='/home'
        element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        }
      />
      <Route path='/captain-home'
        element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        }
      />
    </Routes>
  )
}

export default App