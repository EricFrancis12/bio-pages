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

    const navTabs = [
        {
            text: 'Home',
            href: '/'
        },
        {
            text: 'Documentation',
            href: '/documentation'
        },
        {
            text: 'Pricing',
            href: '/pricing'
        },
        {
            text: 'Resources',
            href: '/resources'
        }
    ];

    return (
        <motion.div className='fixed w-full'
            style={{
                zIndex: 500
            }}
            variants={{
                visible: { y: 0 },
                hidden: { y: '-100%' }
            }}
            animate={hidden ? 'hidden' : 'visible'}
            transition={{ duration: 0.35, ease: 'easeInOut' }}
        >
            <BlackTransparentOverlay
                disabled={!extended}
            >
                <nav
                    className='flex justify-between items-center mx-6 lg:mx-8 my-4 px-4 sm:px-8 py-6 bg-[#141414]'
                    style={{
                        borderRadius: '8px'
                    }}
                >
                    <div>
                        <Link href='/'>
                            <Image
                                src='/assets/img/logo.webp'
                                alt='logo'
                                height={50}
                                width={50}
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
                        className='flex lg:hidden justify-center items-center h-[50px] w-[50px] text-3xl bg-gray-500 hover:bg-gray-400 cursor-pointer'
                        style={{
                            borderRadius: '25px'
                        }}
                        onClick={e => setExtended(prevExtended => !prevExtended)}
                    >
                        <FontAwesomeIcon icon={extended ? faX : faBars} />
                    </div>
                </nav>
                <motion.div
                    className='flex lg:hidden flex-col justify-start items-center gap-4 mx-6 lg:mx-8 mt-4 px-4 py-6 bg-[#141414] overflow-hidden'
                    style={{
                        maxHeight: extended ? '400px' : 0, // solution for this motion.div blocking click events on the page
                        borderRadius: '8px',
                        transition: 'ease-in-out 0.4s max-height'
                    }}
                    variants={{
                        extended: { x: 0, opacity: 1, pointerEvents: undefined },
                        notExtended: { x: '-110%', opacity: 0, pointerEvents: 'none' }
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
