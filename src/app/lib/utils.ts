import type { Click, buttonStyle, buttonStyleType, buttonStyleRadius } from './types';

export function stringIsValidJSON(string: string) {
    try {
        JSON.parse(string);
    } catch (e) {
        return false;
    }
    return true;
}

export function base64ToBlobUrl(base64String: string) {
    // Remove the data:image/png;base64, prefix
    const base64WithoutPrefix = base64String.replace(/^data:image\/[a-z]+;base64,/, '');

    // Convert the Base64 string to a binary array
    const binaryArray = atob(base64WithoutPrefix).split('').map(char => char.charCodeAt(0));

    // Create a Blob from the binary array
    const blob = new Blob([new Uint8Array(binaryArray)], { type: 'image/png' });

    // Generate a Blob URL from the Blob
    const blobUrl = URL.createObjectURL(blob);

    return blobUrl;
}

export function deconstructButtonStyle(buttonstyle: buttonStyle) {
    const result = buttonstyle.split('-');
    const buttonstyleType: buttonStyleType = result[0] as buttonStyleType;
    const buttonstyleRadius: buttonStyleRadius = parseInt(result[1]) as buttonStyleRadius;
    return {
        buttonstyleType,
        buttonstyleRadius
    };
}

export function filterOldTimestamps(array: Click[], maxDays: number) {
    const thresholdTimestamp = Date.now() - maxDays * 24 * 60 * 60 * 1000;
    return array.filter(obj => obj.t >= thresholdTimestamp);
}

export function recursivelyStripSubstringFromString(substring: string, string: string) {
    let result = string.split(substring).join('');
    if (result.includes(substring)) {
        return recursivelyStripSubstringFromString(substring, result);
    }
    return result;
}

export function objectsAreStructurallyIdentical(obj1: any, obj2: any) {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    // Check if the number of properties is the same
    if (keys1.length !== keys2.length) {
        return false;
    }

    // Check if all properties and values are the same
    for (const key of keys1) {
        if (obj1[key] !== obj2[key]) {
            return false;
        }
    }

    return true;
}

export function camelCaseToLowerCaseWithSpaces(str: string) {
    return str.split('').map(char => {
        const isLowerCase = char === char.toLowerCase();
        return isLowerCase
            ? char
            : ` ${char.toLowerCase()}`;
    }).join('');
}

export function traverseParentsForId(element: HTMLElement | null, id: string) {
    let currentElement = element;
    while (currentElement && currentElement.tagName !== 'BODY') {
        if (currentElement.id === id) {
            return true;
        }
        currentElement = currentElement.parentElement;
    }
    return false;
}

export function traverseParentsForClass(element: HTMLElement | null, _class: string) {
    let currentElement = element;
    while (currentElement && currentElement.tagName !== 'BODY') {
        if (currentElement.classList.contains(_class)) {
            return true;
        }
        currentElement = currentElement.parentElement;
    }
    return false;
}

export const generatePagination = (currentPage: number, totalPages: number) => {
    // If the total number of pages is 7 or less,
    // display all pages without any ellipsis.
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    // If the current page is among the first 3 pages,
    // show the first 3, an ellipsis, and the last 2 pages.
    if (currentPage <= 3) {
        return [1, 2, 3, '...', totalPages - 1, totalPages];
    }

    // If the current page is among the last 3 pages,
    // show the first 2, an ellipsis, and the last 3 pages.
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }

    // If the current page is somewhere in the middle,
    // show the first page, an ellipsis, the current page and its neighbors,
    // another ellipsis, and the last page.
    return [
        1,
        '...',
        currentPage - 1,
        currentPage,
        currentPage + 1,
        '...',
        totalPages,
    ];
};