import { Metadata } from 'next';
import useProtectedRoute from '../../../../lib/hooks/useProtectedRoute';
import { fetchBioPageBy_id, updateExistingBioPage } from '@/app/lib/data';
import type { BioPage } from '@/app/lib/types';
import BioPageEditor from '@/app/lib/components/BioPageEditor/BioPageEditor';



export const metadata: Metadata = {
    title: 'Edit Bio Page'
};

export default async function page({ params }: { params: { bioPage_id: string } }) {
    const session = await useProtectedRoute();

    const bioPage: BioPage | null =
        session
            ? await fetchBioPageBy_id(params.bioPage_id)
            : null;

    async function handleUpdateBioPage(bioPage: BioPage) {
        'use server';
        if (!bioPage) return;
        const session = await useProtectedRoute();
        if (session) {
            await updateExistingBioPage(bioPage);
        }
    }

    return (
        <BioPageEditor bioPage={bioPage} handleUpdateBioPage={handleUpdateBioPage} />
    )
}
