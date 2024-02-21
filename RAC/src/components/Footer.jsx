import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-t from-yellow-500 via-yellow-300 to-yellow-100 text-gray-800 py-8 text-center mt-8">
      <div className="flex justify-center gap-8">
        <a
          href="https://www.facebook.com/racthapathali"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-yellow-200 hover:text-gray-800 hover:border-white hover:border-2 hover:rounded-full p-3"
        >
          <FaFacebook size={24} color="#1877f2" />
        </a>
        <a
          href="https://www.instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-yellow-200 hover:text-gray-800 hover:border-white hover:border-2 hover:rounded-full p-3"
        >
          <FaInstagram size={24} color="#c32aa3" />
        </a>
        <a
          href="https://www.linkedin.com/company/robotics-and-automation-center-thapathali-campus/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-yellow-200 hover:text-gray-800 hover:border-white hover:border-2 hover:rounded-full p-3"
        >
          <FaLinkedin size={24} color="#0077b5" />
        </a>
        <a
          href="https://www.youtube.com/@roboticsandautomationcenter"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:bg-yellow-200 hover:text-gray-800 hover:border-white hover:border-2 hover:rounded-full p-3"
        >
          <FaYoutube size={24} color="#ff0000" />
        </a>
      </div>
      <div className="mt-6">
        <button
          onClick={scrollToTop}
          className="bg-orange-300 text-black p-3 rounded-full hover:bg-white"
        >
          <FontAwesomeIcon icon={faArrowUp} size="lg" />
        </button>
      </div>
      <div className="mt-6 text-sm text-gray-600">
        &copy; {new Date().getFullYear()} Robotics & Automation Center
      </div>
    </footer>
  );
};

export default Footer;
