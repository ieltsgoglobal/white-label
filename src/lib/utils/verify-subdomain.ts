import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllSubdomains } from '@/lib/superbase/organization-table';

export async function verifySubdomain() {
    const subdomain = isSubdomain();

    if (!subdomain) {
        return; // ✅ No subdomain, nothing to validate
    }


    // Now if subdomain is there, check validity
    const result = await getAllSubdomains(); // ✅ Get subdomains from DB
    if ('error' in result) {
        console.warn(`⛔ Failed to fetch subdomains`);
        notFound();
    }
    if (!result.subdomains.includes(subdomain)) {
        console.warn(`⛔ Unauthorized subdomain: ${subdomain}`);  // ❌ Subdomain not in DB
        notFound();
    }
}


export function isSubdomain(): string | null {
    // mj.localhost:3000 (site name without protocol)
    const host = headers().get("host");

    // Extract the subdomain (first part of hostname)
    const subdomain = host?.split(".")[0] || "";


    // Skip if it's localhost or root domain
    if (subdomain.includes("localhost") || subdomain.length <= 2) {
        return null;
    }

    return subdomain;
}
