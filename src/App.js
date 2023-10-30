import React from 'react'
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './Contexts/themeContext';
import Footer from "./components/Footer"
import Copyright from './pages/Copyright';

function App() {

  return (
    <>
        <ThemeProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/copyright' element={<Copyright />} />
          </Routes>
        </ThemeProvider>
      <Footer />
    </>
  )
}

export default App