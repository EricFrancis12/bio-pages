import { TClick, TTimerange } from '../types';
import { formatDayOfWeekAndDate } from './utils';

export function makeDate(year: number, month: number, day: number, hour: number, min: number, sec: number, ms: number) {
    const date = new Date();
    date.setUTCFullYear(year, month, day); // year, month (0-11), day
    date.setUTCHours(hour, min, sec, ms); // hour, minute, second, millisecond
    return date;
}

export function formatDate(date = new Date()) {
    return date.toLocaleDateString(undefined, {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

export function formatDatesRange(timerange: TTimerange) {
    return `${timerange.startDate.toLocaleDateString()} - ${timerange.endDate.toLocaleDateString()}`;
}

export function clickIsWithinTimerange(click: TClick, timerange: TTimerange) {
    const { startDate, endDate } = timerange;
    const clickDate = new Date(click.timestamp);

    if (!startDate && !endDate) return true;
    if (!startDate || !endDate) return false;
    if (startDate <= clickDate && clickDate <= endDate) return true;
    return false;
}

export function filterClicksWithinTimerange(clicks: TClick[], timerange: TTimerange) {
    return clicks.filter(click => clickIsWithinTimerange(click, timerange));
}

export function getLabelsPerTimerange(timerange: TTimerange) {
    const { startDate, endDate } = structuredClone(timerange);
    if (!startDate || !endDate) return [];

    const daysArray = [];
    const currentDate = startDate;

    while (currentDate <= endDate) {
        const formattedDate = formatDayOfWeekAndDate(currentDate);
        daysArray.push(formattedDate);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return daysArray;
}
