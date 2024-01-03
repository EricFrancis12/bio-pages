import { Metadata } from 'next';
import useProtectedRoute from '../lib/hooks/useProtectedRoute';
import { fetchBioPagesByUser_id } from '../lib/data';

export const metadata: Metadata = {
    title: 'Dashboard'
};

export default async function page() {
    const session = await useProtectedRoute();
    const user_id = session?.user?.name;

    const bioPages = user_id
        ? await fetchBioPagesByUser_id(user_id)
        : [];

    return (
        <div>
            <div>
                <h1>
                    Dashboard
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
