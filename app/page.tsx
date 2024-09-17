import { FaSearch, FaCheckCircle, FaFileSignature, FaLock, FaPhone, FaClock, FaStar, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-white text-gray-900 p-4 pb-2 sm:p-20">
      {/* Header Section */}
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


      {/* Hero Section */}
      <main className="flex flex-col items-center text-center py-12">
        <h2 className="text-4xl font-bold mb-6">
          The Best Workers' Compensation Insurance Portal in Uganda
        </h2>
        <p className="text-lg mb-8 max-w-2xl">
          Explore the top insurance providers, compare their policies, and get your employees protected with just a few clicks.
        </p>
        <Link href="/search"  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700">
            Start Searching for Insurance
        </Link>
      </main>

      {/* Features Section */}
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

      {/* Testimonials Section */}
      <section id="testimonials" className="mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-8">What Our Clients Say</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg">
            <FaStar className="text-yellow-400" size={40} />
            <p className="mt-4 text-gray-700">
              "This portal made it incredibly easy to find and compare policies. We now have the best coverage for our employees!"
            </p>
            <h5 className="mt-4 font-semibold">– John D., HR Manager</h5>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <FaStar className="text-yellow-400" size={40} />
            <p className="mt-4 text-gray-700">
              "The customer support was fantastic. They guided us every step of the way during the policy application."
            </p>
            <h5 className="mt-4 font-semibold">– Sarah K., CEO</h5>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="mt-16 text-center">
        <h3 className="text-3xl font-semibold mb-8">Frequently Asked Questions</h3>
        <div className="max-w-4xl mx-auto text-left">
          <div className="mb-4">
            <h4 className="font-bold text-lg">What is Workers' Compensation Insurance?</h4>
            <p className="mt-2 text-gray-600">
              Workers' Compensation Insurance provides medical benefits and wage replacement for employees injured in the course of employment.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold text-lg">How do I choose the right policy?</h4>
            <p className="mt-2 text-gray-600">
              Our platform allows you to compare policies from different providers based on coverage, price, and your specific business needs.
            </p>
          </div>
          <div className="mb-4">
            <h4 className="font-bold text-lg">How long does it take to apply?</h4>
            <p className="mt-2 text-gray-600">
              Our streamlined process ensures that you can complete and submit your application in just a few minutes.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="apply" className="text-center mt-16">
        <h3 className="text-3xl font-semibold mb-8">Ready to Protect Your Employees?</h3>
        <Link href="/signup" className="bg-green-500 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600">
            Sign Up Now
        </Link>
        <p className="mt-4 text-gray-600">Join thousands of Ugandan businesses that trust us for their workers' compensation insurance.</p>
      </section>

      {/* Footer Section */}
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

    </div>
  );
}
