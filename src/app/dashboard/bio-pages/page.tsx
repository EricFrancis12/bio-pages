import { Metadata } from 'next';
import { redirect, notFound } from 'next/navigation';
import useProtectedRoute from '../../lib/hooks/useProtectedRoute';
import type { BioPage } from '@/app/lib/types';
import { fetchBioPagesByUser_id } from '../../lib/data';

export const metadata: Metadata = {
    title: 'Bio Pages List'
};

export default async function page() {
    const session = await useProtectedRoute();
    const user_id = session?.user?.name;
    if (!user_id) {
        return redirect('/login');
    }

    const bioPages: BioPage[] = await fetchBioPagesByUser_id(user_id);
    if (!bioPages) {
        return notFound();
    }

    return (
        <div>
            <div>
                <h1>
                    Bio Pages List
                </h1>
            </div>
            <div>
                {bioPages.map((bioPage, index) => (
                    <div key={index}>
                        Example bioPage
                    </div>
                ))}
            </div>
        </div>
    )
}
