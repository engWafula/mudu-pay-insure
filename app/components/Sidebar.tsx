"use client"; // Ensure this is at the top for Next.js

import React, { useState } from "react";
import { FaTachometerAlt, FaUserCheck, FaClipboardList, FaCog, FaBars } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import Link from "next/link"; // Ensure Next.js Link is used for navigation
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false); // Default to closed on mobile

  const router = useRouter()
  const logout = ()=>{
    signOut({ redirect: false });
    router.push('/');  }

  return (
    <div className="relative">
      {/* Toggle Button for Mobile View */}
      <button
        className="md:hidden text-white p-4 bg-[#1F2937] fixed top-0 left-0 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FaBars />
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-screen bg-[#1F2937] text-white transition-transform duration-300 z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 w-64`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center justify-center h-16 bg-gray-800 text-2xl font-bold">
          <span>Insurance</span>
        </Link>

        {/* Menu Items */}
        <nav className="mt-4">
          <ul>
            <SidebarItem onClick={()=>router.push("/dashboard")} icon={<FaTachometerAlt />} text="Dashboard" />
            <SidebarItem   onClick={()=>router.push("/users")} icon={<FaUserCheck />} text="User Management" />
            <SidebarItem  onClick={()=>router.push("/companies")}  icon={<FaClipboardList />} text="Company Management" />
            <SidebarItem onClick={()=>router.push("/policy")} icon={<FaCog />} text="Policy Management" />
            <SidebarItem onClick={()=>router.push("/audit")} icon={<FaCog />} text="Audit Logs" />
            <SidebarItem  onClick={logout} icon={<MdLogout />} text="Logout" />
          </ul>
        </nav>
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
  href?: string;
  onClick?: ()=>void
}) => {
  return (
    <li onClick={onClick} className="flex items-center px-6 py-4 text-gray-300 hover:bg-gray-700 hover:text-white transition-colors cursor-pointer">
      <span className="mr-4">{icon}</span>
      <p>
        {text}
      </p>
    </li>
  );
};

export default Sidebar;
