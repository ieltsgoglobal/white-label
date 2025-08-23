export type B2CPlanId = "b2c-7d" | "b2c-14d" | "b2c-21d" | "b2c-test-7d";

export interface B2CPlan {
    id: B2CPlanId;
    title: string;
    label: string;
    durationDays: number;
    priceInr: number;
    type: "B2C_V1_FIXED";
    isActive: boolean;
}

const B2C_PLANS: Record<B2CPlanId, B2CPlan> = {
    "b2c-7d": { id: "b2c-7d", title: "7-Day Access", label: "1-Week Validity", durationDays: 7, priceInr: 699, type: "B2C_V1_FIXED", isActive: true },
    "b2c-14d": { id: "b2c-14d", title: "14-Day Access", label: "2-Week Validity", durationDays: 14, priceInr: 799, type: "B2C_V1_FIXED", isActive: true },
    "b2c-21d": { id: "b2c-21d", title: "21-Day Access", label: "3-Week Validity", durationDays: 21, priceInr: 899, type: "B2C_V1_FIXED", isActive: true },
    "b2c-test-7d": { id: "b2c-test-7d", title: "7-Day Test", label: "1-Week Validity", durationDays: 7, priceInr: 1, type: "B2C_V1_FIXED", isActive: process.env.NODE_ENV !== "production" },
};

export function getActiveB2CPlans(): B2CPlan[] {
    return Object.values(B2C_PLANS).filter(p => p.isActive);
}
export function requireB2CPlan(id: B2CPlanId): B2CPlan {
    const plan = B2C_PLANS[id];
    if (!plan || !plan.isActive) throw new Error("Invalid or inactive B2C planId");
    return plan;
}
export function computeB2CAmountPaise(plan: B2CPlan): number {
    return Math.round(plan.priceInr * 100);
}