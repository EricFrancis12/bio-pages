import { NextRequest, NextResponse } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';
import { createAndSaveNewBioPage } from '@/app/lib/data';

export async function GET(req: NextRequest) {
    const session = await useProtectedRoute();
    const user_id = session?.user?.name;

    if (user_id) {
        const url = req.nextUrl.clone();
        try {
            const newBioPage = await createAndSaveNewBioPage(user_id);
            if (newBioPage) {
                return NextResponse.redirect(`${url.protocol}//${url.host}/dashboard/bio-pages/${newBioPage._id}/edit`);
            }
        } catch (err) {
            throw err;
        }
    }

    return NextResponse.redirect('/login');
}
