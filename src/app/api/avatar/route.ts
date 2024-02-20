import { del } from '@vercel/blob';
import { NextRequest, NextResponse } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';

export async function DELETE(req: NextRequest): Promise<NextResponse> {
    const session = await useProtectedRoute();
    if (!session) {
        return NextResponse.json({ success: false, message: 'unauthorized' });
    }

    const { url } = await req.json();

    if (!url) {
        return NextResponse.json({
            success: false,
            message: 'Argument "url" not specified'
        });
    }

    try {
        await del(url);

        return NextResponse.json({
            success: true
        });
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 400 }
        );
    }
}