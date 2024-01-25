import type { Metadata } from 'next';
import { DashboardLayout } from '@/app/dashboard/layout';

export const metadata: Metadata = {
    title: 'Demo App Dashboard'
};

export default function Layout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <DashboardLayout demoMode={true}>
            {children}
        </DashboardLayout>
    );
};