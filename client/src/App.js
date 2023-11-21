import React, {useState, useEffect} from 'react'
import {Routes, Route } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { ThemeProvider } from './Contexts/themeContext';
import Footer from "./components/Footer"
import Copyright from './pages/Copyright';
import UserConnect from './pages/UserConnect';
import RequireAuth from './components/RequireAuth';
import Dashboard from './pages/Dashboard';
import "./App.css";


function App() {
  const [message, setMessage] = useState("");
   useEffect(() => {
    fetch("https://memorycardgame.onrender.com/")
      .then((res) => res.json())
      .then((data) => setMessage(data.message));
  }, []);

  return (
    <>  
        <h1>{message}</h1>
        <ThemeProvider>
          <Navbar />
          <Routes>
         

              <Route path='/' element={<Home />} />
              <Route path='/copyright' element={<Copyright />} />
              <Route path='/userconnect' element={<UserConnect />} />

              <Route path="/dashboard" element={<RequireAuth requiredRole={["Admin", "User"]}><Dashboard /></RequireAuth>} />
              
        </Routes>
        </ThemeProvider>
        <Footer />

    </>
  )
}

export default App