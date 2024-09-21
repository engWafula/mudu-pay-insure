"use client"; // necessary for Next.js to handle the client-side rendering

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, message, Popconfirm } from 'antd';
import { useFetch } from '@/app/hooks/useFetch';
import moment from 'moment';

interface Company {
  id: string;
  name: string;
  registrationNo: string;
  createdAt: string;
  updatedAt: string;
}

export default function Page() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentCompanyId, setCurrentCompanyId] = useState<string | null>(null);
  const [form] = Form.useForm();

  const { data: companies, isPending, error, refetch } = useFetch<Company[]>('/api/companies');

  // Function to show the modal (Add or Edit)
  const showModal = (company?: Company) => {
    setIsModalVisible(true);
    if (company) {
      setIsEditMode(true);
      setCurrentCompanyId(company.id);
      form.setFieldsValue(company); // Populate the form with company data for editing
    } else {
      setIsEditMode(false);
      setCurrentCompanyId(null);
      form.resetFields(); // Reset the form fields for new entry
    }
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  // Handle form submission (Create or Update)
  const onFinish = async (values: Omit<Company, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const url = isEditMode && currentCompanyId ? `/api/companies/${currentCompanyId}` : '/api/companies';
      const method = isEditMode && currentCompanyId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values
        }),
      });

      if (response.ok) {
        message.success(`Company ${isEditMode ? 'updated' : 'added'} successfully!`);
        form.resetFields();
        setIsModalVisible(false);
        refetch();
      } else {
        throw new Error(`Failed to ${isEditMode ? 'update' : 'add'} company`);
      }
    } catch (error) {
      message.error(`Error ${isEditMode ? 'updating' : 'adding'} company`);
    }
  };

  // Handle delete company
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/companies/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Company deleted successfully!');
        refetch(); // Refetch the companies to update the table
      } else {
        throw new Error('Failed to delete company');
      }
    } catch (error) {
      message.error('Error deleting company');
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
      render: (text: string) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, company: Company) => (
        <span>
          <Button onClick={() => showModal(company)} type="link">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this company?"
            onConfirm={() => handleDelete(company.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="link" danger>
              Delete
            </Button>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className="flex flex-col justify-start p-2">
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden">Companies</h2>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-4">
          <Button type="primary" onClick={() => showModal()}>
            Add Company
          </Button>
        </div>

        {/* Modal for Adding/Editing a company */}
        <Modal
          title={isEditMode ? 'Edit Company' : 'Add New Company'}
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
                {isEditMode ? 'Update' : 'Submit'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Companies Table */}
        <div className="flex-grow">
          <Table
            columns={columns}
            dataSource={companies as Company[]}
            rowKey="id"
            pagination={{ defaultPageSize: 20 }}
            scroll={{ x: true }}
            loading={isPending}
          />
        </div>
      </div>
    </div>
  );
}
