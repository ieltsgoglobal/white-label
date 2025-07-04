import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getAllSubdomains } from '@/lib/superbase/organization-table';

export async function verifySubdomain() {
    const headersList = headers();

    // mj.localhost:3000 (site name without protocol)
    const host = headersList.get('host');

    // returns http or https protocol
    const protocol = headersList.get('x-forwarded-proto') || 'http';

    // http://mj.localhost:3000
    const fullUrl = `${protocol}://${host}`;

    // Extract the subdomain (first part of hostname)
    const subdomain = host?.split('.')[0] || "";

    // If no subdomains return children
    if (subdomain.includes("localhost") || subdomain.length <= 2) {
        return; // No validation needed
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