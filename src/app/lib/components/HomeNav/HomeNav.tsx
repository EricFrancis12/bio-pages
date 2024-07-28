'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import NavTab from './NavTab';
import NavButton from './NavButton';
import BlackTransparentOverlay from '../BlackTransparentOverlay';

const HOME_NAV_Z_INDEX = 500;

const navTabs: {
    text: string,
    href: string,
}[] = [
        // Starter code for nav tab links:

        // {
        //     text: 'Home',
        //     href: '/'
        // },
        // {
        //     text: 'Documentation',
        //     href: '/documentation'
        // },
        // {
        //     text: 'Pricing',
        //     href: '/pricing'
        // },
        // {
        //     text: 'Resources',
        //     href: '/resources'
        // }
    ];

export default function HomeNav() {
    const [hidden, setHidden] = useState<boolean>(false);
    const [extended, setExtended] = useState<boolean>(false);

    useEffect(() => {
        if (extended) {
            setExtended(false);
        }
    }, [hidden]);

    const { scrollY } = useScroll();
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious();
        if (latest > previous && latest > 150) {
            setHidden(true);
        } else {
            setHidden(false);
        }
    });

    return (
        <motion.div className='fixed w-full'
            style={{ zIndex: HOME_NAV_Z_INDEX }}
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' },
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
            <BlackTransparentOverlay disabled={!extended}>
                <nav
                    className='flex justify-between items-center mx-6 lg:mx-8 my-4 px-4 sm:px-8 py-2 sm:py-4 bg-[#141414]'
                    style={{ borderRadius: '8px' }}
                >
                    <div>
                        <Link href='/'>
                            <Image
                                src='/assets/img/frog-logo-white-outline.png'
                                alt='logo'
                                height={60}
                                width={60}
                            />
                        </Link>
                    </div>
                    <div className='hidden lg:flex justify-end items-center gap-6'>
                        {navTabs.map((navTab, index) => (
                            <NavTab key={index}
                                text={navTab.text}
                                href={navTab.href}
                            />
                        ))}
                        <div className='flex justify-center items-center gap-4'>
                            <NavButton
                                text='Register'
                                href='/register'
                            />
                            <NavButton
                                text='Login'
                                href='/login'
                            />
                        </div>
                    </div>
                    <div
                        className='flex lg:hidden justify-center items-center h-[35px] sm:h-[45px] w-[35px] sm:w-[45px] text-xl sm:text-2xl bg-gray-500 hover:bg-gray-400 cursor-pointer'
                        style={{ borderRadius: '25px' }}
                        onClick={() => setExtended(prevExtended => !prevExtended)}
                    >
                        <FontAwesomeIcon icon={extended ? faX : faBars} />
                    </div>
                </nav>
                <motion.div
                    className='flex lg:hidden flex-col justify-start items-center gap-4 mx-6 lg:mx-8 mt-4 px-4 py-6 bg-[#141414] overflow-hidden'
                    style={{
                        maxHeight: extended ? '400px' : 0, // solution for this motion.div blocking click events on the page
                        borderRadius: '8px',
                        transition: 'ease-in-out 0.4s max-height',
                    }}
                    variants={{
                        extended: { x: 0, opacity: 1, pointerEvents: 'all' },
                        notExtended: { x: '-110%', opacity: 0, pointerEvents: 'none' },
                    }}
                    animate={extended ? 'extended' : 'notExtended'}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    initial={false}
                >
                    {navTabs.map((navTab, index) => (
                        <NavTab key={index}
                            text={navTab.text}
                            href={navTab.href}
                        />
                    ))}
                    <div className='flex justify-center items-center gap-4'>
                        <NavButton
                            text='Register'
                            href='/register'
                        />
                        <NavButton
                            text='Login'
                            href='/login'
                        />
                    </div>
                </motion.div>
            </BlackTransparentOverlay>
        </motion.div>
    )
}
