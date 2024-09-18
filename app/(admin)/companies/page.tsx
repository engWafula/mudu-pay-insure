"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useFetch } from '@/app/hooks/useFetch';

interface Company {
  id: string;
  name: string;
  registrationNo: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetching data using the useFetch hook
  const { data: companies, isPending, error, refetch } = useFetch<Company[]>('/api/companies'); // Adjust the endpoint

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  // Function to handle form submission and add a new company
  const onFinish = async (values: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Company added successfully!');
        form.resetFields(); // Reset form after successful submission
        setIsModalVisible(false); // Close modal
        refetch(); // Refetch the companies to update the table
      } else {
        throw new Error('Failed to add company');
      }
    } catch (error) {
      message.error('Error adding company');
    }
  };

  // AntD table columns
  const columns = [
    {
      title: 'Company Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Registration No',
      dataIndex: 'registrationNo',
      key: 'registrationNo',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: 'Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
  ];

  return (
    <div className="flex flex-col p-4 min-h-screen pl-64 pr-4">
      {/* Header and Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Company Management</h2>
        <Button type="primary" onClick={showModal}>
          Add Company
        </Button>
      </div>

      {/* Modal for adding a company */}
      <Modal
        title="Add New Company"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        className="max-w-lg"
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Company Name"
            name="name"
            rules={[{ required: true, message: 'Please input the company name!' }]}
          >
            <Input placeholder="Enter company name" />
          </Form.Item>

          <Form.Item
            label="Registration No"
            name="registrationNo"
            rules={[{ required: true, message: 'Please input the registration number!' }]}
          >
            <Input placeholder="Enter registration number" />
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
        {error && <p>Error: {error}</p>}
        {isPending ? (
          <p>Loading...</p>
        ) : (
          <Table
            columns={columns}
            dataSource={companies as Company[]}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            bordered
            style={{ width: '100%' }}
          />
        )}
      </div>
    </div>
  );
}
