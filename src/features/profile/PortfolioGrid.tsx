import type { PortfolioItem } from '../../types';

interface PortfolioGridProps {
    items: PortfolioItem[];
}

export function PortfolioGrid({ items }: PortfolioGridProps) {
    if (items.length === 0) {
        return (
            <div className="text-gray-500 italic">No portfolio items available.</div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
                <div key={item.id} className="group relative rounded-lg overflow-hidden bg-gray-100 aspect-w-4 aspect-h-3">
                    <img
                        src={item.imageUrl}
                        alt={item.title}
                        className="object-cover w-full h-48 group-hover:opacity-75 transition-opacity duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-end p-4">
                        <h3 className="text-white font-semibold text-sm">{item.title}</h3>
                        <p className="text-gray-200 text-xs mt-1 line-clamp-2">{item.description}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
