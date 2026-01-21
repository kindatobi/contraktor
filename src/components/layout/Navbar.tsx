import { Link, useLocation } from 'react-router-dom';
import { House, Wrench, ChartLine, User } from 'phosphor-react';
import clsx from 'clsx';

export function Navbar() {
    const location = useLocation();

    const navItems = [
        { label: 'Explore', path: '/', icon: House },
        { label: 'Admin', path: '/admin', icon: ChartLine },
    ];

    return (
        <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex-shrink-0 flex items-center gap-2">
                            <Wrench className="h-8 w-8 text-blue-600" weight="fill" />
                            <span className="font-bold text-xl text-gray-900">Contraktor</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={clsx(
                                        'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium',
                                        location.pathname === item.path
                                            ? 'border-blue-500 text-gray-900'
                                            : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
                                    )}
                                >
                                    <item.icon className="mr-2 h-4 w-4" weight="bold" />
                                    {item.label}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center">
                        {/* Placeholder for user profile/auth if needed */}
                        <div className="flex-shrink-0">
                            <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                <User weight="fill" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
