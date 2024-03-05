'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavTab({ text, href }: {
    text: string,
    href: string
}) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <div className='group relative py-1 px-2'>
            <Link href={href}>
                {text}
            </Link>
            <div
                className={(active ? 'bg-yellow-400' : 'bg-transparent') + ' h-[2px] w-full group-hover:bg-yellow-400'}
                style={{
                    transition: 'ease-in-out 0.3s background-color'
                }}
            />
        </div>
    )
}
