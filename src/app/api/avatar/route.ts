import { del } from '@vercel/blob';
import { NextResponse as res } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';

export async function DELETE(req: Request): Promise<res> {
    const session = await useProtectedRoute();
    if (!session) {
        return res.json({ success: false, message: 'unauthorized' });
    }

    const { url } = await req.json();

    if (!url) {
        return res.json({
            success: false,
            message: 'Argument "url" not specified'
        });
    }

    try {
        await del(url);

        return res.json({
            success: true
        });
    } catch (err) {
        return res.json(
            { error: (err as Error).message },
            { status: 400 }
        );
    }
}