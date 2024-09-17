import Link from 'next/link'
import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="mt-16 py-12 bg-gray-800 text-gray-300">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* About Section */}
        <div>
          <h4 className="text-xl font-semibold text-white">About WC Insurance Uganda</h4>
          <p className="mt-4 text-sm">
            WC Insurance Uganda is the leading platform for finding workers' compensation insurance. Our mission is to help businesses protect their employees with the best coverage available.
          </p>
          <p className="mt-4 text-sm">
            We offer a wide range of insurance providers to compare, ensuring you get the most value for your business.
          </p>
        </div>
  
        {/* Quick Links */}
        <div>
          <h4 className="text-xl font-semibold text-white">Quick Links</h4>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link href="/search" className="hover:underline">
                Search Insurance
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:underline">
                Login
              </Link>
            </li>
            <li>
              <Link href="/signup" className="hover:underline">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
  
        {/* Contact Us */}
        <div>
          <h4 className="text-xl font-semibold text-white">Contact Us</h4>
          <p className="mt-4 text-sm">
            Have questions or need help? Feel free to reach out to our support team.
          </p>
          <p className="mt-4 text-sm">
            <strong>Email:</strong> support@wcinsurance.co.ug
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +256 700 123 456
          </p>
        </div>
  
        {/* Newsletter */}
        <div>
          <h4 className="text-xl font-semibold text-white">Stay Updated</h4>
          <p className="mt-4 text-sm">
            Subscribe to our newsletter for the latest updates, insurance tips, and special offers.
          </p>
          <form className="mt-4 flex">
            <input
              type="email"
              className="w-full px-4 py-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
  
      {/* Social Media Links */}
      <div className="flex justify-center mt-12 space-x-6">
        <a href="#" className="text-gray-400 hover:text-white">
          <FaFacebook size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaTwitter size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaInstagram size={24} />
        </a>
        <a href="#" className="text-gray-400 hover:text-white">
          <FaLinkedin size={24} />
        </a>
      </div>
  
      {/* Legal Links */}
      <div className="flex justify-center mt-8 space-x-6 text-sm">
        <a href="#" className="hover:underline">
          Terms of Service
        </a>
        <a href="#" className="hover:underline">
          Privacy Policy
        </a>
        <a href="#" className="hover:underline">
          Cookie Policy
        </a>
      </div>
  
      {/* Copyright Notice */}
      <div className="text-center mt-8 text-sm">
        <p>&copy; {new Date().getFullYear()} WC Insurance Uganda. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}
