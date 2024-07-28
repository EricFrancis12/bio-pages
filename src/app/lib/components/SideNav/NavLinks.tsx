'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faFolder } from '@fortawesome/free-solid-svg-icons';

export default function NavLinks({ demoMode }: {
    demoMode?: boolean,
}) {
    const pathname = usePathname();

    const links = [
        {
            name: 'Home',
            href: demoMode === true ? '/demo/dashboard' : '/dashboard',
            icon: faHome,
        },
        {
            name: 'Pages',
            href: demoMode === true ? '/demo/dashboard/bio-pages' : '/dashboard/bio-pages',
            icon: faFolder,
        },
    ];

    return (
        <>
            {links.map((link) => (
                <Link
                    key={link.name}
                    href={link.href}
                    className={(pathname === link.href ? 'bg-sky-100 text-blue-600' : '')
                        + ' flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3'}
                >
                    <FontAwesomeIcon icon={link.icon} />
                    <p className='hidden md:block'>{link.name}</p>
                </Link>
            ))}
        </>
    )
}
