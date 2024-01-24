import { NextResponse as res } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';
import { updateExistingBioPage, deleteBioPageBy_id } from '@/app/lib/data';
import { BioPage } from '@/app/lib/types';

export async function PUT(req: Request, { params }: any) {
    const session = await useProtectedRoute();
    if (!session) {
        return res.json({ success: false, message: 'unauthorized' });
    }

    const user_id = session.user?.name;
    const bioPage: BioPage = await req.json();

    if (bioPage?._id !== params.bioPage_id
        || bioPage?.user_id !== user_id) {
        return res.json({ success: false });
    }

    try {
        await updateExistingBioPage(bioPage);
        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: err });
    }
}

export async function DELETE(req: Request, { params }: { params: { bioPage_id: string } }) {
    const session = await useProtectedRoute();

    if (!session) {
        return res.json({ success: false });
    }

    try {
        await deleteBioPageBy_id(params.bioPage_id as string);
        return res.json({ success: true });
    } catch (err) {
        return res.json({ success: false, message: err });
    }
}
