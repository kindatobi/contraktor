import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
}

export function StatCard({ title, value, icon }: StatCardProps) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-gray-500 mb-2">{title}</p>
                    <p className="text-3xl font-bold text-gray-900">{value}</p>
                </div>
                <div className="text-blue-600">
                    {icon}
                </div>
            </div>
        </div>
    );
}
