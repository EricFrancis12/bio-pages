import type { User, BioPage, Button, Click, buttonIcon, Timerange, fontFamily } from './types';
import { getStartAndEndOfToday } from './utils/timerange-utils';

export const defaultImagesrc = '/default-profile-image.webp';
export const defaultIcon: buttonIcon = 'faLink';

export const defaultUser: User = {
    _id: 'DEFAULT_USER_id',
    email: `defaultuser@${process.env.domain}`,
    hashedpassword: '123',
    passwordresettoken: '456'
};

export const defaultButton: Button = {
    text: '',
    icon: defaultIcon,
    url: '',
    disabled: false
};

export const defaultClick: Click = {
    biopage_id: 'DEFAULT_BIOPAGE_ID',
    timestamp: Date.now()
};

export const defaultBioPage: BioPage = {
    _id: 'DEFAULT_BIOPAGE_id',
    user_id: defaultUser._id,
    name: '',
    font: '1',
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

export const defaultTimerange = (): Timerange => {
    const { startOfToday, endOfToday } = getStartAndEndOfToday();
    return {
        startDate: startOfToday,
        endDate: endOfToday,
        key: 'selection'
    };
};
