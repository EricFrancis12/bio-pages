'use client';

import { useSearchParams } from 'next/navigation';
import BioPage from '@/app/lib/components/BioPage';
import type { BioPage as T_BioPage, buttonStyle, color, fontFamily } from '../lib/types';
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

    const bioPage: T_BioPage = {
        _id: 'PREVIEW_BIOPAGE_id',
        user_id: 'PREVIEW_BIOPAGE_user_id',
        name: name as string,
        font: font as fontFamily,
        textcolor: textcolor as color,
        backgroundcolor: backgroundcolor as color,
        imagesrc,
        headingtext: headingtext as string,
        subheadingtext: subheadingtext as string,
        buttonstyle: buttonstyle as buttonStyle,
        buttoncolor: buttoncolor as color,
        buttontextcolor: buttontextcolor as color,
        buttonbordercolor: buttonbordercolor as color,
        buttons,
        clicks: []
    };

    return (
        <BioPage bioPage={bioPage} />
    )
}