import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import UIUX from './pages/UIUX'
import HTML from './pages/HTML'
import CSSVanilla from './pages/CSSVanilla'
import NodeJS from './pages/NodeJS'
import ModernJS from './pages/ModernJS'
import DOM from './pages/DOM'
import Tailwind from './pages/Tailwind'
import ReactJS from './pages/ReactJS'
import HostingerVPS from './pages/HostingerVPS'
import Putty from './pages/Putty'
import MySQLWorkbench from './pages/MySQLWorkbench'
import Catatan from './pages/Catatan'
import LearningExperience from './pages/LearningExperience'
import Login from './pages/Login'
import Register from './pages/Register'
import Account from './pages/Account'
import Admin from './pages/admin'

const App = () => {
  return (
    <AuthProvider>
      <div className="min-h-screen overflow-x-hidden text-zinc-950 transition-colors duration-300 dark:text-white">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/uiux" element={<UIUX />} />
          <Route path="/html" element={<HTML />} />
          <Route path="/css-vanilla" element={<CSSVanilla />} />
          <Route path="/nodejs" element={<NodeJS />} />
          <Route path="/modern-js" element={<ModernJS />} />
          <Route path="/dom" element={<DOM />} />
          <Route path="/tailwind" element={<Tailwind />} />
          <Route path="/react" element={<ReactJS />} />
          <Route path="/hostinger-vps" element={<HostingerVPS />} />
          <Route path="/putty" element={<Putty />} />
          <Route path="/mysql-workbench" element={<MySQLWorkbench />} />
          <Route path="/catatan" element={<Catatan />} />
          <Route path="/learning-experience" element={<LearningExperience />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/account" element={<Account />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
        <Footer />
      </div>
    </AuthProvider>
  )
}

export default App