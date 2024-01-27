'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { BioPage } from '@/app/lib/types';
import { demoBioPages } from '@/app/lib/demo-pages';

export default function SetupSection() {
    const targetRef = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef
    });
    const x = useTransform(scrollYProgress, [1, 0], ['1%', '-100%']);

    const blurs = [
        { bg: 'bg-purple-500' },
        { bg: 'bg-teal-500' }
    ];

    const selectedDemoBioPages = useRef(demoBioPages.slice(0, 20));

    return (
        <div className='relative bg-[#fff] py-12 overflow-hidden'>
            <div className='px-16 mb-4'>
                <div>
                    <h2 className='text-5xl text-black font-bold mb-8'>
                        Get Setup in less than 5 minutes
                    </h2>
                    <ul className='text-black list-disc'>
                        <li>
                            Simple, easy-to-use UI
                        </li>
                        <li>
                            Large selection of customization options
                        </li>
                        <li>
                            Located at a Short URL of your choice!
                        </li>
                    </ul>
                </div>
                <div className='inline-block mt-6 mb-4'
                    style={{
                        border: 'solid 1px #7433ff0',
                        borderRadius: '20px'
                    }}
                >
                    <div
                        className='relative px-8 py-2 scale-75 bg-white'
                        style={{
                            border: 'solid 1px #7433ff',
                            borderRadius: '6px'
                        }}
                    >
                        <div className='bg-white text-black text-m font-bold'>SEE OUR PAGES BELOW!</div>
                    </div>
                </div>
            </div>
            <div ref={targetRef}>
                <motion.div
                    className='flex justify-start items-center gap-8 px-8 py-4 overflow-visible'
                    style={{ x }}
                >
                    {selectedDemoBioPages.current.map((demoBioPage, index) => (
                        <Card key={index}
                            demoBioPage={demoBioPage}
                        />
                    ))}
                </motion.div>
                <div
                    className='div-block-40'
                    style={{
                        pointerEvents: 'none'
                    }}
                >
                    {blurs.map((blur, index) => (
                        <div key={index}
                            className={(blur.bg) + ' w-[50vw] h-[100px] blur-3xl opacity-60'}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

const Card = ({ demoBioPage }: {
    demoBioPage: BioPage
}) => {
    const src = `/assets/img/demo-bio-pages/${demoBioPage._id}.png`;
    const href = `/demo/p/${demoBioPage._id}`;

    return (
        <div
            style={{
                boxShadow: '3px 3px 24px 4px rgba(0, 0, 0, 0.2)'
            }}
        >
            <Link
                href={href}
                target='_blank'
                className='relative block h-[350px] w-[260px]'
            >
                <Image
                    src={src}
                    alt='Page Demo Image'
                    loading='lazy'
                    fill={true}
                    style={{
                        borderRadius: '5px'
                    }}
                />
                <div className='absolute text-center h-full w-full px-2 opacity-0 hover:opacity-100 bg-yellow-500'>
                    <div className='my-4'>
                        {demoBioPage.headingtext}
                    </div>
                    <div>
                        {demoBioPage.subheadingtext}
                    </div>
                </div>
            </Link>
        </div>
    )
};
