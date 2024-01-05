import type { Button, Click } from './types';

export const defaultImagesrc = '/default-profile-image.webp';

export const defaultButton: Button = {
    text: '',
    icon: 'faLink',
    url: '',
    disabled: false
};

export const defaultClick: Click = {
    t: Date.now()
};