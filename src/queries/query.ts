import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';


export function useArtisans(page: number, search: string, trade: string, location: string) {
    return useQuery({
        queryKey: ['artisans', page, search, trade, location],
        queryFn: () => api.getArtisans(page, search, trade, location),
        placeholderData: (previousData) => previousData,
    });
}

export function useArtisan(id: string) {
    return useQuery({
        queryKey: ['artisan', id],
        queryFn: () => api.getArtisanById(id),
        enabled: !!id,
    });
}

export function useAnalytics() {
    return useQuery({
        queryKey: ['analytics'],
        queryFn: api.getAnalytics
    })
}
