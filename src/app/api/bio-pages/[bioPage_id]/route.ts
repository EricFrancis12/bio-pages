import { NextResponse } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';
import { updateExistingBioPage, deleteBioPageBy_id } from '@/app/lib/data';
import { TBioPage } from '@/app/lib/types';

export async function PUT(req: Request, { params }: { params: { bioPage_id: string } }) {
    const session = await useProtectedRoute();
    if (!session) {
        return NextResponse.json({ success: false, message: 'unauthorized' });
    }

    const user_id = session.user?.name;
    const bioPage: TBioPage = await req.json();

    if (bioPage?._id !== params.bioPage_id
        || bioPage?.user_id !== user_id) {
        return NextResponse.json({ success: false });
    }

    try {
        await updateExistingBioPage(bioPage);
        return NextResponse.json({ success: true });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ success: false, message: err });
    }
}

export async function DELETE(req: Request, { params }: { params: { bioPage_id: string } }) {
    const session = await useProtectedRoute();

    if (!session) {
        return NextResponse.json({ success: false });
    }

    try {
        await deleteBioPageBy_id(params.bioPage_id as string);
        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ success: false, message: err });
    }
}
