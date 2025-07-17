import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Start from './pages/Start'
import Home from './pages/Home'
import UserLogin from './pages/UserLogin'
import UserSignup from './pages/UserSignup'
import UserLogout from './pages/UserLogout'
import UserProtectWrapper from './pages/UserProtectWrapper'
import CaptainHome from './pages/CaptainHome'
import CaptainLogin from './pages/CaptainLogin'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Start/>} />
        <Route path="/user-login" element={<UserLogin/>} />
        <Route path="/user-signup" element={<UserSignup/>} />
        <Route path="/user-logout" element={
          <UserProtectWrapper>
            <UserLogout />
          </UserProtectWrapper>
        } />
        <Route path="/home" element={
          <UserProtectWrapper>
            <Home />
          </UserProtectWrapper>
        } />
        <Route path="/captain-login" element={<CaptainLogin/>} />
        <Route path="/captain-signup" element={<CaptainSignup/>} />
        <Route path="/captain-logout" element={
          <CaptainProtectWrapper>
            <CaptainLogout />
          </CaptainProtectWrapper>
        } />
        <Route path="/captain-home" element={
          <CaptainProtectWrapper>
            <CaptainHome />
          </CaptainProtectWrapper>
        } />
      </Routes>
    </div>
  )
}

export default App