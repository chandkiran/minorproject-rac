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
  const navigate = useNavigate();

  // List of routes where Footer should be hidden
  const routesWithoutFooter = ["/dashboard", "/see"];

  // Check if the current route is in the list of routes without Footer
  const shouldHideFooter = routesWithoutFooter.includes(
    window.location.pathname
  );

  // Update the route, then check if the route is in the list of routes without Footer
  const updateRouteAndCheckFooter = (newRoute) => {
    navigate(newRoute);
    const shouldHideFooter = routesWithoutFooter.includes(newRoute);
    return shouldHideFooter;
  };

  return (
    <>
      {!shouldHideFooter && <Navbar />}
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/signin" element={<SignInForm />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={<Dashboard checkFooter={updateRouteAndCheckFooter} />}
        />
        <Route
          path="/see"
          element={<SeeInventory checkFooter={updateRouteAndCheckFooter} />}
        />
        <Route path="*" element={<Error />} />
      </Routes>
      {!shouldHideFooter && <Footer />}
    </>
  );
}

export default App;
