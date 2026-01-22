import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import type { RequestsByDay } from '../../types';

interface AnalyticsChartProps {
    data: RequestsByDay[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-200 shadow-md rounded-md">
                <p className="font-semibold text-gray-900">{label}</p>
                <p className="text-gray-600">
                    Requests: <span className="font-bold text-blue-600">{payload[0].value}</span>
                </p>
            </div>
        );
    }

    return null;
};

export function AnalyticsChart({ data }: AnalyticsChartProps) {
    return (
        <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                    <XAxis
                        dataKey="date"
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        dy={10}
                    />
                    <YAxis
                        tick={{ fill: '#6b7280', fontSize: 12 }}
                        axisLine={false}
                        tickLine={false}
                        dx={-10}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f3f4f6' }} />
                    <Bar
                        dataKey="count"
                        fill="#3b82f6"
                        radius={[4, 4, 0, 0]}
                        barSize={40}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
