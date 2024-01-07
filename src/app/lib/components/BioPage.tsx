'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import type { BioPage, Button, buttonStyleType, buttonStyleRadius } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { deconstructButtonStyle } from '../utils';
import { defaultImagesrc } from '../default-data';

export const metadata: Metadata = {
    title: 'Your very own Bio Page!'
};

export default function BioPage(props: {
    bioPage: BioPage,
    setBioPage?: Function,
    blobUrl?: string
}) {
    const { bioPage, setBioPage, blobUrl } = props;
    const {
        _id,
        user_id,
        font,
        textcolor,
        backgroundcolor,
        imagesrc,
        headingtext,
        subheadingtext,
        buttonstyle,
        buttoncolor,
        buttontextcolor,
        buttonbordercolor,
        buttons,
        clicks
    } = bioPage;

    const { buttonstyleType, buttonstyleRadius } = deconstructButtonStyle(buttonstyle); // impliment this later

    return (
        <div className='min-h-[100vh] w-full'
            style={{ backgroundColor: backgroundcolor }}
        >
            <div className='flex flex-col justify-start items-center gap-4'
                style={{ fontFamily: font ?? 'sans-serif' }}>
                <header
                    className='flex flex-col justify-start items-center gap-4 mt-6 mb-4'
                    style={{ color: textcolor }}
                >
                    <Image
                        src={blobUrl || (imagesrc ? imagesrc as string : defaultImagesrc)}
                        alt='Page Image'
                        height={200}
                        width={200}
                    />
                    <h1>{headingtext}</h1>
                    <p>{subheadingtext}</p>
                    {/* Starter code for how to impliment line breaks the user may have typed: */}
                    {/* <p dangerouslySetInnerHTML={{ __html: subheadingtext.split('\n').join('<br>') }}></p> */}
                </header>
                <main className='flex flex-col justify-start items-center gap-6'>
                    {buttons.map((button, index) => {
                        const icon = icons[button.icon as keyof typeof icons];
                        return button.disabled
                            ? ''
                            : (
                                <div key={index}
                                    style={{
                                        border: `1px solid ${buttonbordercolor}`,
                                        backgroundColor: buttoncolor,
                                        color: buttontextcolor,
                                        borderRadius: `${buttonstyleRadius}px`
                                    }}
                                >
                                    <a href={button.url} target='_blank'
                                        className='flex justify-between items-center mx-0 my-auto px-3 py-2 w-[420px] max-w-[100%] cursor-pointer overflow-hidden opacity-100 hover:opacity-70'
                                        style={{
                                            backgroundColor: 'transparent',
                                            transitionDuration: '200ms'
                                        }}
                                    >
                                        <p>
                                            {button.text}
                                        </p>
                                        <FontAwesomeIcon icon={icon as IconDefinition} />
                                    </a>
                                </div>
                            );
                    })}
                </main>
            </div>
        </div>
    )
}
