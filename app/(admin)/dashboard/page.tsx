"use client"; // necessary for Next.js to handle the client-side rendering

import React from 'react';
import StatsCard from '@/app/components/Cards';
import { FaDollarSign, FaFileAlt, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', claims: 400, premiums: 2400 },
  { name: 'Feb', claims: 300, premiums: 2210 },
  { name: 'Mar', claims: 200, premiums: 2290 },
  { name: 'Apr', claims: 278, premiums: 2000 },
  { name: 'May', claims: 189, premiums: 2181 },
  { name: 'Jun', claims: 239, premiums: 2500 },
  { name: 'Jul', claims: 349, premiums: 2100 },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col items-center space-y-12  p-6 md:p-8 bg-[#ffffff] min-h-screen">
      {/* Dashboard Header */}
      <p className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">System Analytics</p>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatsCard
          title="Total Claims"
          value={1200}
          description="Processed in 2024"
          icon={<FaFileAlt size={28} />}
        />
        <StatsCard
          title="Revenue Generated"
          value="$350,000"
          description="From active policies"
          icon={<FaDollarSign size={28} />}
        />
        <StatsCard
          title="Customers Served"
          value={4500}
          description="Active clients"
          icon={<FaUsers size={28} />}
        />
      </div>

      {/* Bar Chart Section */}
      <div className="w-full max-w-5xl bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Claims Processed</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#888' }} />
            <YAxis tick={{ fontSize: 12, fill: '#888' }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="claims" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart Section */}
      <div className="w-full max-w-5xl bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Insurance Premiums</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#888' }} />
            <YAxis tick={{ fontSize: 12, fill: '#888' }} />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="premiums" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
