import React from "react";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Inventory_Login from "./pages/Login";
import Error from "./pages/Error";
import { Route,Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import './index.css'


function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route exact path="/about" element={<About/>}/>
        <Route exact path="/login" element={<Inventory_Login/>}/>
        <Route exact path="/contact" element={<Contact/>}/>
        <Route exact path="/" element={<Home/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
     
    </>
  )
}

export default App;
