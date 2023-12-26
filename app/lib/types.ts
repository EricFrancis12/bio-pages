export type Font = '1' | '2';
export type ButtonStyle = '1' | '2';



export interface User {
    _id: String
};

export interface Button {
    text: String,
    url: String
};

export interface BioPage {
    _id: String,
    user_id: String,
    image: {
        src: String
    },
    heading: {
        text: String,
        font: Font
    },
    subheading: {
        text: String,
        font: Font
    },
    buttonStyle: ButtonStyle,
    buttons: Button[],
    numClicks: Number
};