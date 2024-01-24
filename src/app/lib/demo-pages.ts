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
    _id: '1',
    user_id: 'DEMO_USER_id',
    name: 'Rachelle Bakes',
    font: 'Arimo',
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
    _id: '2',
    user_id: 'DEMO_USER_id',
    name: 'Brandon Green - MXR Fishing',
    font: 'Barlow',
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
    _id: '3',
    user_id: 'DEMO_USER_id',
    name: 'Deb Jones - Sunlight Princess',
    font: 'DM_Sans',
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

export const demoBioPage_4: BioPage = {
    _id: '4',
    user_id: 'DEMO_USER_id',
    name: 'FitLife with Alex',
    font: 'PT_Sans_Narrow',
    textcolor: 'white',
    backgroundcolor: 'green',
    imagesrc: defaultImagesrc,
    headingtext: 'FitLife with Alex',
    subheadingtext: 'Embrace the Fitness Journey!',
    buttonstyle: 'no_shadow-1',
    buttoncolor: 'orange',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'Custom Workout Plans',
            icon: 'faDumbbell',
            url: '',
            disabled: false
        },
        {
            text: 'Nutrition Guide',
            icon: 'faAppleAlt',
            url: '',
            disabled: false
        },
        {
            text: 'Shop Fitness Gear',
            icon: 'faShoppingBag',
            url: '',
            disabled: false
        },
        {
            text: 'Join Fitness Challenges',
            icon: 'faRunning',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_5: BioPage = {
    _id: '5',
    user_id: 'DEMO_USER_id',
    name: 'CodeWizard Central',
    font: 'Lato',
    textcolor: 'rgb(74, 234, 10)',
    backgroundcolor: 'linear-gradient(to top right, #3498db, #8e44ad)',
    imagesrc: defaultImagesrc,
    headingtext: 'CodeWizard Central',
    subheadingtext: 'Unleash the Power of Tech!',
    buttonstyle: 'hard_shadow-25',
    buttoncolor: 'purple',
    buttontextcolor: 'rgb(74, 234, 10)',
    buttonbordercolor: 'rgb(74, 234, 10)',
    buttons: [
        {
            text: 'Explore Coding Tutorials',
            icon: 'faCode',
            url: '',
            disabled: false
        },
        {
            text: 'Geeky Gadgets Wishlist',
            icon: 'faLaptopCode',
            url: '',
            disabled: false
        },
        {
            text: 'Join Tech Challenges',
            icon: 'faRobot',
            url: '',
            disabled: false
        },
        {
            text: 'Tech Event Calendar',
            icon: 'faCalendarAlt',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_6: BioPage = {
    _id: '6',
    user_id: 'DEMO_USER_id',
    name: 'Wanderlust Wonderland',
    font: 'Quicksand',
    textcolor: 'white',
    backgroundcolor: '#2ecc71',
    imagesrc: defaultImagesrc,
    headingtext: 'Wanderlust Wonderland',
    subheadingtext: 'Embark on Your Next Adventure!',
    buttonstyle: 'no_shadow-3',
    buttoncolor: '#e74c3c',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'Discover Hidden Gems',
            icon: 'faMapMarkerAlt',
            url: '',
            disabled: false
        },
        {
            text: 'Plan Your Journey',
            icon: 'faCompass',
            url: '',
            disabled: false
        },
        {
            text: 'Travel Essentials Shop',
            icon: 'faSuitcase',
            url: '',
            disabled: false
        },
        {
            text: 'Share Your Travel Story',
            icon: 'faCamera',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_7: BioPage = {
    _id: '7',
    user_id: 'DEMO_USER_id',
    name: 'Paws and Whiskers Haven',
    font: 'Raleway',
    textcolor: '#333',
    backgroundcolor: '#f8b400',
    imagesrc: defaultImagesrc,
    headingtext: 'Paws and Whiskers Haven',
    subheadingtext: 'Where Pets Rule the Hearts!',
    buttonstyle: 'no_shadow-4',
    buttoncolor: '#e44d26',
    buttontextcolor: 'white',
    buttonbordercolor: 'white',
    buttons: [
        {
            text: 'Adopt a Furry Friend',
            icon: 'faPaw',
            url: '',
            disabled: false
        },
        {
            text: 'Pet Care Tips',
            icon: 'faHeartbeat',
            url: '',
            disabled: false
        },
        {
            text: 'Pet Fashion Boutique',
            icon: 'faTshirt',
            url: '',
            disabled: false
        },
        {
            text: "Share Your Pet's Story",
            icon: 'faBone',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_8: BioPage = {
    _id: '8',
    user_id: 'DEMO_USER_id',
    name: 'Crafty Creations Hub',
    font: 'Ubuntu',
    textcolor: '#3fea12',
    backgroundcolor: '#ecf0f1',
    imagesrc: defaultImagesrc,
    headingtext: 'Crafty Creations Hub',
    subheadingtext: 'Unleash Your Creative Spirit!',
    buttonstyle: 'no_shadow-5',
    buttoncolor: '#3498db',
    buttontextcolor: 'white',
    buttonbordercolor: '#e74c3c',
    buttons: [
        {
            text: 'DIY Project Ideas',
            icon: 'faPaintBrush',
            url: '',
            disabled: false
        },
        {
            text: 'Craft Supplies Shop',
            icon: 'faShoppingCart',
            url: '',
            disabled: false
        },
        {
            text: 'Share Your Masterpiece',
            icon: 'faCameraRetro',
            url: '',
            disabled: false
        },
        {
            text: 'Crafting Community Forum',
            icon: 'faComments',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_9: BioPage = {
    _id: '9',
    user_id: 'DEMO_USER_id',
    name: 'CozyBook Haven',
    font: 'Work_Sans',
    textcolor: '#ffffff',
    backgroundcolor: '#34495e',
    imagesrc: defaultImagesrc,
    headingtext: 'CozyBook Haven',
    subheadingtext: 'Escape into the World of Words!',
    buttonstyle: 'no_shadow-6',
    buttoncolor: '#e67e22',
    buttontextcolor: 'white',
    buttonbordercolor: '#ffffff',
    buttons: [
        {
            text: 'Discover New Reads',
            icon: 'faBookOpen',
            url: '',
            disabled: false
        },
        {
            text: 'Book Lover Merchandise',
            icon: 'faShoppingBasket',
            url: '',
            disabled: false
        },
        {
            text: 'Join Book Clubs',
            icon: 'faUsers',
            url: '',
            disabled: false
        },
        {
            text: 'Share Your Favorite Quotes',
            icon: 'faQuoteLeft',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_10: BioPage = {
    _id: '10',
    user_id: 'DEMO_USER_id',
    name: 'SnapMaster Gallery',
    font: 'Inter',
    textcolor: '#ffffff',
    backgroundcolor: '#2c3e50',
    imagesrc: defaultImagesrc,
    headingtext: 'SnapMaster Gallery',
    subheadingtext: 'Capture Moments, Create Memories!',
    buttonstyle: 'no_shadow-7',
    buttoncolor: '#27ae60',
    buttontextcolor: 'white',
    buttonbordercolor: '#ffffff',
    buttons: [
        {
            text: 'Explore Photography Tips',
            icon: 'faCameraRetro',
            url: '',
            disabled: false
        },
        {
            text: 'Print Your Best Shots',
            icon: 'faPrint',
            url: '',
            disabled: false
        },
        {
            text: 'Photography Gear Store',
            icon: 'faStore',
            url: '',
            disabled: false
        },
        {
            text: 'Join Photography Contests',
            icon: 'faTrophy',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_11: BioPage = {
    _id: '11',
    user_id: 'DEMO_USER_id',
    name: 'ChicStyle Central',
    font: 'Josefin_Sans',
    textcolor: '#ffffff',
    backgroundcolor: '#e74c3c',
    imagesrc: defaultImagesrc,
    headingtext: 'ChicStyle Central',
    subheadingtext: 'Where Fashion Dreams Come True!',
    buttonstyle: 'no_shadow-8',
    buttoncolor: '#3498db',
    buttontextcolor: 'white',
    buttonbordercolor: '#ffffff',
    buttons: [
        {
            text: 'Trendy Fashion Picks',
            icon: 'faShoppingBag',
            url: '',
            disabled: false
        },
        {
            text: 'Style Tips & Tricks',
            icon: 'faMagic',
            url: '',
            disabled: false
        },
        {
            text: "Fashionista's Closet",
            icon: 'faCloset',
            url: '',
            disabled: false
        },
        {
            text: 'Fashion Events Calendar',
            icon: 'faCalendarCheck',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_12: BioPage = {
    _id: '12',
    user_id: 'DEMO_USER_id',
    name: 'GameMaster Hub',
    font: 'Kanit',
    textcolor: '#ffffff',
    backgroundcolor: '#2c3e50',
    imagesrc: defaultImagesrc,
    headingtext: 'GameMaster Hub',
    subheadingtext: 'Level Up Your Gaming Experience!',
    buttonstyle: 'no_shadow-9',
    buttoncolor: '#e67e22',
    buttontextcolor: 'white',
    buttonbordercolor: '#ffffff',
    buttons: [
        {
            text: 'Latest Game Releases',
            icon: 'faGamepad',
            url: '',
            disabled: false
        },
        {
            text: 'Gaming Gear Shop',
            icon: 'faHeadphones',
            url: '',
            disabled: false
        },
        {
            text: 'Join Gaming Tournaments',
            icon: 'faTrophy',
            url: '',
            disabled: false
        },
        {
            text: 'Share Your Epic Moments',
            icon: 'faVideo',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_13: BioPage = {
    _id: '13',
    user_id: 'DEMO_USER_id',
    name: 'Serenity Sanctuary',
    font: 'Karla',
    textcolor: '#333',
    backgroundcolor: '#f5e0cc',
    imagesrc: defaultImagesrc,
    headingtext: 'Serenity Sanctuary',
    subheadingtext: 'Nurture Your Mind, Body, and Soul!',
    buttonstyle: 'no_shadow-10',
    buttoncolor: '#27ae60',
    buttontextcolor: 'white',
    buttonbordercolor: '#ffffff',
    buttons: [
        {
            text: 'Guided Meditation Sessions',
            icon: 'faOm',
            url: '',
            disabled: false
        },
        {
            text: 'Holistic Wellness Store',
            icon: 'faShoppingBasket',
            url: '',
            disabled: false
        },
        {
            text: 'Virtual Retreats Calendar',
            icon: 'faCalendarAlt',
            url: '',
            disabled: false
        },
        {
            text: 'Share Your Wellness Journey',
            icon: 'faHeart',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};

export const demoBioPage_14: BioPage = {
    _id: '14',
    user_id: 'DEMO_USER_id',
    name: 'J A T',
    font: '',
    textcolor: 'rgb(4, 96, 216)',
    backgroundcolor: 'linear-gradient(to top right, #000054, #0101C5)',
    imagesrc: defaultImagesrc,
    headingtext: 'J A T',
    subheadingtext: "I'm a visual artist using photography to broaden the understanding of our times.",
    buttonstyle: 'no_shadow-25',
    buttoncolor: 'rgb(4, 96, 216)',
    buttontextcolor: 'black',
    buttonbordercolor: 'transparent',
    buttons: [
        {
            text: 'CV',
            icon: 'faFile',
            url: '',
            disabled: false
        },
        {
            text: 'Haramacy Invitational May 2024',
            icon: 'faSun',
            url: '',
            disabled: false
        },
        {
            text: 'House Theater Invitation October 2024',
            icon: 'faTicket',
            url: '',
            disabled: false
        }
    ],
    clicks: demoClicks()
};



export const demoBioPages = [
    demoBioPage_1,
    demoBioPage_2,
    demoBioPage_3,
    demoBioPage_4,
    demoBioPage_5,
    demoBioPage_6,
    demoBioPage_7,
    demoBioPage_8,
    demoBioPage_9,
    demoBioPage_10,
    demoBioPage_11,
    demoBioPage_12,
    demoBioPage_13,
    demoBioPage_14
];
