import React, { useEffect } from "react";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import SignUpForm from "./pages/Signup";
import SignInForm from "./pages/Inventory";
import Error from "./pages/Error";
import Dashboard from "./pages/dashboard";
import SeeInventory from "./pages/seeInventory";
import { Route, Routes, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./index.css";
// import Footer from "./components/Footer";
import { useCookies } from "react-cookie";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/see" element={<SeeInventory />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
}

export default App;
