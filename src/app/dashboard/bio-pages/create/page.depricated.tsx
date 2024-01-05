import { Metadata } from 'next';
import useProtectedRoute from '../../../lib/hooks/useProtectedRoute';
import { createAndSaveNewBioPage } from '@/app/lib/data';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
    title: 'Create Bio Page'
};

export default async function page() {
    // Note: This page.tsx is depricated,
    // path '/dashboard/bio-pages/create' is now handled via route.ts

    const session = await useProtectedRoute();
    const user_id = session?.user?.name as string;
    try {
        const newBioPage = user_id
            ? await createAndSaveNewBioPage(user_id)
            : null;

        return newBioPage
            ? redirect(`/dashboard/bio-pages/${newBioPage._id}/edit`)
            : '';
    } catch (err) {
        console.error(err);
        return '';
    }
}
