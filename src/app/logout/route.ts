import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest): NextResponse {
    const { origin } = req.nextUrl;
    return NextResponse.redirect(`${origin}/api/auth/signout`);
}
