import React from 'react';

interface StatsCardProps {
  title: string;
  value: number | string;
  description?: string;
  icon?: React.ReactNode;
}

export default function StatsCard({ title, value, description, icon }: StatsCardProps) {
  return (
    <div className="max-w-sm w-full rounded-xl shadow-lg bg-gradient-to-r from-white to-gray-100 hover:from-gray-100 hover:to-white p-6 transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex items-center space-x-4">
        {icon && <div className="text-indigo-500">{icon}</div>}
        <div className="text-left">
          <h3 className="text-lg font-medium text-gray-500">{title}</h3>
          <p className="text-3xl font-extrabold text-gray-800">{value}</p>
          {description && (
            <p className="text-sm text-gray-400 mt-1">{description}</p>
          )}
        </div>
      </div>
    </div>
  );
}
