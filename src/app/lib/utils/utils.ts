import type { BioPage, Click, buttonStyle, buttonStyleType, buttonStyleRadius, Timeframe } from '../types';

export function isObject(any: any) {
    return any != null && typeof any === 'object';
}

export function isArray(any: any) {
    return Object.prototype.toString.call(any) === '[object Array]';
}

export function isNil(any: any) {
    return any === null || any === undefined;
}

export function isEmpty(any: any) {
    return isNil(any) || any === '';
}

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

// returns dates in an array starting with today at index 0, going back "numDaysBeforeToday" days
export function getPreviousDates(numDaysBeforeToday: number) {
    const result = [];
    const today = new Date();

    for (let i = 0; i <= numDaysBeforeToday; i++) {
        const previousDate = new Date(today);
        previousDate.setDate(today.getDate() - i);

        const formattedDate = formatDayOfWeekAndDate(previousDate);
        result.push(formattedDate);
    }

    return result.reverse();
}

export function getDayOfWeek(dayIndex: number) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return daysOfWeek[dayIndex];
}

export function formatDate(date: Date) {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${month}/${day}`;
}

export function formatDayOfWeekAndDate(date: Date) {
    const dayOfWeek = getDayOfWeek(date.getDay());
    const formattedDate = formatDate(date);

    return `${dayOfWeek} ${formattedDate}`;
}

export function getBioPagesClicks(bioPages: BioPage[], range: string | number) {
    const mapBioPages = (bioPages: BioPage[]) => {
        const result: any = {};
        const allClicks = bioPages.map(bioPage => bioPage.clicks).flat();
        allClicks.forEach(click => {
            const formattedDate = formatDayOfWeekAndDate(new Date(click.t ?? click.timestamp));
            if (result[formattedDate]) {
                result[formattedDate].push(click);
            } else {
                result[formattedDate] = [click];
            }
        });
        return result;
    };
    const mappedBioPages = mapBioPages(bioPages);

    if (typeof range === 'number') {
        const previousDates = getPreviousDates(range);
        return previousDates.map(formattedDate => mappedBioPages[formattedDate] ?? [])?.flat() ?? [];
    } else if (range.toLowerCase() === 'today') {
        const today = getPreviousDates(0)[0];
        return mappedBioPages[today] ?? [];
    } else if (range.toLowerCase() === 'yesterday') {
        const yesterday = getPreviousDates(1)[0];
        return mappedBioPages[yesterday] ?? [];
    }
}
