'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, CSSProperties, RefObject } from 'react';
import { MotionValue, motion, useAnimation } from 'framer-motion';
import type { BioPage, color } from '@/app/lib/types';
import { demoBioPages } from '@/app/lib/demo-pages';
import useParallaxScroll from '@/app/lib/hooks/useParallaxScroll';
import useInViewCallback from '@/app/lib/hooks/useInViewCallback';
import { randomIntBetween, randomDecBetween, randomItemFromArray } from '@/app/lib/utils/utils';

export default function ExpandYourReachSection() {
    const container = useRef<HTMLDivElement | null>(null);
    const { sm, md, lg } = useParallaxScroll(container);

    const controls = useAnimation();

    const [featured, setFeatured] = useState<{ text: string, color: color }>({ text: 'Centralized', color: 'linear-gradient(to right, red, rgba(148, 5, 213, 0.778))' });

    const ref0 = useRef<HTMLDivElement>(null);
    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);

    useInViewCallback(ref0, () => {
        if (featured.text === 'Accessible.' || featured.text === 'Professional.' || featured.text === 'Brandable.') return;
        animateOnInView({ text: 'Accessible.', color: 'linear-gradient(to right, #4CAF50, #FFC107)' });
    });
    useInViewCallback(ref1, () => {
        if (featured.text === 'Professional.' || featured.text === 'Brandable.') return;
        animateOnInView({ text: 'Professional.', color: 'linear-gradient(to right, #3498db, #e74c3c)' });
    });
    useInViewCallback(ref2, () => {
        if (featured.text === 'Brandable.') return;
        animateOnInView({ text: 'Brandable.', color: 'linear-gradient(to right, #8e44ad, #f39c12)' });
    });

    function animateOnInView({ text, color }: {
        text: string,
        color: color
    }) {
        controls.set('initial');
        controls.start('animate');
        setFeatured({ text, color });
    }

    const dummyDivsList = [
        { top: '4%', bottom: 'auto', left: 'auto', right: '8%' },
        { top: '7%', bottom: 'auto', left: 'auto', right: '21%' },
        { top: '13%', bottom: 'auto', left: '7.5%', right: 'auto' },
        { top: '15%', bottom: 'auto', left: '26%', right: 'auto' },
        { top: '30%', bottom: 'auto', left: 'auto', right: '8%' },
        { top: '41%', bottom: 'auto', left: 'auto', right: '30%' },
        { top: 'auto', bottom: '14%', left: 'auto', right: '15%' },
        { top: 'auto', bottom: '10%', left: '30%', right: 'auto' },
        { top: 'auto', bottom: '5%', left: '16.5%', right: 'auto' },
        { top: 'auto', bottom: '2%', left: '-2%', right: 'auto' },
        { top: '20%', bottom: 'auto', left: 'auto', right: '10%' },
        { top: '35%', bottom: 'auto', left: '15%', right: 'auto' },
        { top: 'auto', bottom: '20%', left: '25%', right: 'auto' },
        { top: 'auto', bottom: '15%', left: 'auto', right: '5%' },
        { top: '10%', bottom: 'auto', left: 'auto', right: '5%' },
        { top: '25%', bottom: 'auto', left: 'auto', right: '25%' },
        { top: 'auto', bottom: '8%', left: '12%', right: 'auto' },
        { top: '5%', bottom: 'auto', left: 'auto', right: '18%' },
        { top: 'auto', bottom: 'auto', left: '8%', right: 'auto' },
        { top: '33%', bottom: 'auto', left: 'auto', right: '12%' }
    ];

    type DemoBioPage = {
        bioPage: BioPage,
        scale: number,
        top: number,
        left: number,
        parallax?: MotionValue<number>
    };

    const selectedDemoBioPages = useRef<DemoBioPage[]>(
        demoBioPages.slice(0, 20)
            .map((bioPage) => ({
                bioPage,
                scale: randomDecBetween(0.75, 1.5),
                top: randomIntBetween(5, 95),
                left: randomIntBetween(5, 95),
                parallax: randomItemFromArray([sm, md, lg])
            }))
    ); // compiling a list of demoBioPages

    const BioPageGraphic = ({ demoBioPage, scale = 1, className = '', top = 0, left = 0, parallax }: {
        demoBioPage: BioPage | undefined,
        scale?: number,
        className?: string,
        top?: number,
        left?: number,
        parallax?: MotionValue<number>
    }) => {
        return !demoBioPage
            ? ''
            : (
                <motion.div
                    className='absolute bg-white z-20 hover:z-40'
                    style={{
                        y: parallax,
                        top: `${top}%`,
                        left: `${left}%`,
                        height: `${scale * 220}px`,
                        width: `${scale * 145}px`,
                        borderRadius: '5px'
                    }}>
                    <Link href={`/demo/p/${demoBioPage._id}`} target='_blank'>
                        <Image
                            src={`/assets/img/demo-bio-pages/${demoBioPage._id}.png`}
                            alt='Demo Page'
                            loading='lazy'
                            fill={true}
                            className={className + ' opacity-30 hover:opacity-100 hover:scale-110'}
                            style={{
                                border: 'solid 1px black',
                                borderRadius: '5px',
                                transition: 'ease-in-out 0.3s opacity',
                                WebkitTransition: '-webkit-transform 0.3s ease-out',
                            }}
                        />
                    </Link>
                </motion.div>
            )
    };

    const DummyDiv = ({ style }: {
        style: CSSProperties
    }) => {
        return (
            <div
                className='absolute h-[99px] w-[132px] bg-[#f4f5f8]'
                style={{
                    borderRadius: '4px',
                    zIndex: 10,
                    ...style
                }}
            />
        )
    };

    return (
        <div ref={container}
            className='relative h-[1600px] px-4 pt-32 bg-[#fdfdfd]'
            style={{
                contain: 'paint'
            }}
        >
            <div ref={ref0} className='absolute top-[40%] left-0' />
            <div ref={ref1} className='absolute top-[60%] left-0' />
            <div ref={ref2} className='absolute top-[80%] left-0' />
            <div
                className='sticky top-32 left-0'
                style={{
                    pointerEvents: 'none',
                    zIndex: 50
                }}
            >
                <div
                    className='relative h-screen'
                    style={{
                        pointerEvents: 'none'
                    }}
                >
                    <div
                        className='top-0 left-0 right-0 flex flex-col justify-center items-center gap-6 max-w-[500px] mx-auto px-4 py-6 text-[#000] bg-slate-200'
                        style={{
                            borderRadius: '15px'
                        }}
                    >
                        <div
                            className='text-center text-3xl text-[#000] font-bold'
                        >
                            Everything you need to expand your reach.
                        </div>
                        <div className='flex flex-row-reverse justify-end text-4xl'>
                            <div className='overflow-hidden'>
                                <motion.div
                                    className='text-4xl sm:text-6xl font-bold'
                                    style={{
                                        backgroundImage: featured.color,
                                        backgroundClip: 'text',
                                        color: 'transparent',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                    variants={{
                                        initial: { opacity: 0, y: 75 },
                                        animate: { opacity: 1, y: 0 }
                                    }}
                                    initial='animate'
                                    animate={controls}
                                    transition={{ duration: 0.5 }}
                                >
                                    {featured.text}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {selectedDemoBioPages.current.map((bioPageGraphic, index) => (
                <BioPageGraphic key={index}
                    demoBioPage={bioPageGraphic.bioPage}
                    scale={bioPageGraphic.scale}
                    top={bioPageGraphic.top}
                    left={bioPageGraphic.left}
                    parallax={bioPageGraphic.parallax}
                />
            ))}
            {dummyDivsList.map((dummyDiv, index) => (
                <DummyDiv key={index}
                    style={{
                        top: dummyDiv.top,
                        bottom: dummyDiv.bottom,
                        left: dummyDiv.left,
                        right: dummyDiv.right
                    }}
                />
            ))}
        </div >
    )
}
