import {
  FaSearch,
  FaCheckCircle,
  FaFileSignature,
  FaLock,
  FaPhone,
  FaClock,
  FaStar,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Features from "./components/Features";
import FAQs from "./components/FAQs";
import SearchComponent from "./components/SearchComponent";

export default function Home() {
  return (
    <div className="  bg-white text-gray-900">
      {/* Header Section */}
      <Header />

      {/* Hero Section */}
      <main className="flex flex-col items-center text-center py-12 p-2">
        <h2 className="text-3xl md:text-3xl lg:text-3xl  font-bold mb-6">
          The Best Workers' Compensation Insurance Portal in Uganda
        </h2>
        <p className="text-lg mb-8 max-w-2xl">
          Explore the top insurance providers, compare their policies, and get
          your employees protected with just a few clicks.
        </p>
        {/* <Link href="/search"  className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700">
            Start Searching for Insurance
        </Link> */}

        <SearchComponent />
      </main>

      {/* Features Section */}
	  <section className="p-2">
	  <Features />

	  </section>
      {/* Testimonials Section */}
      <section id="testimonials" className="mt-16 text-center p-2">
        <h3 className="text-3xl font-semibold mb-8">What Our Clients Say</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="p-6 bg-gray-100 rounded-lg">
            <FaStar className="text-yellow-400" size={40} />
            <p className="mt-4 text-gray-700">
              "This portal made it incredibly easy to find and compare policies.
              We now have the best coverage for our employees!"
            </p>
            <h5 className="mt-4 font-semibold">– John D., HR Manager</h5>
          </div>
          <div className="p-6 bg-gray-100 rounded-lg">
            <FaStar className="text-yellow-400" size={40} />
            <p className="mt-4 text-gray-700">
              "The customer support was fantastic. They guided us every step of
              the way during the policy application."
            </p>
            <h5 className="mt-4 font-semibold">– Sarah K., CEO</h5>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
	  <section className="p-2">
	  <FAQs />

	  </section>

      {/* Call to Action Section */}
      <section id="apply" className="text-center mt-16 p-2">
        <h3 className="text-3xl font-semibold mb-8">
          Ready to Protect Your Employees?
        </h3>
        <Link
          href="/signup"
          className="bg-[#1F2937] text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-600"
        >
          Sign Up Now
        </Link>
        <p className="mt-4 text-gray-600">
          Join thousands of Ugandan businesses that trust us for their workers'
          compensation insurance.
        </p>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
