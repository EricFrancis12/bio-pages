import { NextResponse } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';
import { createAndSaveNewBioPage } from '@/app/lib/data';

export async function GET(req: Request) {
    const session = await useProtectedRoute();
    const user_id = session?.user?.name;

    if (user_id) {
        try {
            const newBioPage = await createAndSaveNewBioPage(user_id);
            return NextResponse.redirect(`http://localhost:3000/dashboard/bio-pages/${newBioPage._id}/edit`);
        } catch (err) {
            throw err;
        }
    }

    return NextResponse.redirect('/login');
}
