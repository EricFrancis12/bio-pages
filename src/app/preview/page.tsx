'use client';

import { useSearchParams } from 'next/navigation';
import BioPage from '@/app/lib/components/BioPage';
import type { TBioPage, TButtonStyle } from '../lib/types';
import { defaultImagesrc } from '../lib/default-data';
import { stringIsValidJSON } from '../lib/utils/utils';

// A dynamic Bio Page preview page using useSearchParams()
export default function Page() {
    const searchParams = useSearchParams();

    const name = searchParams.get('name') ?? '';
    const font = searchParams.get('font') ?? '1';
    const textcolor = searchParams.get('textcolor') ?? 'white';
    const backgroundcolor = searchParams.get('backgroundcolor') ?? 'black';
    const imagesrc = searchParams.get('imagesrc') ?? defaultImagesrc;
    const headingtext = searchParams.get('headingtext') ?? '';
    const subheadingtext = searchParams.get('subheadingtext') ?? '';
    const buttonstyle = searchParams.get('buttonstyle') ?? 'fill-0';
    const buttoncolor = searchParams.get('buttoncolor') ?? 'blue';
    const buttontextcolor = searchParams.get('buttontextcolor') ?? 'white';
    const buttonbordercolor = searchParams.get('buttonbordercolor') ?? 'white';
    const buttons = stringIsValidJSON(searchParams.get('buttons') as string)
        ? JSON.parse(searchParams.get('buttons') ?? '[]')
        : [];

    const bioPage: TBioPage = {
        _id: 'PREVIEW_BIOPAGE_id',
        user_id: 'PREVIEW_BIOPAGE_user_id',
        name: name,
        font: font,
        textcolor: textcolor,
        backgroundcolor: backgroundcolor,
        imagesrc,
        headingtext: headingtext,
        subheadingtext: subheadingtext,
        buttonstyle: buttonstyle as TButtonStyle,
        buttoncolor: buttoncolor,
        buttontextcolor: buttontextcolor,
        buttonbordercolor: buttonbordercolor,
        buttons,
        clicks: []
    };

    return (
        <BioPage bioPage={bioPage} />
    )
}