'use client';

import { useRef, useEffect } from 'react';
import { motion, useAnimationControls, useInView } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition, faChartBar, faChartLine, faUserGroup, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import TiltCard from '../../TiltCard';

export default function AnalyzeYourAudienceSection() {
    const inViewRef = useRef<HTMLDivElement | null>(null);

    const inView = useInView(inViewRef);
    const controller = useAnimationControls();

    useEffect(() => {
        if (inView) {
            setTimeout(() => controller.start('animate'), 500);
        }
    }, [inView]);

    return (
        <div
            className='flex flex-col-reverse lg:flex-row justify-start lg:justify-center items-center lg:items-start gap-8 sm:px-16 pt-16 pb-32'
        >
            <motion.div
                className='flex flex-col justify-center items-center gap-4 lg:gap-2 lg:min-h-[500px] w-full lg:w-[50%] px-4 py-16'
                variants={{
                    initial: {
                        opacity: 0,
                        y: '20%'
                    },
                    animate: {
                        opacity: 1,
                        y: 0
                    }
                }}
                initial='initial'
                animate={controller}
            >
                <div className='flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 w-full sm:mb-[5%]'>
                    <LargeWidget
                        icon={faUserGroup}
                        text='267'
                        subText='Subscribers'
                        className='bg-red-500'
                    />
                    <SmallWidget
                        icon={faDollarSign}
                        text='$2,783'
                        subText='Sales'
                        className='bg-green-500'
                    />
                </div>
                <div className='flex flex-col sm:flex-row justify-center sm:justify-around items-center gap-4 w-full sm:mb-[5%]'>
                    <SmallWidget
                        icon={faChartBar}
                        text='37'
                        subText='Clicks'
                        className='bg-orange-500'
                    />
                    <LargeWidget
                        icon={faChartLine}
                        text='45%'
                        subText='CTR'
                        className='bg-teal-500'
                    />
                </div>
            </motion.div>
            <div ref={inViewRef} className='w-full lg:w-[50%] px-8'>
                <h2 className='text-6xl font-bold leading-tight'>
                    <GradientSpan>Analyze</GradientSpan> your audience and keep your followers <GradientSpan>Engaged</GradientSpan>
                </h2>
                <p className='text-2xl text-[#a1a1a6] mt-8'>
                    Track engagement patterns, monitor revenue, and understand the elements driving audience conversion. Make real-time adjustments to ensure continuous interest.
                </p>
            </div>
        </div >
    )
}

const GradientSpan = ({ children }: {
    children?: React.ReactNode
}) => (
    <span
        style={{
            backgroundImage: 'linear-gradient(to right top, #a2facf, #64acff)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        }}
    >
        {children}
    </span>
);

const SmallWidget = ({ icon, text, subText, className }: {
    icon: IconDefinition,
    text: string,
    subText: string,
    className?: string
}) => (
    <TiltCard
        className={(className) + ' flex flex-row sm:flex-col justify-around sm:justify-center items-center gap-1 w-[70%] sm:w-[30%] h-[160px] rounded-2xl'}
        backgroundColor='rgb(100, 116, 139)'
    >
        <p className='text-6xl sm:text-4xl'>
            <FontAwesomeIcon icon={icon} />
        </p>
        <div className='flex flex-col justify-around items-center gap-1'>
            <p className='text-center text-3xl'>
                {text}
            </p>
            <p className='text-center text-xl'>
                {subText}
            </p>
        </div>
    </TiltCard>
);

const LargeWidget = ({ icon, text, subText, className }: {
    icon: IconDefinition,
    text: string,
    subText: string,
    className?: string
}) => (
    <TiltCard
        className={(className) + ' flex flex-row sm:flex-col md:flex-row justify-around sm:justify-center md:justify-around items-center gap-1 w-[70%] sm:w-[30%] md:w-[60%] h-[160px] rounded-2xl'}
        backgroundColor='rgb(100, 116, 139)'
    >
        <p className='text-6xl sm:text-4xl md:text-7xl lg:text-6xl'>
            <FontAwesomeIcon icon={icon} />
        </p>
        <div className='flex flex-col justify-around items-center gap-1'>
            <p className='text-center text-3xl md:text-4xl'>
                {text}
            </p>
            <p className='text-center text-xl md:text-2xl'>
                {subText}
            </p>
        </div>
    </TiltCard>
);