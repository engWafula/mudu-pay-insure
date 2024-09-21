"use client"; // Necessary for Next.js to handle client-side rendering

import React, { useState } from 'react';
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

  // Sorting logic can be implemented by the sorter function.
  const columns = [
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      filters: [
        { text: 'Create', value: 'CREATE' },
        { text: 'Update', value: 'UPDATE' },
        { text: 'Delete', value: 'DELETE' },
        { text: 'Search', value: 'SEARCH' },

      ],
      onFilter: (value: any, record: AuditLog) => record.action.includes(value),
      sorter: (a: AuditLog, b: AuditLog) => a.action.localeCompare(b.action),
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      sorter: (a: AuditLog, b: AuditLog) => a.target.localeCompare(b.target),
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
      sorter: (a: AuditLog, b: AuditLog) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
    },
    {
      title: 'Admin Email',
      dataIndex: 'admin',
      key: 'adminEmail',
      render: (admin: { email: string }) => admin?.email || 'N/A', // Show admin email
      sorter: (a: AuditLog, b: AuditLog) => a.admin.email.localeCompare(b.admin.email),
    },
    {
      title: 'Admin Name',
      dataIndex: 'admin',
      key: 'adminName',
      render: (admin: { name: string }) => admin?.name || 'N/A', // Show admin name
      sorter: (a: AuditLog, b: AuditLog) => a.admin.name.localeCompare(b.admin.name),
    },
    {
      title: 'Admin Role',
      dataIndex: 'admin',
      key: 'adminRole',
      filters: [
        { text: 'Super Admin', value: 'SUPER_ADMIN' },
        { text: 'Admin', value: 'ADMIN' },
      ],
      onFilter: (value: any, record: AuditLog) => record?.admin?.role.includes(value),
      render: (admin: { role: string }) => admin?.role || 'N/A', // Show admin role
      sorter: (a: AuditLog, b: AuditLog) => a.admin.role.localeCompare(b.admin.role),
    },
  ];

  return (
    <div className="flex flex-col justify-start p-2">
      {/* Header */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden mb-5">Audit Logs</h2>

      {/* Audit Logs Table */}
      <div className="flex-grow">
        <Table
          columns={columns}
          dataSource={auditLogs || []} // Handle loading state
          pagination={{ pageSize: 20 }}
          loading={isPending}
          style={{ width: '100%' }}
          rowKey="id" // Use a unique row key
        />
      </div>
    </div>
  );
}
