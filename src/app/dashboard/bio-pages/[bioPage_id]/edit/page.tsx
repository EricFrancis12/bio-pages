import { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';
import useProtectedRoute from '../../../../lib/hooks/useProtectedRoute';
import { fetchBioPageBy_id } from '@/app/lib/data';
import type { TBioPage } from '@/app/lib/types';
import BioPageEditor from '@/app/lib/components/BioPageEditor/BioPageEditor';

export const metadata: Metadata = {
    title: 'Edit Bio Page',
};

export default async function Page({ params }: {
    params: { bioPage_id: string },
}) {
    const session = await useProtectedRoute();
    if (!session) {
        return redirect('/login');
    }

    const bioPage: TBioPage | null = await fetchBioPageBy_id(params.bioPage_id);
    if (!bioPage) {
        return notFound();
    }

    return (
        <BioPageEditor bioPage={bioPage} />
    )
}
