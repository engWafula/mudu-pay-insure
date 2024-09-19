"use client";
import { useParams } from "next/navigation";
import { Spin, Card, Alert } from "antd";
import { useFetch } from "@/app/hooks/useFetch";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const { Meta } = Card;

const CompanyPoliciesPage = () => {
  const { id } = useParams(); // Get company ID from URL
  const { data, isPending, error } = useFetch<any>(`/api/companies/${id}`); // Adjust the endpoint

  if (error) return <Alert message="Error" description={error} type="error" />;
  if (!data) return null

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <Header />

      <div className="container mx-auto px-4">
        <p className="text-2xl font-semibold mb-4  mt-10 text-center">
         Insurance Policies for {data.name}
        </p>

        {isPending && <Spin size="large" className="flex justify-center items-center my-8" />}

        {data.length === 0 && !isPending && (
          <div className="text-center text-gray-500 my-8 ">No policies available.</div>
        )}

        <div className="flex flex-wrap justify-center gap-4 p-8">
          {data.policies.map((policy:any) => (
            <Card
              key={policy.id}
              title={`Policy Name: ${policy.policyName}`}
              bordered={true}
              className="w-full max-w-sm shadow-lg hover:shadow-xl transition-shadow duration-300"
              cover={
                <div className="p-4 bg-gray-50 rounded-t-md">
                  <p className="text-sm text-gray-600">Policy Number: {policy.policyNumber}</p>
                  <p className="text-sm text-gray-600">Status: {policy.status}</p>
                  <p className="text-sm text-gray-600">Expiration Date: {new Date(policy.expirationDate).toLocaleDateString()}</p>
                </div>
              }
            >
              <Meta
                description={`Issued by ${policy.insurer.name}`}
              />
            </Card>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CompanyPoliciesPage;
