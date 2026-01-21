export const simulateDelay = (ms: number = 800) =>
    new Promise((resolve) => setTimeout(resolve, ms));

export const simulateRandomError = (errorRate: number = 0.1) => {
    if (Math.random() < errorRate) {
        throw new Error("Network request failed. Please try again.");
    }
};
