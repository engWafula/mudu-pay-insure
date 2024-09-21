"use client";
//@ts-ignore
import React, { useState } from 'react';
import { Table, Button, Modal, Form, Input, Select, DatePicker, message, Popconfirm } from 'antd';
import moment from 'moment';
import { useFetch } from '@/app/hooks/useFetch';

interface Policy {
  id: string;
  companyId: string;
  policyName: string;
  policyNumber: string;
  insurerId: string;
  status: string;
  expirationDate: string;
  createdAt: string;
  updatedAt: string;
}

interface Company {
  id: string;
  name: string;
}

interface Insurer {
  id: string;
  name: string;
}

export default function PoliciesPage() {
  // State to manage modal visibility and edit mode
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [form] = Form.useForm();

  // Fetching policies, companies, and insurers using the useFetch hook
  const { data: policies, isPending: policiesPending, refetch: refetchPolicies } = useFetch<Policy[]>('/api/policies');
  const { data: companies, isPending: companiesPending } = useFetch<Company[]>('/api/companies');
  const { data: insurers, isPending: insurersPending } = useFetch<Insurer[]>('/api/insurer');

  // Function to show the modal for adding or editing
  const showModal = (policy?: Policy) => {
    if (policy) {
      setSelectedPolicy(policy);
      setIsEditMode(true);
      form.setFieldsValue({
        ...policy,
        expirationDate: moment(policy.expirationDate), // Set expiration date for edit mode
      });
    }
    setIsModalVisible(true);
  };

  // Function to handle modal cancellation
  const handleCancel = () => {
    setIsModalVisible(false);
    setIsEditMode(false);
    form.resetFields(); // Reset the form fields when the modal is closed
    setSelectedPolicy(null);
  };

  // Function to handle form submission for adding or updating a policy
  const onFinish = async (values: Omit<Policy, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const url = isEditMode ? `/api/policies/${selectedPolicy?.id}` : `/api/policies`;
      const method = isEditMode ? 'PUT' : 'POST';
      const body = {
        ...values,
        expirationDate: values.expirationDate?.toString(), 
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        message.success(`Policy ${isEditMode ? 'updated' : 'added'} successfully!`);
        form.resetFields(); // Reset form after successful submission
        setIsModalVisible(false); // Close modal
        refetchPolicies(); // Refetch the policies to update the table
      } else {
        throw new Error('Failed to save policy');
      }
    } catch (error) {
      message.error(`Error ${isEditMode ? 'updating' : 'adding'} policy`);
    }
  };

  // Function to delete a policy
  const handleDelete = async (policyId: string) => {
    try {
      const response = await fetch(`/api/policies/${policyId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        message.success('Policy deleted successfully!');
        refetchPolicies(); // Refetch policies to update the table
      } else {
        throw new Error('Failed to delete policy');
      }
    } catch (error) {
      message.error('Error deleting policy');
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
      title: 'Company',
      dataIndex: 'company',
      key: 'company',
      render: (company: any) => {
        return company.name;
      },
    },
    {
      title: 'Insurer',
      dataIndex: 'insurerId',
      key: 'insurerId',
      render: (insurerId: string) => {
        const insurer = insurers?.find(ins => ins.id === insurerId);
        return insurer ? insurer.name : 'Unknown';
      },
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
    {
      title: 'Actions',
      key: 'actions',
      render: (text: any, record: Policy) => (
        <span>
          <Button type="link" onClick={() => showModal(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this policy?"
            onConfirm={() => handleDelete(record.id)}
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
      {/* Header and Button */}
      <h2 className="text-2xl font-semibold text-gray-700 mt-10 overflow-hidden">Policies</h2>
      <div className="mt-5">
        <div className="flex items-center justify-between mb-4">
          <Button type="primary" onClick={() => showModal()} disabled={companiesPending || insurersPending}>
            Add Policy
          </Button>
        </div>

        {/* Modal for adding or editing a policy */}
        <Modal
          title={isEditMode ? "Edit Policy" : "Add New Policy"}
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

            {/* Insurer dropdown */}
            <Form.Item
              label="Insurer"
              name="insurerId"
              rules={[{ required: true, message: 'Please select an insurer!' }]}
            >
              <Select
                placeholder="Select an insurer"
                loading={insurersPending}
                disabled={insurersPending}
              >
                {insurers && insurers.map(insurer => (
                  <Select.Option key={insurer.id} value={insurer.id}>
                    {insurer.name}
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
                {isEditMode ? 'Update Policy' : 'Add Policy'}
              </Button>
            </Form.Item>
          </Form>
        </Modal>

        {/* Policies Table */}
        <Table columns={columns} dataSource={policies} loading={policiesPending} rowKey="id"  pagination={{defaultPageSize:20}}/>
      </div>
    </div>
  );
}
