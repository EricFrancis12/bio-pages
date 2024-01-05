import { NextResponse as res } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';
import { checkBioPage_idAvailability, changeBioPage_id } from '@/app/lib/data';

export async function POST(req: Request, { params }: any) {
    const session = await useProtectedRoute();

    if (!session) {
        return res.json({ success: false });
    }

    const { _id: bioPage_id }: { _id: string } = await req.json();

    try {
        const bioPage_idAvailable = await checkBioPage_idAvailability(bioPage_id);
        if (!bioPage_idAvailable) {
            return res.json({ success: false, message: `${bioPage_id} is unavailable.` });
        }

        await changeBioPage_id(params.bioPage_id, bioPage_id);

        return res.json({ success: true });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: err });
    }
}