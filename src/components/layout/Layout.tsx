import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Toaster } from 'sonner';

export function Layout() {
    return (
        <div className="min-h-screen font-sans bg-gray-50 text-gray-900">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet />
            </main>
            <Toaster position="top-right" richColors />
        </div>
    );
}
