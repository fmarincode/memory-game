import React from 'react'
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './Contexts/themeContext';
import Footer from "./components/Footer"
import Copyright from './pages/Copyright';
import AdminLog from './pages/AdminLog';
import PostImg from './pages/PostImg';
import PostTheme from './pages/PostTheme';

function App() {

  return (
    <>
        <ThemeProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/copyright' element={<Copyright />} />
            <Route path='/adminauth' element={<AdminLog />} />
            <Route path='/addContent' element={<PostImg />} />
            <Route path='/addTheme' element={<PostTheme />} />
          </Routes>
        </ThemeProvider>
      <Footer />
    </>
  )
}

export default App