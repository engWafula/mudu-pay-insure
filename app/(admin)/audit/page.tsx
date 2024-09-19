"use client"; // necessary for Next.js to handle the client-side rendering

import React from 'react';
import { Table, message } from 'antd';
import { useFetch } from '@/app/hooks/useFetch';

interface AuditLog {
  id: string;
  adminId: string;
  action: string;
  target: string;
  details: string;
  timestamp: string;
  admin: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
}

export default function Page() {
  const { data: auditLogs, isPending } = useFetch<AuditLog[]>('/api/audit'); // Adjust the endpoint as necessary

  // AntD table columns
  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (text: string) => new Date(text).toLocaleString(), // Format the timestamp
    },
    {
      title: 'Admin Email',
      dataIndex: 'admin',
      key: 'adminEmail',
      render: (admin: { email: string }) => admin.email, // Show admin email
    },
    {
      title: 'Admin Name',
      dataIndex: 'admin',
      key: 'adminName',
      render: (admin: { name: string }) => admin.name, // Show admin name
    },
    {
      title: 'Admin Role',
      dataIndex: 'admin',
      key: 'adminRole',
      render: (admin: { role: string }) => admin.role, // Show admin role
    },
  ];

  return (
    <div className="flex flex-col justify-start p-2">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden mb-5">Policies</h2>



      {/* Audit Logs Table */}
      <div className="flex-grow">
        <Table
          columns={columns}
          dataSource={auditLogs || []} // Handle loading state
          pagination={{ pageSize: 5 }}
          loading={isPending}
          style={{ width: '100%' }}

        />
      </div>
    </div>
  );
}
