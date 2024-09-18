// app/company/[id]/page.tsx
"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Spin, Table, Alert } from "antd";
import { useFetch } from "@/app/hooks/useFetch";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const CompanyPoliciesPage = () => {
  const router = useRouter();
  const { id } = useParams(); // Get company ID from URL
  const [loading, setLoading] = useState(true);

  const { data, isPending, error, refetch } = useFetch<any[]>(
    `/api/companies/${id}`
  ); // Adjust the endpoint

  const columns = [
    {
      title: "Policy Name",
      dataIndex: "policyName",
      key: "policyName",
    },
    {
      title: "Policy Number",
      dataIndex: "policyNumber",
      key: "policyNumber",
    },
    {
      title: "Insurer",
      dataIndex: "insurer",
      key: "insurer",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Expiration Date",
      dataIndex: "expirationDate",
      key: "expirationDate",
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
  ];

  if (error) return <Alert message="Error" description={error} type="error" />;
  if (!data) return <div>No policies found.</div>;
  console.log(data, "fhfhf");
  return (
		<div className="  bg-white text-gray-900">
      <Header />

      <h1 className="text-2xl font-semibold mb-4">
        Policies for Company ID: {id}
      </h1>
      <Table
        dataSource={data}
        columns={columns}
        rowKey="id"
        loading={isPending}
        scroll={{ x: true }} // Enable horizontal scrolling if needed
        className="ant-table-small"
      />

      <Footer />
    </div>
  );
};

export default CompanyPoliciesPage;
