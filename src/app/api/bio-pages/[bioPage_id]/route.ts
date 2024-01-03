import { NextResponse as res } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';
import { deleteBioPageBy_id } from '@/app/lib/data';

export async function DELETE(req: Request, { params }: any) {
    const session = await useProtectedRoute();

    if (session) {
        try {
            await deleteBioPageBy_id(params.bioPage_id as string);
            return res.json({ success: true });
        } catch (err) {
            return res.json({ success: false, message: err });
        }
    } else {
        return res.json({ success: false });
    }
}
