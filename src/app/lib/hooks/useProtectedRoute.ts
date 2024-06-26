import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';

export default async function useProtectedRoute() {
    const session = await getServerSession();
    if (!session || !session.user) {
        redirect('/login');
    }
    return session;
}
