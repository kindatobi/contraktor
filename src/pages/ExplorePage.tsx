import { useSearchParams } from 'react-router-dom';
import { CaretLeft, CaretRight, SquaresFour, List as ListIcon } from 'phosphor-react';
import { useDebouncedCallback } from 'use-debounce';
import { useStore } from '../store/useStore';
import { useArtisans } from '../queries/query';
import { ArtisanCard } from '../features/artisans/ArtisanCard';
import { ArtisanFilters } from '../features/artisans/ArtisanFilters';
import { clsx } from 'clsx';
import type { Artisan } from '../types';

export function ExplorePage() {
    const { viewMode, toggleViewMode } = useStore();
    const [searchParams, setSearchParams] = useSearchParams();


    const page = Number(searchParams.get('page') ?? 1);
    const search = searchParams.get('search') || '';
    const trade = searchParams.get('trade') || '';
    const location = searchParams.get('location') || '';

    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('search', term);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        setSearchParams(params, { replace: true });
    }, 500);

    const handleTradeChange = (trade: string) => {
        const params = new URLSearchParams(searchParams);
        if (trade) {
            params.set('trade', trade);
        } else {
            params.delete('trade');
        }
        params.set('page', '1');
        setSearchParams(params, { replace: true });
    };

    const handleLocationChange = (location: string) => {
        const params = new URLSearchParams(searchParams);
        if (location) {
            params.set('location', location);
        } else {
            params.delete('location');
        }
        params.set('page', '1');
        setSearchParams(params, { replace: true });
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams);
        params.set('page', newPage.toString());
        setSearchParams(params, { replace: true });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const { data, isLoading, isError } = useArtisans(page, search, trade, location);

    const artisans = data?.data?.artisans || [];
    const totalPages = data?.data?.totalPages || 0;

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Explore Artisans</h1>
                    <p className="mt-1 text-gray-500">Find the best local professionals for your project.</p>
                </div>
                <div className="mt-4 sm:mt-0 flex items-center space-x-2 bg-white rounded-lg border border-gray-200 p-1">
                    <button
                        onClick={() => viewMode !== 'grid' && toggleViewMode()}
                        className={clsx(
                            "p-2 rounded-md transition-colors",
                            viewMode === 'grid' ? "bg-gray-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                        )}
                        aria-label="Grid View"
                    >
                        <SquaresFour weight="fill" className="h-5 w-5" />
                    </button>
                    <button
                        onClick={() => viewMode !== 'list' && toggleViewMode()}
                        className={clsx(
                            "p-2 rounded-md transition-colors",
                            viewMode === 'list' ? "bg-gray-100 text-blue-600" : "text-gray-400 hover:text-gray-600"
                        )}
                        aria-label="List View"
                    >
                        <ListIcon weight="fill" className="h-5 w-5" />
                    </button>
                </div>
            </div>

            <ArtisanFilters
                search={search}
                trade={trade}
                location={location}
                onSearchChange={handleSearch}
                onTradeChange={handleTradeChange}
                onLocationChange={handleLocationChange}
            />

            {isError && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative mb-6" role="alert">
                    <strong className="font-bold">Error!</strong>
                    <span className="block sm:inline"> Failed to load artisans. Please try again.</span>
                </div>
            )}

            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                {isLoading ? (
                    [...Array(6)].map((_, i) => (
                        <div key={i} className="h-64 bg-gray-100 rounded-lg animate-pulse" />
                    ))
                ) : artisans.length > 0 ? (
                    artisans.map((artisan: Artisan) => (
                        <ArtisanCard key={artisan.id} artisan={artisan} />
                    ))
                ) : (
                    null
                )}
            </div>

            {!isLoading && artisans.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">No artisans found matching your criteria.</p>
                </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-8 flex justify-center items-center space-x-4">
                    <button
                        onClick={() => handlePageChange(Math.max(1, page - 1))}
                        disabled={page === 1}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <CaretLeft className="mr-2 h-4 w-4" />
                        Previous
                    </button>
                    <span className="text-sm text-gray-700">
                        Page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                    </span>
                    <button
                        onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                        disabled={page === totalPages}
                        className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                        <CaretRight className="ml-2 h-4 w-4" />
                    </button>
                </div>
            )}
        </div>
    );
}
