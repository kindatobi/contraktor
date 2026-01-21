import { Star, MapPin, CurrencyDollar } from 'phosphor-react';
import { Link } from 'react-router-dom';
import type { Artisan } from '../../types';

interface ArtisanCardProps {
    artisan: Artisan;
}

export function ArtisanCard({ artisan }: ArtisanCardProps) {
    return (
        <Link
            to={`/artisan/${artisan.id}`}
            className="block bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100 overflow-hidden"
        >
            <div className="p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-4">
                        <img
                            src={artisan.avatar}
                            alt={artisan.name}
                            className="h-16 w-16 rounded-full object-cover border-2 border-gray-50"
                        />
                        <div>
                            <h3 className="text-lg font-semibold text-gray-900">{artisan.name}</h3>
                            <p className="text-sm font-medium text-blue-600">{artisan.trade}</p>
                        </div>
                    </div>
                    <div className={`
            px-2.5 py-0.5 rounded-full text-xs font-medium
            ${artisan.availability === 'available' ? 'bg-green-100 text-green-800' :
                            artisan.availability === 'busy' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'}
          `}>
                        {artisan.availability === 'available' ? 'Available' :
                            artisan.availability === 'busy' ? 'Busy' : 'Unavailable'}
                    </div>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-4 text-sm text-gray-600">
                    <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1.5" weight="fill" />
                        <span className="font-medium text-gray-900">{artisan.rating}</span>
                        <span className="text-gray-400 ml-1">/ 5.0</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-4 w-4 text-gray-400 mr-1.5" weight="bold" />
                        <span className="truncate">{artisan.location}</span>
                    </div>
                    <div className="flex items-center col-span-2">
                        <CurrencyDollar className="h-4 w-4 text-gray-400 mr-1.5" weight="bold" />
                        <span className="font-medium text-gray-900">${artisan.hourlyRate}</span>
                        <span className="text-gray-400 ml-1">/ hour</span>
                    </div>
                </div>
            </div>
        </Link>
    );
}
