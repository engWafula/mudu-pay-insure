"use client";

import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message } from 'antd';
import moment from 'moment';
import { useFetch } from '@/app/hooks/useFetch';

interface Policy {
  id: string;
  companyId: string;
  policyName: string;
  policyNumber: string;
  insurer: string;
  status: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Company {
  id: string;
  name: string;
}

export default function PoliciesPage() {
  // State to manage modal visibility
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  // Fetching policies and companies using the useFetch hook
  const { data: policies, isPending: policiesPending, error: policiesError, refetch: refetchPolicies } = useFetch<Policy[]>('/api/policies');
  const { data: companies, isPending: companiesPending, error: companiesError } = useFetch<Company[]>('/api/companies');

  // Function to show the modal
  const showModal = () => {
    setIsModalVisible(true);
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields(); // Reset the form fields when the modal is closed
  };

  // Function to handle form submission and add a new policy
  const onFinish = async (values: Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const response = await fetch('/api/policies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          //@ts-ignore
          expirationDate: values.expirationDate.toISOString(), // Format the date properly
        }),
      });

      if (response.ok) {
        message.success('Policy added successfully!');
        form.resetFields(); // Reset form after successful submission
        setIsModalVisible(false); // Close modal
        refetchPolicies(); // Refetch the policies to update the table
      } else {
        throw new Error('Failed to add policy');
      }
    } catch (error) {
      message.error('Error adding policy');
    }
  };

  // AntD table columns
  const columns = [
    {
      title: 'Policy Name',
      dataIndex: 'policyName',
      key: 'policyName',
    },
    {
      title: 'Policy Number',
      dataIndex: 'policyNumber',
      key: 'policyNumber',
    },
    {
      title: 'Insurer',
      dataIndex: 'insurer',
      key: 'insurer',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Expiration Date',
      dataIndex: 'expirationDate',
      key: 'expirationDate',
      render: (text: string) => moment(text).format('YYYY-MM-DD'),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => moment(text).format('YYYY-MM-DD'),
    },
  ];

  return (
    <div className="flex flex-col p-4 min-h-screen pl-64 pr-4">
      {/* Header and Button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-700">Policy Management</h2>
        <Button type="primary" onClick={showModal} disabled={companiesPending}>
          Add Policy
        </Button>
      </div>

      {/* Modal for adding a policy */}
      <Modal
        title="Add New Policy"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
        centered
        className="max-w-lg"
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          {/* Company dropdown */}
          <Form.Item
            label="Company"
            name="companyId"
            rules={[{ required: true, message: 'Please select a company!' }]}
          >
            <Select
              placeholder="Select a company"
              loading={companiesPending}
              disabled={companiesPending}
            >
              {companies && companies.map(company => (
                <Select.Option key={company.id} value={company.id}>
                  {company.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Policy Name"
            name="policyName"
            rules={[{ required: true, message: 'Please input the policy name!' }]}
          >
            <Input placeholder="Enter policy name" />
          </Form.Item>

          <Form.Item
            label="Policy Number"
            name="policyNumber"
            rules={[{ required: true, message: 'Please input the policy number!' }]}
          >
            <Input placeholder="Enter policy number" />
          </Form.Item>

          <Form.Item
            label="Insurer"
            name="insurer"
            rules={[{ required: true, message: 'Please input the insurer name!' }]}
          >
            <Input placeholder="Enter insurer name" />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: 'Please select the policy status!' }]}
          >
            <Select placeholder="Select status">
              <Select.Option value="ACTIVE">Active</Select.Option>
              <Select.Option value="INACTIVE">Inactive</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Expiration Date"
            name="expirationDate"
            rules={[{ required: true, message: 'Please select an expiration date!' }]}
          >
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className="w-full">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Policies Table */}
      <div className="flex-grow">
        {policiesError && <p>Error: {policiesError}</p>}
        {policiesPending ? (
          <p>Loading...</p>
        ) : (
          <Table
            columns={columns}
            dataSource={policies as any}
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
