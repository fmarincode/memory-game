import React from 'react'
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './Contexts/themeContext';
import Footer from "./components/Footer"

function App() {



  return (
    <>
        <ThemeProvider>
          <Navbar/>
          <Routes>
            <Route path='/' element={<Home />} />
          </Routes>
        </ThemeProvider>
      <Footer />
    </>
  )
}

export default App