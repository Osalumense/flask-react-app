import React from 'react'
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

function Hero() {
  return (
    <>
        <div class="flex bg-white m-auto overflow-hidden hero">
            <div class="flex items-center text-center lg:text-left px-8 md:px-24 lg:w-1/2">
                <div>
                    <h2 class="text-3xl font-semibold text-gray-800 md:text-4xl">Build Your New <span class="text-indigo-600">Idea</span></h2>
                    <p class="mt-2 text-sm text-gray-500 md:text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit.</p>
                    <div class="flex justify-center lg:justify-start mt-6">
                        <Link class="px-4 py-3 bg-indigo-700 text-white hover:-translate-y-1 transition-all duration-500 hover:bg-gray-200 hover:text-indigo-800 font-semibold rounded-2xl" to="/login">Get Started</Link>
                        <HashLink class="mx-4 px-4 py-3 hover:bg-indigo-700 hover:text-white hover:-translate-y-1 transition-all duration-500 bg-gray-200 text-indigo-800 font-semibold rounded-2xl" to="/#about">Learn More</HashLink>
                    </div>
                </div>
            </div>
            <div class="hidden lg:block lg:w-1/2 img-clip">
                <div class="h-full object-cover hero-img">
                    <div class="h-full bg-black opacity-25"></div>
                </div>
            </div>
        </div>
    </>
  )
}

export default Hero