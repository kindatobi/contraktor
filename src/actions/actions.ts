import type { ServiceRequest } from "../types/index";
import { simulateDelay, simulateRandomError } from "../utils";

export const createServiceRequest = async (
    request: ServiceRequest,
): Promise<{ success: boolean; message: string; requestId: string }> => {
    await simulateDelay(800);
    simulateRandomError(0.1);

    if (
        !request.customerName ||
        !request.customerEmail ||
        !request.customerPhone
    ) {
        throw new Error("Missing required customer information");
    }

    if (!request.serviceType || !request.description) {
        throw new Error("Missing required service details");
    }

    const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substring(7)}`;

    console.log("Service request created:", {
        ...request,
        requestId,
        createdAt: new Date().toISOString(),
    });

    return {
        success: true,
        message:
            "Service request submitted successfully! The artisan will contact you soon.",
        requestId,
    };
};
