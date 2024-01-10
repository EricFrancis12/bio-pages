import type { Metadata } from 'next';
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

export function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='flex flex-col md:flex-row h-screen md:overflow-hidden'>
            <div className='w-full flex-none md:w-64'>
                <SideNav />
            </div>
            <div className='flex-grow p-6 md:overflow-y-auto md:p-12'>
                {children}
            </div>
        </div>
    )
}