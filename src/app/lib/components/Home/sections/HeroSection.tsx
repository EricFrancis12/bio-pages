'use client';

import { motion } from 'framer-motion'
import BioPage from '../../BioPage';
import CTAButons from '../CTAButons';
import TiltCard from '../../TiltCard';
import { demoBioPage_5 } from '@/app/lib/demo-pages';

export default function HeroSection() {
    return (
        <div className='flex flex-col justify-center items-center pt-36'>
            <div
                className='flex flex-col justify-start items-center h-full w-full'
                style={{
                    backgroundImage: 'linear-gradient(to bottom, #000000, #222222)'
                }}
            >
                <div className='flex flex-col lg:flex-row max-w-[1000px] mb-16'>
                    <motion.div
                        className='flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 lg:w-[50%] px-12'
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
                        animate='animate'
                    >
                        <h1 className='max-w-[100vw] px-4 sm:px-0 text-center lg:text-left text-5xl sm:text-7xl lg:text-10xl break-words'>
                            One{' '}
                            <span
                                style={{
                                    backgroundImage: 'linear-gradient(to right, #ff1e64, #f48a39 26%, #8c25e5 70%, #106cbd)',
                                    backgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                    border: 'solix 0px #8c25e5'
                                }}
                            >
                                Bio Link
                            </span>,
                            <br />Countless Connections
                        </h1>
                        <div
                            className='text-center lg:text-left text-m text-gray-300 bg-black px-4 py-1'
                            style={{
                                borderRadius: '4px'
                            }}
                        >
                            Streamline your digital footprint with a single link in bio that encapsulates it all.
                        </div>
                        <div className='flex flex-col-reverse sm:flex-row lg:flex-col-reverse justify-center items-center gap-4 w-full mt-4 sm:mb-16'>
                            <CTAButons />
                        </div>
                    </motion.div>
                    <motion.div
                        className='flex justify-center items-center lg:w-[50%] px-4 sm:px-0'
                        variants={{
                            initial: {
                                opacity: 0,
                                x: '-20%'
                            },
                            animate: {
                                opacity: 1,
                                x: 0
                            }
                        }}
                        initial='initial'
                        animate='animate'
                    >
                        <div
                            className='hidden lg:block'
                            style={{ transform: 'rotateX(20deg) rotateY(30deg)' }}
                        >
                            <BioPageHeroImage orientation='slanted' />
                        </div>
                        <div className='lg:hidden scale-[0.7] sm:scale-[1]'>
                            <BioPageHeroImage orientation='flat' />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

const BioPageHeroImage = ({ orientation }: {
    orientation: 'flat' | 'slanted'
}) => (
    <TiltCard
        className='rounded'
        backgroundColor='#ffffff15'
        xInputRange={orientation === 'slanted' ? [-2, 0.5] : null}
        yInputRange={orientation === 'slanted' ? [0, 0.5] : null}
        disabled={orientation === 'flat'}
    >
        <div className='bg-red-500 rounded p-1 rounded scale-[0.9]'>
            <BioPage
                bioPage={{
                    ...demoBioPage_5,
                    buttons: demoBioPage_5.buttons.slice(0, 3) // Only taking the first 3 buttons to save space
                }}
                disableLinks={true}
                fullScreen={false}
                imageHeight={100}
                imageWidth={100}
            />
        </div>
    </TiltCard>
);
