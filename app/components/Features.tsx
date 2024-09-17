import React from 'react'
import { FaCheckCircle, FaClock, FaFileSignature, FaLock, FaPhone, FaSearch } from 'react-icons/fa'

export default function Features() {
  return (
    <section id="features" className="mt-16 text-center">
    <h3 className="text-3xl font-semibold mb-8">Why Choose Us?</h3>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 max-w-5xl mx-auto">
      <div className="flex flex-col items-center">
        <FaSearch className="text-blue-600" size={64} />
        <h4 className="text-xl font-bold mt-4">Search Insurance Providers</h4>
        <p className="mt-2 text-gray-600">
          Easily search for the top workers' compensation insurance providers in Uganda.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <FaCheckCircle className="text-green-600" size={64} />
        <h4 className="text-xl font-bold mt-4">Compare Policies</h4>
        <p className="mt-2 text-gray-600">
          Compare policy options, prices, and coverage to find the perfect fit.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <FaFileSignature className="text-red-600" size={64} />
        <h4 className="text-xl font-bold mt-4">Apply Easily</h4>
        <p className="mt-2 text-gray-600">
          Simple, fast, and secure application process for insurance policies.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <FaLock className="text-gray-600" size={64} />
        <h4 className="text-xl font-bold mt-4">Secure Data Handling</h4>
        <p className="mt-2 text-gray-600">
          Your personal and company data is safe with us, protected by advanced encryption.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <FaPhone className="text-yellow-600" size={64} />
        <h4 className="text-xl font-bold mt-4">24/7 Customer Support</h4>
        <p className="mt-2 text-gray-600">
          Our team is available around the clock to assist you with any questions.
        </p>
      </div>
      <div className="flex flex-col items-center">
        <FaClock className="text-purple-600" size={64} />
        <h4 className="text-xl font-bold mt-4">Quick Policy Approvals</h4>
        <p className="mt-2 text-gray-600">
          We work with insurance providers to ensure swift approvals for your peace of mind.
        </p>
      </div>
    </div>
  </section>
  )
}
