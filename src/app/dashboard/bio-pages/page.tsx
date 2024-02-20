import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import useProtectedRoute from '../../lib/hooks/useProtectedRoute';
import type { TBioPage } from '@/app/lib/types';
import { fetchBioPagesByUser_id } from '../../lib/data';
import BioPagesOverview from '@/app/lib/components/BioPagesOverview/BioPagesOverview';

export const metadata: Metadata = {
    title: 'Bio Pages List'
};

export default async function Page() {
    const session = await useProtectedRoute();
    const user_id = session?.user?.name;
    if (!user_id) {
        return redirect('/login');
    }

    const bioPages: TBioPage[] = await fetchBioPagesByUser_id(user_id);
    if (!bioPages) {
        return notFound();
    }

    return (
        <BioPagesOverview
            bioPages={bioPages}
        />
    )
}
