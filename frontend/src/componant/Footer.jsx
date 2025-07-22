
import React from 'react'
import { FaPhoneAlt } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";
import { FaFacebookSquare } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";
import { FaDribbble } from "react-icons/fa";
import logo from "../assets/image/logo.png";


const Footer = () => {
    return (
        <>
            <footer className="bg-[#002033] text-white py-10 px-6 md:px-16 mt-10 max-w-screen-2xl mx-auto">
                <div className=" mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <img src={logo} alt="Logo" className="h-8 w-auto" />
                            <div>
                                <p className="font-bold text-lg">SSZone</p>
                                <p className="text-xs">Technologies</p>
                            </div>
                        </div>
                        <p className="text-sm mb-4">
                            Discover a world of knowledge and opportunities with our online education platform pursue a new career.
                        </p>
                      

                    </div>


                    <div classNameName='lg:ml-10'>
                        <h3 className="font-semibold mb-4">LINKS</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:underline">Home</a></li>
                            <li><a href="#" className="hover:underline">Courses</a></li>
                            <li><a href="#" className="hover:underline">About Us</a></li>
                            <li><a href="#" className="hover:underline">Contact Us</a></li>
                            <li><a href="#" className="hover:underline">Blogs</a></li>
                        </ul>
                    </div>
                    <div>
                            <h1 classNameName='font-semibold mb-3'>Contact Us</h1>
                            <div className="flex items-start space-x-2 mb-2">
                                <FiMapPin classNameName='text-xl' />
                                <span className="text-sm">GMS Road Dehradun, Uttarakhand, India</span>
                            </div>
                            <div className="flex items-start space-x-2">
                                <FaPhoneAlt classNameName='text-xl' />
                                <span className="text-sm">+91 897 989 1703</span>
                            </div>
                        </div>

                    <div>
                        <h3 className="font-semibold mb-4">GET IN TOUCH</h3>
                        <div className="flex space-x-3">
                            {/* <a href="#" className="border border-white p-2 rounded"><FaDribbble classNameName='text-xl' /></a> */}
                            <a href="#" className="border border-white p-2 rounded"><FaFacebookSquare classNameName='text-xl' /></a>
                            {/* <a href="#" className="border border-white p-2 rounded"><FaLinkedin classNameName='text-xl' /></a> */}
                            <a href="#" className="border border-white p-2 rounded"><FaInstagram classNameName='text-xl' /></a>
                            <a href="#" className="border border-white p-2 rounded"><FaTwitter classNameName='text-xl' /></a>
                            {/* <a href="#" className="border border-white p-2 rounded"><MdOutlineEmail classNameName='text-xl' /></a> */}
                        </div>
                    </div>
                </div>
            </footer>

        </>
    )
}

export default Footer