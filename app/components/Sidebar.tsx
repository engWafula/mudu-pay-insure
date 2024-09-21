"use client"; // Ensure this is at the top for Next.js
import React, { useState } from "react";
import { FaTachometerAlt, FaUserCheck, FaClipboardList, FaCog, FaBars, FaBook, FaFileContract, FaBriefcase } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Link from "next/link"; // Ensure Next.js Link is used for navigation
import { useRouter } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed on mobile
  const { data: session, status } = useSession();
  // @ts-ignore
  const userRole = status === "authenticated" ? (session as any).user.role : undefined;
  const router = useRouter();
  const logout = () => {
    signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div className="relative">
      {/* Toggle Button for Mobile View */}
      <button
        className="md:hidden text-[#1F2937] p-4 fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#1F2937] text-white transition-transform duration-300 z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 w-64 flex flex-col`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center h-16 bg-gray-800 text-2xl font-bold">
          <span>WCI Portal</span>
        </Link>

        {/* Menu Items */}
        <nav className="mt-4 flex-grow">
          <ul>
            <SidebarItem onClick={() => router.push("/dashboard")} icon={<FaTachometerAlt />} text="Dashboard" />
            {userRole === "SUPER_ADMIN" && <SidebarItem onClick={() => router.push("/users")} icon={<FaUserCheck />} text="User Management" />}
            <SidebarItem onClick={() => router.push("/companies")} icon={<FaClipboardList />} text="Company Management" />
            <SidebarItem onClick={() => router.push("/insurers")} icon={<FaBriefcase />} text="Insurance Companies" />
            <SidebarItem onClick={() => router.push("/policy")} icon={<FaFileContract />} text="Policy Management" />
            {userRole === "SUPER_ADMIN" && <SidebarItem onClick={() => router.push("/audit")} icon={<FaBook />} text="Audit Logs" />}
            <SidebarItem onClick={logout} icon={<MdLogout />} text="Logout" />
          </ul>
        </nav>

        {/* User Avatar and Email */}
        {status === "authenticated" && (
          <div className="p-4 flex items-center bg-gray-800 mt-auto">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-white">{session.user.email[0].toUpperCase()}</span> {/* Display first letter of email */}
            </div>
            <span className="ml-2 text-sm text-gray-300">{session.user.email}</span>
          </div>
        )}
      </div>

      {/* Overlay for mobile when sidebar is open */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={() => setIsOpen(false)} // Close sidebar when clicking outside
        />
      )}
    </div>
  );
};

const SidebarItem = ({
  icon,
  text,
  onClick,
}: {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
}) => {
  return (
    <li onClick={onClick} className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
      <span className="mr-4">{icon}</span>
      <p>{text}</p>
    </li>
  );
};

export default Sidebar;
