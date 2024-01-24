'use client';

import { Metadata } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';
import type { BioPage, Button, buttonStyleType, buttonStyleRadius } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as icons from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-common-types';
import { fontsDictionary } from '../fonts';
import { deconstructButtonStyle, calcButtonStyleTypeShadows, isGradient } from '../utils/utils';
import { defaultImagesrc, defaultIcon } from '../default-data';

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
        name,
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

    const { buttonstyleType, buttonstyleRadius } = deconstructButtonStyle(buttonstyle);
    const fontInstance = fontsDictionary[font as keyof typeof fontsDictionary]?.instance ?? null;

    useEffect(() => {
        if (name) {
            document.title = name;
        }
    }, []);

    return (
        <div className='min-h-[100vh] w-full'
            style={{ background: backgroundcolor }}
        >
            <div
                className={(fontInstance?.className ? fontInstance.className : '')
                    + ' flex flex-col justify-start items-center gap-4'}
            >
                <header
                    className='flex flex-col justify-start items-center gap-4 max-w-[700px] mt-6 mb-4 mx-6'
                    style={{
                        color: isGradient(textcolor) ? undefined : textcolor,
                        backgroundImage: isGradient(textcolor) ? textcolor : undefined,
                        backgroundClip: isGradient(textcolor) ? 'text' : undefined,
                        WebkitTextFillColor: isGradient(textcolor) ? 'transparent' : undefined
                    }}
                >
                    <Image
                        src={blobUrl || (imagesrc ? imagesrc as string : defaultImagesrc)}
                        alt='Page Image'
                        height={200}
                        width={200}
                    />
                    <h1 className='text-center text-4xl font-bold'>
                        {headingtext}
                    </h1>
                    <p className='text-center text-2xl'>
                        {subheadingtext}
                    </p>
                    {/* Starter code for how to impliment line breaks the user may have typed: */}
                    {/* <p dangerouslySetInnerHTML={{ __html: subheadingtext.split('\n').join('<br>') }}></p> */}
                </header>
                <main className='flex flex-col justify-start items-center gap-6 w-full mb-16 mx-6 px-8'>
                    {buttons.map((button, index) => {
                        const icon = button.icon
                            ? icons[button.icon as keyof typeof icons]
                            : icons[defaultIcon as keyof typeof icons];
                        return button.disabled
                            ? ''
                            : (
                                <div key={index}
                                    className={(calcButtonStyleTypeShadows(buttonstyleType))
                                        + ' w-full max-w-[700px]'}
                                    style={{
                                        border: `1px solid ${buttonbordercolor}`,
                                        backgroundColor: buttoncolor,
                                        color: buttontextcolor,
                                        borderRadius: `${buttonstyleRadius}px`
                                    }}
                                >
                                    <a href={button.url} target='_blank'
                                        className='flex justify-center items-center gap-2 w-full mx-0 my-auto px-3 py-3 cursor-pointer overflow-hidden opacity-100 hover:opacity-70'
                                        style={{
                                            backgroundColor: 'transparent',
                                            transitionDuration: '200ms'
                                        }}
                                    >
                                        <FontAwesomeIcon icon={icon as IconDefinition} />
                                        <p className='text-lg sm:text-xl'>
                                            {button.text}
                                        </p>
                                    </a>
                                </div>
                            );
                    })}
                </main>
            </div>
        </div>
    )
}
