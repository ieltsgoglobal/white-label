// /lib/b2b-plans.ts
export type B2BPlanId =
    | "individual"
    | "freelancer"
    | "startup"
    | "business"
    | "enterprise"
    | "test";

export interface Plan {
    id: B2BPlanId;
    title: string;
    users: number;
    pricePerUser: number; // in INR
    isActive: boolean;
}

const PLANS: Record<B2BPlanId, Plan> = {
    individual: { id: "individual", title: "Individual", users: 5, pricePerUser: 899, isActive: true },
    freelancer: { id: "freelancer", title: "Freelancer", users: 10, pricePerUser: 799, isActive: true },
    startup: { id: "startup", title: "Startup", users: 20, pricePerUser: 699, isActive: true },
    business: { id: "business", title: "Business", users: 50, pricePerUser: 599, isActive: true },
    enterprise: { id: "enterprise", title: "Enterprise", users: 100, pricePerUser: 499, isActive: true },
    test: { id: "test", title: "Test", users: 10, pricePerUser: 1, isActive: process.env.NODE_ENV === "production" },
};

/** Return all active plans for UI */
export function getActivePlans(): Plan[] {
    return Object.values(PLANS).filter(p => p.isActive);
}

/** Lookup a plan by id (throws if missing/inactive) */
export function requireB2BPlan(planId: B2BPlanId): Plan {
    const plan = PLANS[planId];
    if (!plan || !plan.isActive) throw new Error("Invalid or inactive planId");
    return plan;
}

/** Compute total amount in paise for PhonePe (server-side only) */
export function computeB2BAmountPaise(plan: Plan): number {
    const inr = plan.pricePerUser * plan.users;
    return Math.round(inr * 100);
}