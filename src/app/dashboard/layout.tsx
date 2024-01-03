import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'App Dashboard'
};

export default async function pLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='min-h-[100vh] w-[100vw]'>
            {children}
        </div>
    );
}
