import { headers } from 'next/headers';
// import { getAllSubdomains } from '@/lib/superbase/organization-table';

export async function verifySubdomain() {
    const subdomain = getCurrentSubdomain();

    // Now if subdomain is there, check validity
    // const result = await getAllSubdomains();
    // if ('error' in result) {
    //     console.warn(`⛔ Failed to fetch subdomains`);
    //     notFound();
    // }    
    // if (!result.subdomains.includes(subdomain)) {
    //     console.warn(`⛔ Unauthorized subdomain: ${subdomain}`);
    //     notFound();
    // }

    if (!allowedSubdomains.includes(subdomain)) {
        console.warn(`⛔ Unauthorized subdomain: ${subdomain}`)
        return null
    }
}


export function getCurrentSubdomain(): string {
    // mj.localhost:3000 =  return mj
    // mj.ieltsgoglobal.com = return mj
    // ieltsgoglobal.com = return ieltsgoglobal
    // localhost:3000 = return localhost:3000
    const host = headers().get("host");

    if (!host) return ""

    // mj.ieltsgoglobal.com = 1.mj, 2.ieltsgoglobal 3.com
    const parts = host.split(".");

    return parts[0];
}



// Temporary hardcoded subdomain list
const allowedSubdomains = [
    "", // keep it
    "iop", // testing
    "ieltsgoglobal", // keep it
    "localhost:3000", // keep it
    "mj-study-abroad"
]



export function isSubdomain() {
    const subdomain = getCurrentSubdomain()

    if (!subdomain) return null

    if (subdomain == "ieltsgoglobal" || subdomain == "localhost:3000") return false // its main website

    return true // if subdomain holds any rather than ieltsgoglobal and localhost:3000
}