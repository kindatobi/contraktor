import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { api } from '../../services/api';
import { serviceRequestSchema, type ServiceRequestFormInputs } from '../../lib/validators';
import { SERVICE_REQUEST_DEFAULT_VALUES } from '../../constants';

interface ServiceRequestFormProps {
    artisanId: string;
    artisanName: string;
}

export function ServiceRequestForm({ artisanId, artisanName }: ServiceRequestFormProps) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<ServiceRequestFormInputs>({
        resolver: zodResolver(serviceRequestSchema),
        defaultValues: SERVICE_REQUEST_DEFAULT_VALUES,
    });

    const onSubmit = async (data: ServiceRequestFormInputs) => {
        try {
            await api.submitRequest({ ...data, artisanId, artisanName });
            toast.success("Request sent successfully! The artisan will contact you soon.");
            reset();
        } catch (error) {
            toast.error("Failed to submit request. Please try again.");
            console.error(error);
        }
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Request Service from {artisanName}</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type</label>
                    <input
                        id="serviceType"
                        type="text"
                        placeholder="e.g., Faucet Repair"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.serviceType ? 'border-red-300' : ''}`}
                        {...register('serviceType')}
                    />
                    {errors.serviceType && <p className="mt-1 text-sm text-red-600">{errors.serviceType.message}</p>}
                </div>

                <div>
                    <label htmlFor="preferredDate" className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input
                        id="preferredDate"
                        type="date"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.preferredDate ? 'border-red-300' : ''}`}
                        {...register('preferredDate')}
                    />
                    {errors.preferredDate && <p className="mt-1 text-sm text-red-600">{errors.preferredDate.message}</p>}
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        id="description"
                        rows={3}
                        placeholder="Describe your issue..."
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.description ? 'border-red-300' : ''}`}
                        {...register('description')}
                    />
                    {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>}
                </div>

                <div>
                    <label htmlFor="customerName" className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                        id="customerName"
                        type="text"
                        className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.customerName ? 'border-red-300' : ''}`}
                        {...register('customerName')}
                    />
                    {errors.customerName && <p className="mt-1 text-sm text-red-600">{errors.customerName.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            id="customerEmail"
                            type="email"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.customerEmail ? 'border-red-300' : ''}`}
                            {...register('customerEmail')}
                        />
                        {errors.customerEmail && <p className="mt-1 text-sm text-red-600">{errors.customerEmail.message}</p>}
                    </div>

                    <div>
                        <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700">Phone</label>
                        <input
                            id="customerPhone"
                            type="tel"
                            className={`mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm p-2 border ${errors.customerPhone ? 'border-red-300' : ''}`}
                            {...register('customerPhone')}
                        />
                        {errors.customerPhone && <p className="mt-1 text-sm text-red-600">{errors.customerPhone.message}</p>}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                    {isSubmitting ? (
                        <span className="flex items-center">
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Sending...
                        </span>
                    ) : (
                        "Request Service"
                    )}
                </button>
            </form>
        </div>
    );
}
