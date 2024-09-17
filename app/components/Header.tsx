import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Header() {
  return (
    <header className="bg-gray-800 py-4">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
      {/* Logo Section */}
      <div className="flex items-center">
        <Link href="/">
          <Image
            src="/logo.png" // Replace with your logo
            alt="WC Insurance Portal Logo"
            width={160}
            height={160}
            className="cursor-pointer"
          />
        </Link>
  
      </div>
  
      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8 text-lg">
        <Link href="/" className="text-gray-300 hover:text-white">
          Home
        </Link>
        <Link href="/search" className="text-gray-300 hover:text-white">
          Search Insurance
        </Link>
        <Link href="/about" className="text-gray-300 hover:text-white">
          About Us
        </Link>
        <Link href="/contact" className="text-gray-300 hover:text-white">
          Contact
        </Link>
      </nav>
  
      {/* Login / Sign Up Buttons */}
      <div className="flex space-x-4">
        <Link
          href="/login"
          className="bg-gray-700 text-white px-5 py-2 rounded-md hover:bg-gray-600"
        >
          Login
        </Link>
        <Link
          href="/signup"
          className="bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-500"
        >
          Sign Up
        </Link>
      </div>
  
      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center">
        <button className="text-gray-300 focus:outline-none hover:text-white">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16m-7 6h7"
            />
          </svg>
        </button>
      </div>
    </div>
  
    {/* Mobile Navigation */}
    <nav className="md:hidden mt-4 px-4 space-y-2 text-lg">
      <Link href="/" className="block text-gray-300 hover:text-white">
        Home
      </Link>
      <Link href="/search" className="block text-gray-300 hover:text-white">
        Search Insurance
      </Link>
      <Link href="/about" className="block text-gray-300 hover:text-white">
        About Us
      </Link>
      <Link href="/contact" className="block text-gray-300 hover:text-white">
        Contact
      </Link>
    </nav>
  </header>
  )
}
