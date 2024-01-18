'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeInAmimationVariants = {
    initial: {
        opacity: 0,
        y: 100
    },
    animate: {
        opacity: 1,
        y: 0
    }
};

export default function LandingSection() {
    return (
        <div id='landing_section' className='landing-section'>
            <div className='lottie-animation' data-w-id='2be57457-6640-eadb-9523-efec0625655e' data-animation-type='lottie' data-src='https://supertokens.com/static/webflow/home/documents/58771-sparkle-animation.json' data-loop='1' data-direction='1' data-autoplay='1' data-is-ix2-target='0' data-renderer='svg' data-default-duration='1.4666666666666666' data-duration='0'></div>
            <div className='feature-page-banner'>
                <p className='feature-banner-text'>Learn more about our <a href='/features/multi-tenancy' id='multi-tenancy-link' target='_blank' className='feature-link'>Multi-tenancy feature</a> for your B2B app</p>
            </div>
            <a id='github-star-banner' data-w-id='b8704f04-a18c-e9a0-8715-c51dbffc6088' href='https://github.com/supertokens/supertokens-core' target='_blank' className='div-star-github-banner w-inline-block'>
                <div className='text-block-158'>Star Us on GitHub</div><img src='https://supertokens.com/static/webflow/home/images/Star-Icon-Vector.png' loading='eager' width='16' data-w-id='13406161-f66e-2f86-27cc-c984c7ab729a' alt='Star Icon' className='image-134' />
            </a>
            <div className='flex flex-col sm:flex-row div-background-image'>
                <div className='sm:w-[50%]'>
                    <h1 className='text-7xl'>
                        One <span className='landing-gradient-text'>Bio Link</span>,<br />Countless Connections
                    </h1>
                    <div className='subheading-landing'>
                        Streamline your digital footprint with a single link in bio that encapsulates it all.
                    </div>
                </div>
                <div className='flex justify-center items-center sm:w-[50%]'>
                    <Image
                        height={100}
                        width={100}
                        alt='Product Example'
                        src='/assets/img/placeholder.gif'
                    />
                </div>
            </div>
            <div className='flex justify-center items-center gap-4 w-full'>
                <Link href='/demo' target='_blank'>
                    View Demo
                </Link>
                <Link href='/dashboard'>
                    Get Started
                </Link>
            </div>
        </div>
    )
}
