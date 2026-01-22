import { CurrencyDollar, ShoppingCart, Users as UsersIcon, Package } from 'phosphor-react';
import { useAnalytics } from '../../queries/query';
import { AnalyticsChart } from '../../features/admin/AnalyticsChart';
import { StatCard } from '../../components/ui/StatCard';

export function AdminPage() {
  const { data, isLoading } = useAnalytics();
  const analytics = data?.data;

  if (isLoading || !analytics) {
    return (
      <div className="animate-pulse space-y-6">
        <div className="h-12 bg-gray-200 rounded w-64" />
        <div className="grid grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Page Title */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${analytics.totalRevenue.toLocaleString()}`}
          icon={<CurrencyDollar className="h-8 w-8" weight="fill" />}
        />
        <StatCard
          title="Total Requests"
          value={analytics.totalRequests}
          icon={<ShoppingCart className="h-8 w-8" weight="fill" />}
        />
        <StatCard
          title="Active Artisans"
          value={analytics.activeArtisans}
          icon={<UsersIcon className="h-8 w-8" weight="fill" />}
        />
        <StatCard
          title="Average Rating"
          value={analytics.averageRating.toFixed(1)}
          icon={<Package className="h-8 w-8" weight="fill" />}
        />
      </div>

      {/* Analytics Chart */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Service Requests Analytics</h2>
        <AnalyticsChart data={analytics.requestsByDay} />
      </div>
    </div>
  );
}

export default AdminPage;