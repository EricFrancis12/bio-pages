import { fontsArray } from './fonts';
const fontFamilies = fontsArray.map((_font) => _font.family);

export type fontFamily = typeof fontFamilies[number]; // is a valid type if the fontsArray has it as a ".family" property
export type buttonStyleType = 'no_shadow' | 'soft_shadow' | 'hard_shadow';
export type buttonStyleRadius = number;
export type buttonStyle = `${buttonStyleType}-${buttonStyleRadius}`;
export type buttonIcon = `fa${string}` | null;
export type buttonUrl = `http${string}` | '';

export type color_RGB = `rgb(${number}, ${number}, ${number})`;
export type color_RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type color_HEX = `#${string}`;
export type color_NAME = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'purple' | 'white' | 'black' | 'grey' | 'transparent';
export type color_GRADIENT = `linear-gradient(${string})` | `radial-gradient(${string})` | `repeating-linear-gradient(${string})` | `repeating-radial-gradient(${string})`;
export type color = color_RGB | color_RGBA | color_HEX | color_NAME | color_GRADIENT;

export type emailAddress = `${string}@${string}.${string}`;

export type User = {
    _id: string,
    email: emailAddress | string,
    hashedpassword?: string,
    emailvalidationtoken?: string | null,
    emailvalidationtokenexpiry?: number | null,
    passwordresettoken?: string | null,
    passwordresettokenexpiry?: number | null
};

export type Button = {
    text: string,
    icon: buttonIcon,
    url: buttonUrl,
    disabled?: boolean
};

export type Click = {
    biopage_id?: string,
    timestamp: number
};

export type BioPage = {
    _id: string,
    user_id: string,
    name: string,
    font: fontFamily,
    textcolor: color,
    backgroundcolor: color,
    imagesrc: string | null,
    headingtext: string,
    subheadingtext: string,
    buttonstyle: buttonStyle,
    buttoncolor: color,
    buttontextcolor: color,
    buttonbordercolor: color,
    buttons: Button[],
    clicks: Click[]
};

export type Timerange = {
    startDate: Date,
    endDate: Date,
    key: string
};
