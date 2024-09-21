"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState, useEffect } from 'react';
import { Table, Button, Form, Input, Modal, message, Select, Popconfirm } from 'antd';
import { useFetch } from '@/app/hooks/useFetch';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'SUPER_ADMIN' | 'ADMIN'; // Adjust based on your roles
}

export default function Page() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null); // Will store the user being edited or null for new users

  const { data: fetchedUsers, isPending, error, refetch } = useFetch<User[]>('/api/users');

  useEffect(() => {
    if (fetchedUsers) {
      setUsers(fetchedUsers);
    }
  }, [fetchedUsers]);

  const handleFinish = async (values: Omit<User, 'id'>) => {
    if (editingUser) {
      // Update existing user
      try {
        const response = await fetch(`/api/users/${editingUser.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        const updatedUser: User = await response.json();
        setUsers(users.map(user => (user.id === updatedUser.id ? updatedUser : user)));
        message.success('User updated successfully!');
      } catch (error) {
        message.error('Failed to update user');
      }
    } else {
      // Add new user
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
        refetch()
        message.success('User added successfully, Email has been sent with login credentials');
      } catch (error) {
        message.error('Failed to add user');
      }
    }

    // Close modal after operation
    setIsModalVisible(false);
    setEditingUser(null);
  };

  const deleteUser = async (id: string) => {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete user');
      }

      message.success('User deleted successfully!');
      refetch()
    } catch (error) {
      message.error('Failed to delete user');
    }
  };

  const showModal = (user?: User) => {
    setEditingUser(user || null); // If user is passed, we are editing; otherwise, we are creating
    setIsModalVisible(true);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
    setEditingUser(null);
  };

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
    {
      title: 'Action',
      key: 'action',
      render: (text: any, record: User) => (
        <>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => deleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-start p-2">
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden">Users</h2>

      <div className="mt-5">
        <div className="flex items-center justify-between mb-4 mt-5 overflow-hidden">
          <Button type="primary" onClick={() => showModal()}>
            Add User
          </Button>
        </div>

        {/* Add/Edit User Modal */}
        <Modal
          title={editingUser ? "Edit User" : "Add New User"}
          visible={isModalVisible}
          onCancel={handleCancelModal}
          footer={null}
          centered
          className="max-w-lg w-full sm:max-w-full sm:w-11/12"
        >
          <Form
            layout="vertical"
            onFinish={handleFinish}
            initialValues={editingUser || { email: '', name: '', role: 'ADMIN' }}
          >
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

            {/* Only show password input if adding a new user */}
            {!editingUser && (
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: 'Please input the password!' }]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            )}

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
                {editingUser ? 'Save Changes' : 'Add User'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        <Table dataSource={users} columns={columns} loading={isPending} rowKey="id" />
      </div>
    </div>
  );
}
