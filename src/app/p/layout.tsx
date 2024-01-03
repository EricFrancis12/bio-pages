import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Your very own Bio Page!',
    description: 'Create your very own Bio Page with our cool app...',
};

export default async function pLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className='h-[100vh] w-[100vw]'>
            {children}
        </div>
    );
}
