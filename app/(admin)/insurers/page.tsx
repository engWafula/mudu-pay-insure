"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message } from 'antd';
import { useFetch } from '@/app/hooks/useFetch'; // Ensure this hook is adjusted for your needs

interface Insurer {
  id: string;
  name: string;
  registrationId: string;
  phoneNumber?: string;
  address?: string;
  website?: string;
  contactPerson?: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetching data using the useFetch hook
  const { data: insurers, isPending, error, refetch } = useFetch<Insurer[]>('/api/insurer'); // Adjust the endpoint

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  // Function to handle form submission and add a new insurer
  const onFinish = async (values: Omit<Insurer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/insurer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        message.success('Insurer added successfully!');
        form.resetFields(); // Reset form after successful submission
        setIsModalVisible(false); // Close modal
        refetch(); // Refetch the insurers to update the table
      } else {
        throw new Error('Failed to add insurer');
      }
    } catch (error) {
      message.error('Error adding insurer');
    }
  };

  // AntD table columns
  const columns = [
    {
      title: 'Insurer Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Registration ID',
      dataIndex: 'registrationId',
      key: 'registrationId',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Website',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: 'Contact Person',
      dataIndex: 'contactPerson',
      key: 'contactPerson',
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
    <div className="flex flex-col justify-start p-2">
      {/* Header and Button */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden">Insurers</h2>
      <div className="mt-5">

        <div className="flex items-center justify-between mb-4">
          <Button type="primary" onClick={showModal}>
            Add Insurer
          </Button>
        </div>

        {/* Modal for adding an insurer */}
        <Modal
          title="Add New Insurer"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null}
          centered
          className="max-w-lg"
        >
          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Insurer Name"
              name="name"
              rules={[{ required: true, message: 'Please input the insurer name!' }]}
            >
              <Input placeholder="Enter insurer name" />
            </Form.Item>

            <Form.Item
              label="Registration ID"
              name="registrationId"
              rules={[{ required: true, message: 'Please input the registration ID!' }]}
            >
              <Input placeholder="Enter registration ID" />
            </Form.Item>

            <Form.Item
              label="Phone Number"
              name="phoneNumber"
            >
              <Input placeholder="Enter phone number" />
            </Form.Item>

            <Form.Item
              label="Address"
              name="address"
            >
              <Input placeholder="Enter address" />
            </Form.Item>

            <Form.Item
              label="Website"
              name="website"
            >
              <Input placeholder="Enter website URL" />
            </Form.Item>

            <Form.Item
              label="Contact Person"
              name="contactPerson"
            >
              <Input placeholder="Enter contact person" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Insurers Table */}
        <div className="flex-grow">
          <Table
            columns={columns}
            dataSource={insurers as Insurer[]}
            rowKey="id"
            pagination={{ pageSize: 5 }}
            scroll={{ x: true }} 
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
}
