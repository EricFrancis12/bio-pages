import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import useProtectedRoute from '../lib/hooks/useProtectedRoute';
import type { TBioPage } from '../lib/types';
import Dashboard from '../lib/components/Dashboard/Dashboard';
import { fetchBioPagesByUser_id } from '../lib/data';

export const metadata: Metadata = {
    title: 'Dashboard'
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
        <Dashboard bioPages={bioPages} />
    )
}
