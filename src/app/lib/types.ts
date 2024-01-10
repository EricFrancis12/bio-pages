export type fontFamily = string;
export type buttonStyleType = 'fill' | 'outline' | 'soft_shadow' | 'hard_shadow';
export type buttonStyleRadius = number;
export type buttonStyle = `${buttonStyleType}-${buttonStyleRadius}`;
export type buttonIcon = `fa${string}` | null;
export type buttonUrl = `http${string}` | '';
export type color = string; // possibly change this later to specify what type of color string we will accept

export type Timeframe = [Date | null, Date | null];



export interface User {
  _id: string,
  email: string,
  hashedpassword?: string,
  passwordresettoken?: string
};

export interface Button {
  text: string,
  icon: buttonIcon,
  url: buttonUrl,
  disabled?: boolean
};

export interface Click {
  t: number, // new way of saving timestamp
  timestamp?: number // old way of saving timestamp
};

export interface BioPage {
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