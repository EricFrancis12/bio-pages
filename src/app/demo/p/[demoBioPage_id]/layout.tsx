import type { Metadata } from 'next';
import { BioPageLayout } from '@/app/p/layout';

export const metadata: Metadata = {
    title: ' ',
};

export default function Layout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <BioPageLayout>
            {children}
        </BioPageLayout>
    );
};