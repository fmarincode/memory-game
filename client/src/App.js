import React from 'react'
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './Contexts/themeContext';
import Footer from "./components/Footer"
import Copyright from './pages/Copyright';
import PostImg from './pages/PostImg';
import PostTheme from './pages/PostTheme';
import UserConnect from './pages/UserConnect';
import RequireAuth from './components/RequireAuth';
import "./App.css";
import EditTheme from './pages/EditTheme';


function App() {

  return (
    <>  

        <ThemeProvider>
          <Navbar />
          <Routes>
         
              {/* public routes */}
              <Route path='/' element={<Home />} />
              <Route path='/copyright' element={<Copyright />} />
              <Route path='/userconnect' element={<UserConnect />} />

      
  
               {/* routes à protéger */}
              <Route path="/addContent" element={<RequireAuth requiredRole={["Admin", "User"]}><PostImg /></RequireAuth>} />
              <Route path="/addTheme" element={<RequireAuth requiredRole={["Admin", "User"]}><PostTheme /></RequireAuth>} />
              <Route path="/editTheme" element={<RequireAuth requiredRole={["Admin", "User"]}><EditTheme /></RequireAuth>} />
              
        </Routes>
        </ThemeProvider>
        <Footer />

    </>
  )
}

export default App