import { MagnifyingGlass, MapPin } from 'phosphor-react';


interface ArtisanFiltersProps {
    search: string;
    trade: string;
    location: string;
    onSearchChange: (value: string) => void;
    onTradeChange: (value: string) => void;
    onLocationChange: (value: string) => void;
}

const TRADES = ['Plumber', 'Electrician', 'Carpenter', 'HVAC Technician', 'Painter', 'Landscaper', 'Roofer', 'Tile Installer'];

export function ArtisanFilters({ search, trade, location, onSearchChange, onTradeChange, onLocationChange }: ArtisanFiltersProps) {

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">

            {/* Search */}
            <div className="flex-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MagnifyingGlass className="h-5 w-5 text-gray-400" />
                </div>
                <input
                    type="text"
                    placeholder="Search by name, trade, or location..."
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition-colors"
                    defaultValue={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            {/* Trade Filter */}
            <div className="w-full md:w-48">
                <select
                    className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    value={trade || ''}
                    onChange={(e) => onTradeChange(e.target.value)}
                >
                    <option value="">All Trades</option>
                    {TRADES.map((t) => (
                        <option key={t} value={t}>{t}</option>
                    ))}
                </select>
            </div>

            {/* Location Filter (Simplified for now) */}
            <div className="w-full md:w-48">
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder="City, State"
                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        value={location || ''}
                        onChange={(e) => onLocationChange(e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
}
