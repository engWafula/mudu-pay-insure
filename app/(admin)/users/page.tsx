"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, message, Select } from 'antd';
import { useFetch } from '@/app/hooks/useFetch';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN'; // Adjust based on your roles
}

export default function Page() {
  // State to hold the list of users
  const [users, setUsers] = useState<User[]>([]);

  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);

  // Fetch users using the custom hook
  const { data: fetchedUsers, isPending, error, refetch } = useFetch<User[]>('/api/users');

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  // Function to handle form submission and add a new user
  const onFinish = async (values: Omit<User, 'id'>) => {
    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        throw new Error('Failed to add user');
      }

      const newUser: User = await response.json();
      setUsers([...users, newUser]);
      message.success('User added successfully!');
      setIsModalVisible(false); // Close the modal after submission
    } catch (error) {
      message.error('Failed to add user');
    }
  };

  // AntD table columns
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
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
    <div className="flex flex-col p-2">
      {/* Header and Button */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10">Users</h2>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-4 mt-5">
          <Button type="primary" onClick={showModal}>
            Add User
          </Button>
        </div>

        {/* Modal with Form inside */}
        <Modal
          title="Add New User"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={null} // No default footer, since we have a form submit button inside the form
          centered // Centers the modal on the screen
          className="max-w-lg w-full sm:max-w-full sm:w-11/12" // Make modal responsive
        >
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input the email!' }]}
            >
              <Input placeholder="Enter email" />
            </Form.Item>

            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: 'Please input the name!' }]}
            >
              <Input placeholder="Enter name" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input the password!' }]}
            >
              <Input.Password placeholder="Enter password" />
            </Form.Item>

            <Form.Item
              label="Role"
              name="role"
              rules={[{ required: true, message: 'Please select the role!' }]}
            >
              <Select placeholder="Select role">
                <Select.Option value="SUPER_ADMIN">Super Admin</Select.Option>
                <Select.Option value="ADMIN">Admin</Select.Option>
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="w-full">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Users Table */}
        <div className="flex-grow flex justify-center mt-5">
          <div className="w-full overflow-x-auto">
            <div className="min-w-[600px]">
              <Table
                columns={columns}
                dataSource={users}
                pagination={{ pageSize: 5 }}
                className="mx-auto" // Center the table
                scroll={{x:true}}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
