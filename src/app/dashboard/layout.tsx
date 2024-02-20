import type { Metadata } from 'next';
import useProtectedRoute from '../lib/hooks/useProtectedRoute';
import SideNav from '../lib/components/SideNav/SideNav';

export const metadata: Metadata = {
    title: 'App Dashboard'
};

export default async function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout>
            {children}
        </DashboardLayout>
    );
}

export async function DashboardLayout({
    children,
    demoMode
}: {
    children: React.ReactNode,
    demoMode?: boolean
}) {
    const session = await useProtectedRoute();
    const user_id = session?.user?.name;

    return (
        <>
            {(user_id || demoMode)
                ? <div className='flex flex-col md:flex-row h-screen md:overflow-hidden'>
                    <div className='w-full flex-none md:w-64' >
                        <SideNav demoMode={demoMode} />
                    </div>
                    <div className='flex-grow p-6 overflow-y-auto md:p-12'>
                        {children}
                    </div>
                </div>
                : <>
                    {children}
                </>
            }
        </>
    )
}