"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState } from 'react';
import { Table, Button, Form, Input, Modal, message } from 'antd';

interface Company {
  key: string;
  name: string;
  address: string;
  phoneNumber: string;
}

export default function Page() {
  // State to hold the list of companies
  const [companies, setCompanies] = useState<Company[]>([]);

  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Function to handle form submission and add a new company
  const onFinish = (values: Omit<Company, 'key'>) => {
    const newCompany: Company = {
      key: (companies.length + 1).toString(),
      ...values,
    };
    setCompanies([...companies, newCompany]);
    message.success('Company added successfully!');
    setIsModalVisible(false); // Close the modal after submission
  };

  // AntD table columns
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
  ];

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div className="flex flex-col p-4 min-h-screen pl-64 pr-4">
      {/* Header and Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Audit Logs</h2>

      </div>



      {/* Companies Table */}
      <div className="flex-grow">
        <Table
          columns={columns}
          dataSource={companies}
          pagination={{ pageSize: 5 }}
          bordered
          style={{ width: '100%' }}
        />
      </div>
    </div>
  );
}
