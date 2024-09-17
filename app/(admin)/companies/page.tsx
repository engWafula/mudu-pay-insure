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
        <h2 className="text-2xl font-semibold text-gray-700">Company Management</h2>
        <Button type="primary" onClick={showModal}>
          Add Company
        </Button>
      </div>

      {/* Modal with Form inside */}
      <Modal
        title="Add New Company"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null} // No default footer, since we have a form submit button inside the form
        centered // Centers the modal on the screen
        className="max-w-lg" // Set a max width for the modal to ensure it doesn’t extend too wide
      >
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Company Name"
            name="name"
            rules={[{ required: true, message: 'Please input the company name!' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            rules={[{ required: true, message: 'Please input the address!' }]}
          >
            <Input placeholder="Enter address" />
          </Form.Item>

          <Form.Item
            label="Phone Number"
            name="phoneNumber"
            rules={[{ required: true, message: 'Please input the phone number!' }]}
          >
            <Input placeholder="Enter phone number" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

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
