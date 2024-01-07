import type { User, BioPage, Button, Click } from './types';
import { faX } from '@fortawesome/free-solid-svg-icons';

export const defaultImagesrc = '/default-profile-image.webp';

export const defaultUser: User = {
    _id: 'DEFAULT_USER_id',
    email: `defaultuser@${process.env.domain}`,
    hashedpassword: '123',
    passwordresettoken: '456'
};

export const defaultButton: Button = {
    text: '',
    icon: 'faLink',
    url: '',
    disabled: false
};

export const defaultClick: Click = {
    t: Date.now()
};

export const defaultBioPage: BioPage = {
    _id: 'DEFAULT_BIOPAGE_id',
    user_id: defaultUser._id,
    font: '1',
    textcolor: 'white',
    backgroundcolor: 'black',
    imagesrc: defaultImagesrc,
    headingtext: 'Example Heading Text!',
    subheadingtext: 'Some cool subheading text... :)',
    buttonstyle: 'fill-0',
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