import React from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import About from "./pages/About";
import SignUpForm from "./pages/Signup";
import SignInForm from "./pages/Inventory";
import Contact from "./pages/Contact";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SeeInventory from "./pages/seeInventory";
import Error from "./pages/Error";
import Footer from "./components/Footer/Footer";

function App() {
  // List of routes where Navbar should be hidden
  const routesWithoutNavbar = ["/dashboard", "/see"];

  // Check if the current route is in the list of routes without Navbar
  const shouldHideNavbar = routesWithoutNavbar.includes(
    window.location.pathname
  );

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
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
      <Footer />
    </>
  );
}

export default App;
