import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const NavLinks = () => {
    return (
        <>
                <HashLink className="px-4 font-extrabold text-indigo-800 hover:text-indigo-700 hover:-translate-y-1 transition-all duration-500" smooth to="/#hero">
                    Home
                </HashLink>
                <HashLink className="px-4 font-extrabold text-indigo-800 hover:text-indigo-700 hover:-translate-y-1 transition-all duration-500" smooth to="/#about">
                    About
                </HashLink>
                <HashLink className="px-4 font-extrabold text-indigo-800 hover:text-indigo-700 hover:-translate-y-1 transition-all duration-500" smooth to="/#services">
                    Services
                </HashLink>
                <Link className="bg-indigo-700 text-white hover:-translate-y-1 transition-all duration-500 hover:bg-gray-200 hover:text-indigo-800 px-6 py-2 rounded-2xl font-bold" smooth to="/login">
                    Login
                </Link>
        </>
    )
}

export default NavLinks;