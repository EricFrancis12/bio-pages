import { NextRequest, NextResponse } from 'next/server';

export function GET(req: NextRequest): NextResponse {
    const url = req.nextUrl.clone();
    return NextResponse.redirect(`${url.protocol}//${url.host}/login`);
}
