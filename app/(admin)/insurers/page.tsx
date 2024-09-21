"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { useFetch } from '@/app/hooks/useFetch'; // Ensure this hook is adjusted for your needs
import moment from 'moment';

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
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingInsurer, setEditingInsurer] = useState<Insurer | null>(null); // State to handle the insurer being edited

  // Fetching data using the useFetch hook
  const { data: insurers, isPending, error, refetch } = useFetch<Insurer[]>('/api/insurer'); // Adjust the endpoint

  // Function to show the modal
  const showModal = (insurer?: Insurer) => {
    if (insurer) {
      setEditingInsurer(insurer);
      form.setFieldsValue(insurer); // Set the form fields for editing
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form fields when the modal is closed
    setEditingInsurer(null); // Reset editing state
  };

  // Function to handle form submission for adding or updating an insurer
  const onFinish = async (values: Omit<Insurer, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const method = editingInsurer ? 'PUT' : 'POST'; // Determine if it's an update or add
      const url = editingInsurer ? `/api/insurer/${editingInsurer.id}` : '/api/insurer';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        const successMessage = editingInsurer ? 'Insurer updated successfully!' : 'Insurer added successfully!';
        message.success(successMessage);
        form.resetFields(); // Reset form after successful submission
        setIsModalVisible(false); // Close modal
        setEditingInsurer(null); // Reset editing state
        refetch(); // Refetch the insurers to update the table
      } else {
        throw new Error('Failed to submit insurer data');
      }
    } catch (error) {
      message.error('Error submitting insurer data');
    }
  };

  // Function to delete an insurer
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/insurer/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Insurer deleted successfully!');
        refetch(); // Refetch the insurers to update the table
      } else {
        throw new Error('Failed to delete insurer');
      }
    } catch (error) {
      message.error('Cannot delete an insurer who is has a policy');
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
      render: (text: string) => moment(text).format('YYYY-MM-DD'),

    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Insurer) => (
        <div>
          <Button onClick={() => showModal(record)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this insurer?"
            onConfirm={() => handleDelete(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-start p-2">
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden">Insurers</h2>
      <div className="mt-5">

        <div className="flex items-center justify-between mb-4">
          <Button type="primary" onClick={() => showModal()}>
            Add Insurer
          </Button>
        </div>

        {/* Modal for adding or editing an insurer */}
        <Modal
          title={editingInsurer ? 'Edit Insurer' : 'Add New Insurer'}
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
            pagination={{ pageSize: 20}}
            scroll={{ x: true }} 
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
}
