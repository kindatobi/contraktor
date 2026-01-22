import { z } from 'zod';

const phoneRegex = new RegExp(
    /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const serviceRequestSchema = z.object({
    serviceType: z.string().min(3, "Service type must be at least 3 characters"),
    preferredDate: z.string().refine((date) => new Date(date) > new Date(), {
        message: "Preferred date must be in the future",
    }),
    description: z.string().min(10, "Please provide a detailed description (min 10 chars)"),
    customerName: z.string().min(2, "Name is required"),
    customerEmail: z.string().email("Invalid email address"),
    customerPhone: z.string().regex(phoneRegex, "Invalid phone number"),
});

export type ServiceRequestFormInputs = z.infer<typeof serviceRequestSchema>;
