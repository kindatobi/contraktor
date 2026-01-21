import { describe, it, expect } from 'vitest';
import { filterArtisans } from './filters';
import type { Artisan } from '../types';

const mockArtisans: Artisan[] = [
    {
        id: '1',
        name: 'John Doe',
        trade: 'Plumber',
        location: 'New York',
        rating: 5,
        hourlyRate: 100,
        avatar: '',
        bio: '',
        portfolio: [],
        availability: 'available'
    },
    {
        id: '2',
        name: 'Jane Smith',
        trade: 'Electrician',
        location: 'New Jersey',
        rating: 4.5,
        hourlyRate: 120,
        avatar: '',
        bio: '',
        portfolio: [],
        availability: 'busy'
    }
];

describe('filterArtisans', () => {
    it('should return all artisans when no filters are provided', () => {
        const result = filterArtisans(mockArtisans);
        expect(result).toHaveLength(mockArtisans.length);
    });

    it('should filter by specific trade', () => {
        const result = filterArtisans(mockArtisans, '', 'Plumber');
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('John Doe');
    });

    it('should filter by search term (name)', () => {
        const result = filterArtisans(mockArtisans, 'Jane');
        expect(result).toHaveLength(1);
        expect(result[0].name).toBe('Jane Smith');
    });

    it('should filter by search term (location)', () => {
        const result = filterArtisans(mockArtisans, 'York');
        expect(result).toHaveLength(1);
        expect(result[0].location).toBe('New York, NY');
    });

    it('should return empty array when no matches found', () => {
        const result = filterArtisans(mockArtisans, '', 'Carpenter');
        expect(result).toHaveLength(0);
    });
});
