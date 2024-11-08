import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white shadow pt-2">
            <div>
                <span className="text-sm text-gray-500 dark:text-gray-400 flex justify-center">
                    &copy; {new Date().getFullYear()} Deni Prasetyo. All Rights Reserved.
                </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto p-4 max-w-7xl text-sm">
                <div className="flex flex-col sm:flex-row justify-end items-center sm:space-y-0 sm:space-x-4">
                    <Link to="/" className="hover:text-gray-300 cursor-pointer block py-2">
                        Home
                    </Link>
                    <Link to="/employees" className="hover:text-gray-300 cursor-pointer block py-2">
                        Employees
                    </Link>
                    <Link to="/departments" className="hover:text-gray-300 cursor-pointer block py-2">
                        Departments
                    </Link>
                    <Link to="/projects" className="hover:text-gray-300 cursor-pointer block py-2">
                        Projects
                    </Link>
                    <Link to="/assignments" className="hover:text-gray-300 cursor-pointer block py-2">
                        Assignments
                    </Link>
                </div>
                <div className="flex flex-col sm:flex-row justify-start items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <a href="#" className="flex items-center space-x-2 hover:text-blue-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faFacebook} className="w-5 h-5" />
                        <span>Facebook</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:text-pink-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faInstagram} className="w-5 h-5" />
                        <span>Instagram</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:text-gray-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faEnvelope} className="w-5 h-5" />
                        <span>Email</span>
                    </a>
                    <a href="#" className="flex items-center space-x-2 hover:text-green-400 transition-colors duration-300">
                        <FontAwesomeIcon icon={faWhatsapp} className="w-5 h-5" />
                        <span>WhatsApp</span>
                    </a>
                </div>
            </div>

        </footer >
    );
};

export default Footer;