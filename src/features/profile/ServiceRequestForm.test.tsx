import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ServiceRequestForm } from './ServiceRequestForm';

// Mock sonner toast
vi.mock('sonner', () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn(),
    },
}));

// Mock API
vi.mock('../../services/api', () => ({
    api: {
        submitRequest: vi.fn().mockResolvedValue({ data: { success: true } }),
    },
}));

describe('ServiceRequestForm', () => {
    it('renders form fields', () => {
        render(<ServiceRequestForm artisanId="1" artisanName="Test Artisan" />);

        expect(screen.getByLabelText(/service type/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/preferred date/i)).toBeInTheDocument();
        expect(screen.getByText(/request service from test artisan/i)).toBeInTheDocument();
    });

    it('validates required fields', async () => {
        render(<ServiceRequestForm artisanId="1" artisanName="Test Artisan" />);

        const submitBtn = screen.getByRole('button', { name: /request service/i });
        fireEvent.click(submitBtn);

        await waitFor(() => {
            expect(screen.getByText(/service type must be at least 3 characters/i)).toBeInTheDocument();
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        });
    });
});
