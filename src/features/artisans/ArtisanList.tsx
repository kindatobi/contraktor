import type { Artisan } from '../../types';
import { ArtisanCard } from './ArtisanCard';

interface ArtisanListProps {
    artisans: Artisan[];
    isLoading: boolean;
    viewMode: 'grid' | 'list';
}

export function ArtisanList({ artisans, isLoading, viewMode }: ArtisanListProps) {
    if (isLoading && artisans.length === 0) {
        return (
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                ))}
            </div>
        );
    }

    if (artisans.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No artisans found matching your criteria.</p>
            </div>
        );
    }

    return (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
            {artisans.map((artisan) => (
                <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
        </div>
    );
}
