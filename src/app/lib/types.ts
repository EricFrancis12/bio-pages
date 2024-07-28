import { fontsArray } from './fonts';
const fontFamilies = fontsArray.map((_font) => _font.family);

export type TFontFamily = typeof fontFamilies[number]; // is a valid type if the fontsArray has it as a ".family" property
export type TButtonStyleType = 'no_shadow' | 'soft_shadow' | 'hard_shadow';
export type TButtonStyleRadius = number;
export type TButtonStyle = `${TButtonStyleType}-${TButtonStyleRadius}`;
export type TButtonIcon = `fa${string}` | null;
export type TButtonUrl = `http${string}` | '';

export type TColor_RGB = `rgb(${number}, ${number}, ${number})`;
export type TColor_RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export type TColor_HEX = `#${string}`;
export type TColor_NAME = 'red' | 'blue' | 'yellow' | 'green' | 'orange' | 'purple' | 'white' | 'black' | 'grey' | 'transparent';
export type TColor_GRADIENT = `linear-gradient(${string})` | `radial-gradient(${string})` | `repeating-linear-gradient(${string})` | `repeating-radial-gradient(${string})`;
export type TColor = TColor_RGB | TColor_RGBA | TColor_HEX | TColor_NAME | TColor_GRADIENT;

export type TUser = {
    _id: string,
    email: string,
    hashedpassword?: string,
    emailvalidationtoken?: string | null,
    emailvalidationtokenexpiry?: number | null,
    passwordresettoken?: string | null,
    passwordresettokenexpiry?: number | null
};

export type TButton = {
    text: string,
    icon: TButtonIcon,
    url: TButtonUrl,
    disabled?: boolean
};

export type TClick = {
    biopage_id?: string,
    timestamp: number
};

export type TBioPage = {
    _id: string,
    user_id: string,
    name: string,
    font: TFontFamily,
    textcolor: TColor,
    backgroundcolor: TColor,
    imagesrc: string | null,
    headingtext: string,
    subheadingtext: string,
    buttonstyle: TButtonStyle,
    buttoncolor: TColor,
    buttontextcolor: TColor,
    buttonbordercolor: TColor,
    buttons: TButton[],
    clicks: TClick[]
};

export type TTimerange = {
    startDate: Date,
    endDate: Date,
    key: string
};
