import Link from 'next/link';
import React from 'react';

export default function Footer() {
    type Col = {
        title: string,
        data: ColData[]
    };

    type ColData = {
        text: string,
        href: string
    };

    const cols: Col[] = [
        {
            title: 'Quick Links',
            data: [
                {
                    text: 'Home',
                    href: '/'
                },
                {
                    text: 'About Us',
                    href: '/about'
                },
                {
                    text: 'Contact Us',
                    href: '/contact'
                },
                {
                    text: 'FAQs',
                    href: '/faqs'
                },
            ]
        },
        {
            title: 'Services',
            data: [
                {
                    text: 'Web Design',
                    href: '/services/web-design'
                },
                {
                    text: 'Graphic Design',
                    href: '/services/graphic-design'
                },
                {
                    text: 'Digital Marketing',
                    href: '/services/digital-marketing'
                },
                {
                    text: 'SEO',
                    href: '/services/seo'
                },
            ]
        },
        {
            title: 'Connect With Us',
            data: [
                {
                    text: 'Facebook',
                    href: 'https://www.facebook.com'
                },
                {
                    text: 'Twitter',
                    href: 'https://twitter.com'
                },
                {
                    text: 'LinkedIn',
                    href: 'https://www.linkedin.com/company'
                },
                {
                    text: 'Instagram',
                    href: 'https://www.instagram.com'
                },
            ]
        }
    ];

    return (
        <div className='flex flex-wrap justify-between items-start gap-16 w-full px-8 sm:px-16 py-8 text-white bg-black '>
            {cols.map((col, index) => (
                <div key={index}
                    className='flex flex-col justify-start items-start gap-8'
                >
                    <div className='text-lg font-bold'>
                        {col.title}
                    </div>
                    {col.data.map((dataItem, _index) => (
                        <div key={_index}
                            className='text-sm'
                        >
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
