'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faDollarSign, faFolderPlus, faDatabase, faHammer } from '@fortawesome/free-solid-svg-icons';
import CTAButons from '../CTAButons';

type T_Card = {
    side: 'left' | 'right',
    title: string,
    text: string,
    icon?: IconDefinition,
};

export default function WhatMakesUsDifferentSection() {
    const cards: T_Card[] = [
        {
            side: 'right',
            title: 'Free Forever',
            text: "Our app will always have a generous free plan available to all users. Stay a free user forever, or upgrade for more powerful analytics and features. It's totally up to you.",
            icon: faDollarSign,
        }, {
            side: 'left',
            title: 'Multiple Pages',
            text: 'Have more than one brand that you need a link-in-bio for? No problem! All users have the ability to create multiple pages under the same account.',
            icon: faFolderPlus,
        }, {
            side: 'right',
            title: 'Your Data Will Never Be Sold',
            text: "We believe privacy is extremely important in today's day in age. Your account data is encrypted and stored securely in accordance with industry best practices. We will never sell or abuse your data in any way.",
            icon: faDatabase,
        }, {
            side: 'left',
            title: 'No Unfair Bans',
            text: "We believe you should have the power to share your brand message in any way you want. You wont face any censorship, shadowbans, or other similar actions on our platform.",
            icon: faHammer,
        },
    ];

    return (
        <div
            className='flex flex-col justify-start items-center gap-2 w-full pt-16 pb-32'
            style={{ backgroundImage: 'linear-gradient(to right, #9370DB, lightblue)' }}
        >
            <h2 className='m-2 pb-16 text-center text-5xl text-black'>
                Why Choose Us?
            </h2>
            <div className='w-full max-w-[1000px] mb-16'>
                <Divider />
                {cards.map((card, index) => (
                    <React.Fragment key={index}>
                        <Card key={index}
                            side={card.side}
                            title={card.title}
                            text={card.text}
                            icon={card.icon}
                        />
                    </React.Fragment>
                ))}
            </div>
            <CTAButtonsContainer />
        </div>
    )
}

const Card = ({ side, title, text, icon }: T_Card) => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', '1.33 1'],
    });
    const scaleProgress = useTransform(scrollYProgress, [-1.5, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [-1.5, 1], [0.8, 1]);

    return (
        <motion.div ref={ref}
            className='flex justify-center items-center w-full my-8'
            style={{
                scale: scaleProgress,
                opacity: opacityProgress,
            }}
        >
            <div
                className={(side === 'left' ? 'sm:justify-start' : 'sm:justify-end')
                    + ' justify-center flex items-center w-[80%]'}
            >
                <div
                    className='max-w-[300px] px-3 py-2 text-black bg-white rounded-lg'
                    style={{ border: 'solid gray 2px' }}
                >
                    <div className='flex justify-start items-center gap-3 mb-2'>
                        <span className='text-2xl'>
                            {icon && <FontAwesomeIcon icon={icon} />}
                        </span>
                        <span className='text-2xl font-bold'>
                            {title}
                        </span>
                    </div>
                    <div>
                        {text}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const CTAButtonsContainer = () => {
    const ref = useRef<HTMLDivElement | null>(null);

    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['0 1', '1.33 1'],
    });
    const scaleProgress = useTransform(scrollYProgress, [-1.5, 1], [0.8, 1]);
    const opacityProgress = useTransform(scrollYProgress, [-1.5, 1], [0.8, 1]);

    return (
        <motion.div ref={ref}
            className='flex flex-col sm:flex-row justify-center items-center gap-6'
            style={{
                scale: scaleProgress,
                opacity: opacityProgress
            }}
        >
            <CTAButons />
        </motion.div>
    )
};

const Divider = () => (
    <div className='h-[1px] w-full bg-black' />
);
