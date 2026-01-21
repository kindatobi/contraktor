import { useAnalytics } from '../../queries/query';
import { AnalyticsChart } from '../../features/admin/AnalyticsChart';
import { Users, ChartBar, Star, Wallet } from 'phosphor-react';

export function AdminPage() {
    const { data, isLoading, isError } = useAnalytics();
    const analytics = data?.data;

    if (isLoading) {
        return (
            <div className="animate-pulse space-y-8">
                <div className="h-8 w-48 bg-gray-200 rounded"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
                    ))}
                </div>
                <div className="h-96 bg-gray-200 rounded-lg"></div>
            </div>
        );
    }

    if (isError || !analytics) {
        return (
            <div className="text-center py-12 text-red-600">
                Failed to load analytics data.
            </div>
        );
    }

    const stats = [
        { label: 'Total Requests', value: analytics.totalRequests, icon: ChartBar, color: 'bg-blue-100 text-blue-600' },
        { label: 'Active Artisans', value: analytics.activeArtisans, icon: Users, color: 'bg-green-100 text-green-600' },
        { label: 'Avg Rating', value: analytics.averageRating, icon: Star, color: 'bg-yellow-100 text-yellow-600' },
        { label: 'Total Revenue', value: `$${analytics.totalRevenue.toLocaleString()}`, icon: Wallet, color: 'bg-purple-100 text-purple-600' },
    ];

    return (
        <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 flex items-center">
                        <div className={`p-4 rounded-full mr-4 ${stat.color}`}>
                            <stat.icon className="h-6 w-6" weight="fill" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500">{stat.label}</p>
                            <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Charts */}
            <div>
                <AnalyticsChart data={analytics.requestsByDay} />
            </div>
        </div>
    );
}
