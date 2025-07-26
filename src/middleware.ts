import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET)

export async function middleware(req: NextRequest) {
    const token = req.cookies.get('token')?.value

    if (!token) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        await jwtVerify(token, JWT_SECRET)
        return NextResponse.next()
    } catch {
        return NextResponse.json({ error: 'Invalid Token' }, { status: 401 })
    }
}

export const config = {
    matcher: [
        '/api/writing-evaluation',
        '/api/speaking-evaluation/s3-upload',
        '/api/speaking-evaluation/evaluate-response',
        '/api/speaking-evaluation/assemblyai,',
    ]
}