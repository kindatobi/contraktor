import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Star, CurrencyDollar, CheckCircle } from 'phosphor-react';
import { useArtisan } from '../queries/query';
import { PortfolioGrid } from '../features/profile/PortfolioGrid';
import { ServiceRequestForm } from '../features/profile/ServiceRequestForm';

export function ProfilePage() {
    const { id } = useParams<{ id: string }>();
    const { data, isLoading, isError } = useArtisan(id || '');
    const artisan = data?.data;

    if (isLoading) {
        return (
            <div className="animate-pulse">
                <div className="h-48 bg-gray-200 rounded-lg mb-8"></div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="h-64 bg-gray-200 rounded-lg"></div>
                    <div className="h-96 bg-gray-200 rounded-lg col-span-2"></div>
                </div>
            </div>
        );
    }

    if (isError || !artisan) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Artisan not found</h2>
                <Link to="/" className="text-blue-600 hover:text-blue-800">Return to Explore</Link>
            </div>
        );
    }

    return (
        <div>
            <Link to="/" className="inline-flex items-center text-gray-500 hover:text-gray-900 mb-6">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Explore
            </Link>

            {/* Header Profile Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                    <img
                        src={artisan.avatar}
                        alt={artisan.name}
                        className="w-24 h-24 rounded-full object-cover border-4 border-gray-50"
                    />
                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">{artisan.name}</h1>
                        <p className="text-lg text-blue-600 font-medium mb-4">{artisan.trade}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                            <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                <Star className="text-yellow-400 mr-1.5 h-4 w-4" weight="fill" />
                                <span className="font-semibold text-gray-900">{artisan.rating}</span>
                                <span className="ml-1">/ 5.0 Rating</span>
                            </div>
                            <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                <MapPin className="text-gray-400 mr-1.5 h-4 w-4" weight="bold" />
                                {artisan.location}
                            </div>
                            <div className="flex items-center bg-gray-50 px-3 py-1 rounded-full">
                                <CurrencyDollar className="text-gray-400 mr-1.5 h-4 w-4" weight="bold" />
                                <span className="font-semibold text-gray-900">${artisan.hourlyRate}</span>/hr
                            </div>
                            <div className={`flex items-center px-3 py-1 rounded-full ${artisan.availability === 'available' ? 'bg-green-100 text-green-800' :
                                artisan.availability === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-red-100 text-red-800'
                                }`}>
                                <CheckCircle className="mr-1.5 h-4 w-4" weight="fill" />
                                {artisan.availability === 'available' ? 'Available for work' :
                                    artisan.availability === 'busy' ? 'Currently busy' : 'Unavailable'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Bio & Form */}
                <div className="space-y-8">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
                        <h3 className="text-lg font-bold text-gray-900 mb-3">About</h3>
                        <p className="text-gray-600 leading-relaxed">{artisan.bio}</p>
                    </div>

                    <div className="sticky top-24">
                        <ServiceRequestForm
                            artisanId={artisan.id}
                            artisanName={artisan.name}
                        />
                    </div>
                </div>

                {/* Right Column: Portfolio */}
                <div className="lg:col-span-2 space-y-8">
                    <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-6">Recent Projects</h3>
                        <PortfolioGrid items={artisan.portfolio} />
                    </div>
                </div>
            </div>
        </div>
    );
}
