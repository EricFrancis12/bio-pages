'use client';

import Image from 'next/image';
import { motion } from 'framer-motion'
import CTAButons from '../CTAButons';

export default function HeroSection() {
    return (
        <div className='flex flex-col justify-center items-center pt-36'>
            {/* <div
                className='flex justify-center items-center w-full py-2 bg-transparent'
                style={{
                    backgroundImage: 'radial-gradient(circle, rgba(30, 194, 255, .2), rgba(26, 169, 222, .17) 78%, rgba(0, 0, 0, 0) 93%)'
                }}
            >
                <p className='text-sm mb-0 py-2'>Learn more about our{' '}
                    <Link href='/features/multi-tenancy' target='_blank' className='font-bold text-blue-400'>
                        Multi-tenancy feature
                    </Link>
                    {' '}for your B2B app
                </p>
            </div>
            <a href='https://REPLACE.com' target='_blank' className='flex justify-center items-center my-4 px-4 py-2 text-white'
                style={{
                    backgroundImage: 'radial-gradient(circle, #333, #222)',
                    border: 'solid 1px #3f3e3e',
                    borderRadius: '6px'
                }}
            >
                <div className='text-sm'>Star Us on GitHub</div>
                <FontAwesomeIcon icon={faStar} className='text-yellow-400 ml-1' />
            </a> */}
            <div
                className='flex flex-col justify-start items-center h-full w-full'
                style={{
                    backgroundImage: 'linear-gradient(to bottom, #000000, #222222)'
                }}>
                <div className='flex flex-col lg:flex-row max-w-[1000px] mt-12 mb-16'>
                    <div className='flex flex-col justify-center lg:justify-start items-center lg:items-start gap-6 lg:w-[50%] px-12'>
                        <motion.h1
                            className='text-center lg:text-left text-7xl lg:text-10xl'
                            variants={{
                                initial: {
                                    opacity: 0,
                                    x: '20%'
                                },
                                animate: {
                                    opacity: 1,
                                    x: 0
                                }
                            }}
                            initial='initial'
                            animate='animate'
                        >
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
                        </motion.h1>
                        <motion.div
                            className='text-center lg:text-left text-m text-gray-300 bg-black px-4 py-1'
                            style={{
                                borderRadius: '4px'
                            }}
                            variants={{
                                initial: {
                                    opacity: 0
                                },
                                animate: {
                                    opacity: 1
                                }
                            }}
                            initial='initial'
                            animate='animate'
                        >
                            Streamline your digital footprint with a single link in bio that encapsulates it all.
                        </motion.div>
                        <div className='flex flex-col-reverse sm:flex-row lg:flex-col-reverse justify-center items-center gap-4 w-full mt-4 mb-16'>
                            <CTAButons />
                        </div>
                    </div>
                    <motion.div
                        className='flex justify-center items-center lg:w-[50%]'
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
                        <Image
                            height={300}
                            width={300}
                            alt='Product Example'
                            src='/assets/img/placeholder.gif'
                        />
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
