

export type TUser = {
    _id: string,
    email: string,
    hashedpassword?: string,
    emailvalidationtoken?: string | null,
    emailvalidationtokenexpiry?: number | null,
    passwordresettoken?: string | null,
    passwordresettokenexpiry?: number | null,
};

export type TBioPage = {
    _id: string,
    user_id: string,
    name: string,
    font: string,
    textcolor: string,
    backgroundcolor: string,
    imagesrc: string | null,
    headingtext: string,
    subheadingtext: string,
    buttonstyle: TButtonStyle,
    buttoncolor: string,
    buttontextcolor: string,
    buttonbordercolor: string,
    buttons: TButton[],
    clicks: TClick[],
};

export type TButton = {
    text: string,
    icon: TButtonIcon,
    url: string,
    disabled?: boolean,
};

export type TButtonStyleType = 'no_shadow' | 'soft_shadow' | 'hard_shadow';
export type TButtonStyle = `${TButtonStyleType}-${number}`;
export type TButtonIcon = string | null;

export type TClick = {
    biopage_id?: string,
    timestamp: number,
};

export type TTimerange = {
    startDate: Date,
    endDate: Date,
    key: string,
};
