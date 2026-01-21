import type { Artisan } from '../types';

export function filterArtisans(artisans: Artisan[], search: string = '', trade: string = '', location: string = '', availability?: string): Artisan[] {
    let filtered = [...artisans];

    if (search) {
        const searchLower = search.toLowerCase();
        filtered = filtered.filter(
            (a) =>
                a.name.toLowerCase().includes(searchLower) ||
                a.trade.toLowerCase().includes(searchLower) ||
                a.location.toLowerCase().includes(searchLower)
        );
    }

    // Handle case where trade might be "All Trades" or empty from select
    if (trade && trade !== "All Trades") {
        filtered = filtered.filter(
            (a) => a.trade.toLowerCase() === trade.toLowerCase()
        );
    }

    if (location) {
        filtered = filtered.filter((a) =>
            a.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    if (availability) {
        filtered = filtered.filter((a) => a.availability === availability);
    }

    return filtered;
}
