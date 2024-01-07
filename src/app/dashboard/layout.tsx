import type { Metadata } from 'next';

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
        <div className='min-h-[100vh] w-[100vw]'>
            {children}
        </div>
    )
}