import type { BioPage, Click } from './types';
import { defaultImagesrc } from './default-data';

export const demoClicks = () => {
    const today = Date.now();
    const t2 = today - 2222;
    const t3 = t2 - 5333;
    const t4 = t3 - 2444;
    const t5 = t4 - 4555;
    const t6 = t5 - 2222;

    const result: Click[] = [
        { timestamp: today },
        { timestamp: t2 },
        { timestamp: t3 },
        { timestamp: t4 },
        { timestamp: t5 },
        { timestamp: t6 }
    ];
    return result;
};

// demo cooking page
export const demoBioPage_1: BioPage = {
    _id: 'DEMO_BIOPAGE_1',
    user_id: 'DEMO_USER_id',
    name: 'Rachelle Bakes',
    font: '1',
    textcolor: 'white',
    backgroundcolor: 'black',
    imagesrc: defaultImagesrc,
    headingtext: 'Rachelle Bakes',
    subheadingtext: 'Come bake with me!',
    buttonstyle: 'no_shadow-0',
    buttoncolor: 'blue',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'Order Cookbook Here',
            icon: 'faBook',
            url: '',
            disabled: false
        },
        {
            text: 'Better Breader Bowl',
            icon: 'faBowlFood',
            url: '',
            disabled: false
        },
        {
            text: 'Cheese Grater On Amazon',
            icon: 'faCheese',
            url: '',
            disabled: false
        },
        {
            text: 'Meal Prep Containers',
            icon: 'faBoxOpen',
            url: '',
            disabled: false
        },
        {
            text: 'Bacon Wizard',
            icon: 'faBacon',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

// demo fishing page
export const demoBioPage_2: BioPage = {
    _id: 'DEMO_BIOPAGE_2',
    user_id: 'DEMO_USER_id',
    name: 'Brandon Green - MXR Fishing',
    font: '1',
    textcolor: 'white',
    backgroundcolor: 'black',
    imagesrc: defaultImagesrc,
    headingtext: 'Brandon Green',
    subheadingtext: 'MXR Fishing',
    buttonstyle: 'no_shadow-0',
    buttoncolor: 'blue',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'New Rod Sign Up',
            icon: 'faFish',
            url: '',
            disabled: false
        },
        {
            text: 'Win A Fishing Trip With Me!',
            icon: 'faPlane',
            url: '',
            disabled: false
        },
        {
            text: 'KaRu Lures Discount Code',
            icon: 'faShrimp',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

// demo influencer page
export const demoBioPage_3: BioPage = {
    _id: 'DEMO_BIOPAGE_2',
    user_id: 'DEMO_USER_id',
    name: 'Deb Jones - Sunlight Princess',
    font: '1',
    textcolor: 'white',
    backgroundcolor: 'black',
    imagesrc: defaultImagesrc,
    headingtext: 'Deb Jones',
    subheadingtext: 'Sunlight Princess',
    buttonstyle: 'no_shadow-0',
    buttoncolor: 'blue',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'Enter Monthly Giveaway',
            icon: 'faGift',
            url: '',
            disabled: false
        },
        {
            text: '30 Day Amazon Prime Free Trial',
            icon: 'faShippingFast',
            url: '',
            disabled: false
        },
        {
            text: 'Amazon Wishlist',
            icon: 'faList',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};
