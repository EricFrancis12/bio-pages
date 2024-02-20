import type { TUser, TBioPage, TButton, TClick, TButtonIcon, TTimerange } from './types';
import { getStartAndEndOfToday } from './utils/timerange-utils';

export const defaultImagesrc = '/default-profile-image.webp';
export const defaultIcon: TButtonIcon = 'faLink';

export const defaultUser: TUser = {
    _id: 'DEFAULT_USER_id',
    email: `defaultuser@${process.env.NEXT_PUBLIC_DOMAIN}`,
    hashedpassword: '123',
    passwordresettoken: '456'
};

export const defaultButton: TButton = {
    text: '',
    icon: defaultIcon,
    url: '',
    disabled: false
};

export const defaultClick: TClick = {
    biopage_id: 'DEFAULT_BIOPAGE_ID',
    timestamp: Date.now()
};

export const defaultBioPage: TBioPage = {
    _id: 'DEFAULT_BIOPAGE_id',
    user_id: defaultUser._id,
    name: '',
    font: 'Arimo',
    textcolor: 'white',
    backgroundcolor: 'black',
    imagesrc: defaultImagesrc,
    headingtext: 'Example Heading Text!',
    subheadingtext: 'Some cool subheading text... :)',
    buttonstyle: 'no_shadow-0',
    buttoncolor: 'blue',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'Get your tasty treats here!',
            icon: 'faSpoon',
            url: '',
            disabled: false
        },
        {
            text: 'The Best Burgers In Town!',
            icon: 'faBurger',
            url: '',
            disabled: false
        }
    ],
    clicks: []
};

export const defaultTimerange = (): TTimerange => {
    const { startOfToday, endOfToday } = getStartAndEndOfToday();
    return {
        startDate: startOfToday,
        endDate: endOfToday,
        key: 'selection'
    };
};
