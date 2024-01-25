import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest): NextResponse | null {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}/api/auth/signout`)
}