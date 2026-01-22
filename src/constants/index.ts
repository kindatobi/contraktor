import type { ServiceRequestFormInputs } from '../lib/validators';

export const DELAY_MS = 800;

export const SERVICE_REQUEST_DEFAULT_VALUES: ServiceRequestFormInputs = {
    serviceType: '',
    preferredDate: '',
    description: '',
    customerName: '',
    customerEmail: '',
    customerPhone: '',
};
