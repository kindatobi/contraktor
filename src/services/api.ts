import { filterArtisans } from '../utils/filters';
import type { Artisan, AnalyticsData, ApiResponse, RequestsByDay } from "../types";
import artisansData from "../db/artisans.json";
import analyticsData from "../db/analytics.json";
import { DELAY_MS } from '../constants';
import { simulateDelay as delay } from '../utils';

export const api = {
  getArtisans: async (
    page: number = 1,
    search: string = '',
    trade: string = '',
    location: string = ''
  ): Promise<ApiResponse<{ artisans: Artisan[]; total: number; totalPages: number }>> => {
    await delay(DELAY_MS);
    const limit = 9;

    const filtered = filterArtisans(artisansData as Artisan[], search, trade, location);

    const total = filtered.length;
    const totalPages = Math.ceil(total / limit);
    const start = (page - 1) * limit;
    const end = start + limit;
    const paginated = filtered.slice(start, end);

    return {
      data: {
        artisans: paginated,
        total,
        totalPages,
      },
    };
  },

  getArtisanById: async (id: string): Promise<ApiResponse<Artisan>> => {
    await delay(DELAY_MS);
    const artisan = (artisansData as Artisan[]).find((a) => a.id === id);
    if (!artisan) {
      throw new Error("Artisan not found");
    }
    return { data: artisan };
  },

  getAnalytics: async (): Promise<ApiResponse<AnalyticsData>> => {
    await delay(DELAY_MS);
    return { data: analyticsData as AnalyticsData };
  },

  getRequestStats: async (): Promise<ApiResponse<RequestsByDay[]>> => {
    await delay(DELAY_MS);
    return { data: (analyticsData as AnalyticsData).requestsByDay };
  },

  submitRequest: async (data: any): Promise<ApiResponse<{ success: true }>> => {
    await delay(DELAY_MS * 1.5); // Simulate longer processing
    console.log("Submitted Request:", data);

    // Simulate random failure
    if (Math.random() < 0.1) {
      throw new Error("Failed to submit request. Please try again.");
    }

    return { data: { success: true } };
  },
};
