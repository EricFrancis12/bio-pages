'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import type { TBioPage } from '@/app/lib/types';
import { demoBioPages } from '@/app/lib/demo-pages';

const SCROLL_BUTTON_Z_INDEX = 4000;

type TScrollButton = {
    left?: number,
    right?: number,
    icon: IconDefinition,
    onClick: React.MouseEventHandler<HTMLElement>,
};

export default function SetupSection() {
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const selectedDemoBioPages = useRef(demoBioPages.slice(0, 20));

    const scrollButtons = [
        {
            left: 0,
            icon: faArrowLeft,
            onClick: () => {
                if (scrollRef.current?.scrollLeft) {
                    scrollRef.current.scrollLeft -= 500;
                }
            },
        },
        {
            right: 0,
            icon: faArrowRight,
            onClick: () => {
                if (scrollRef.current?.scrollLeft || scrollRef.current?.scrollLeft === 0) {
                    scrollRef.current.scrollLeft += 500;
                }
            },
        },
    ];

    const blurs = [
        { bg: 'bg-purple-500' },
        { bg: 'bg-teal-500' },
    ];

    return (
        <div className='relative bg-[#fff] py-12 overflow-hidden'>
            <div className='px-4 sm:px-16 mb-4'>
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
                        borderRadius: '20px',
                    }}
                >
                    <div
                        className='relative px-8 py-2 scale-75 bg-white'
                        style={{
                            border: 'solid 1px #7433ff',
                            borderRadius: '6px',
                        }}
                    >
                        <div className='bg-white text-center text-black text-m font-bold'>SEE OUR PAGES BELOW!</div>
                    </div>
                </div>
            </div>
            <div className='relative select-none'>
                <div ref={scrollRef}
                    className='flex justify-start items-center gap-8 px-4 py-4 overflow-x-scroll scroll-smooth'
                >
                    {scrollButtons.map((scrollButton, index) => (
                        <ScrollButton key={index} scrollButton={scrollButton} />
                    ))}
                    {selectedDemoBioPages.current.map((demoBioPage, index) => (
                        <Card key={index} demoBioPage={demoBioPage} />
                    ))}
                </div>
            </div>
            <div className='flex justify-between items-center gap-4 w-full'>
                {blurs.map((blur, index) => (
                    <div key={index}
                        className={(blur.bg) + ' w-[50%] h-[100px] blur-3xl opacity-60'}
                    />
                ))}
            </div>
        </div>
    )
}

const Card = ({ demoBioPage }: {
    demoBioPage: TBioPage,
}) => {
    const src = `/assets/img/demo-bio-pages/${demoBioPage._id}.png`;
    const href = `/demo/p/${demoBioPage._id}`;

    return (
        <div
            style={{
                boxShadow: '3px 3px 24px 4px rgba(0, 0, 0, 0.2)'
            }}
        >
            <div className='relative block h-[350px] w-[260px]'>
                <Image
                    src={src}
                    alt='Page Demo Image'
                    loading='lazy'
                    fill={true}
                    style={{ borderRadius: '5px' }}
                />
                <Link
                    href={href}
                    target='_blank'
                    className='absolute top-0 left-0 h-full w-full px-2 text-center opacity-0 hover:opacity-100 bg-yellow-500 rounded'
                >
                    <div className='my-4'>
                        {demoBioPage.headingtext}
                    </div>
                    <div>
                        {demoBioPage.subheadingtext}
                    </div>
                </Link>
            </div>
        </div>
    )
};

const ScrollButton = ({ scrollButton }: {
    scrollButton: TScrollButton,
}) => (
    <div
        className='absolute flex justify-center items-center h-full px-12'
        style={{
            top: 0,
            left: scrollButton.left,
            right: scrollButton.right,
            pointerEvents: 'none',
            zIndex: SCROLL_BUTTON_Z_INDEX,
        }}
    >
        <div
            className='flex justify-center items-center h-[50px] hover:h-[70px] w-[50px] hover:w-[70px] p-2 text-3xl bg-red-300 hover:bg-red-500 rounded-full cursor-pointer'
            style={{
                pointerEvents: 'all',
                transition: 'background-color 0.1s ease-in-out, height 0.1s ease-in-out, width 0.1s ease-in-out'
            }}
            onClick={scrollButton.onClick}
        >
            <FontAwesomeIcon icon={scrollButton.icon} />
        </div>
    </div>
)
