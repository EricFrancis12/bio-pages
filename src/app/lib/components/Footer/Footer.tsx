import Link from 'next/link';
import React from 'react';

type Col = {
    title: string,
    data: ColData[],
};

type ColData = {
    text: string,
    href: string,
};

export default function Footer() {
    const cols: Col[] = [
        {
            title: 'Quick Links',
            data: [
                {
                    text: 'Home',
                    href: '/',
                },
                {
                    text: 'Dashboard',
                    href: '/dashboard',
                },
                {
                    text: 'Demo Dashboard',
                    href: '/demo/dashboard',
                },
            ],
        },
        {
            title: 'Account',
            data: [
                {
                    text: 'Login',
                    href: '/login',
                },
                {
                    text: 'Register',
                    href: '/register',
                },
                {
                    text: 'Reset Password',
                    href: '/reset-password',
                },
            ],
        },
    ];

    return (
        <div className='flex flex-wrap justify-around items-start gap-16 w-full px-8 sm:px-16 py-8 text-white bg-black '>
            {cols.map((col, index) => (
                <div key={index} className='flex flex-col justify-start items-center sm:items-start gap-8'>
                    <div className='text-lg font-bold'>
                        {col.title}
                    </div>
                    {col.data.map((dataItem, _index) => (
                        <div key={_index} className='text-sm'>
                            <Link href={dataItem.href}>
                                {dataItem.text}
                            </Link>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}
