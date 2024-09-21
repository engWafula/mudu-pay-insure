"use client"; // necessary for Next.js to handle the client-side rendering

import React from 'react';
import { Card, Col, Row } from 'antd';
import { FaDollarSign, FaFileAlt, FaUsers } from 'react-icons/fa';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useFetch } from '@/app/hooks/useFetch';


const transformDataByMonth = (data: any[], dateField: string) => {
  return data.reduce(
    (acc, item) => {
      const month = new Date(item[dateField]).toLocaleString("default", { month: "short" });
      const existing = acc.find((entry:any) => entry.name === month);
      if (existing) {
        existing.count += 1;
      } else {
        acc.push({ name: month, count: 1 });
      }
      return acc;
    },
    [] as { name: string; count: number }[]
  );
};


export default function Page() {
  // Fetch data for users, policies, and companies
  const { data: users, isPending: usersPending } = useFetch<any[]>('/api/users');
  const { data: policies, isPending: policiesPending } = useFetch<any[]>('/api/policies');
  const { data: companies, isPending: companiesPending } = useFetch<any[]>('/api/companies');

  // Calculate counts for analytics
  const usersCount = users ? users.length : 0;
  const policiesCount = policies ? policies.length : 0;
  const companiesCount = companies ? companies.length : 0;

  const isLoading = usersPending || policiesPending || companiesPending;

  // Sample data for the charts
  const data = [
    { name: 'Jan', claims: 400, premiums: 2400 },
    { name: 'Feb', claims: 300, premiums: 2210 },
    { name: 'Mar', claims: 200, premiums: 2290 },
    { name: 'Apr', claims: 278, premiums: 2000 },
    { name: 'May', claims: 189, premiums: 2181 },
    { name: 'Jun', claims: 239, premiums: 2500 },
    { name: 'Jul', claims: 349, premiums: 2100 },


  ];

  const usersPerMonth = users ? transformDataByMonth(users, "createdAt") : [];
  const companiesPerMonth = companies ? transformDataByMonth(companies, "createdAt") : [];
  const policiesPerMonth = policies ? transformDataByMonth(policies, "createdAt") : [];


  return (
    <div className="flex flex-col items-center space-y-12 p-6 md:p-8 bg-[#ffffff] ">
      {/* Dashboard Header */}
      <p className="text-2xl md:text-4xl font-bold text-gray-800 mb-4">System Analytics</p>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Cards Section */}
          <div className="w-full">
            <Row gutter={[16, 16]}>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <div className="flex items-center">
                    <FaFileAlt size={28} className="mr-4" />
                    <div>
                      <p className="text-lg font-semibold">Total Policies</p>
                      <p className="text-2xl font-bold">{policiesCount}</p>
                      <p className="text-gray-500">Processed in 2024</p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <div className="flex items-center">
                    <FaDollarSign size={28} className="mr-4" />
                    <div>
                      <p className="text-lg font-semibold">Total Companies</p>
                      <p className="text-2xl font-bold">{companiesCount}</p>
                      <p className="text-gray-500">Active clients</p>
                    </div>
                  </div>
                </Card>
              </Col>
              <Col xs={24} sm={12} lg={8}>
                <Card>
                  <div className="flex items-center">
                    <FaUsers size={28} className="mr-4" />
                    <div>
                      <p className="text-lg font-semibold">Total Users</p>
                      <p className="text-2xl font-bold">{usersCount}</p>
                      <p className="text-gray-500">Registered in 2024</p>
                    </div>
                  </div>
                </Card>
              </Col>
            </Row>
          </div>

          {/* Bar Chart Section */}
          <div className="w-full bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Companies Created Per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={companiesPerMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} />
            <YAxis tick={{ fontSize: 12, fill: "#888" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#10b981" />
          </BarChart>
        </ResponsiveContainer>
      </div>

          {/* Line Chart Section */}
          <div className="w-full bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Policies Created Per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={policiesPerMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} />
            <YAxis tick={{ fontSize: 12, fill: "#888" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#f59e0b" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="w-full bg-white p-6 shadow-lg rounded-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Users Created Per Month</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={usersPerMonth}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: "#888" }} />
            <YAxis tick={{ fontSize: 12, fill: "#888" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
        </>
      )}
    </div>
  );
};
