import { Click, Timeframe } from '../types';
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

export function formatDatesRange(timeframe: Timeframe) {
    return timeframe.map(date => date !== null ? formatDate(date) : 'none').join(' - ');
}

export function clickIsWithinTimeframe(click: Click, timeframe: Timeframe) {
    const [startDate, endDate] = timeframe;
    const clickDate = new Date(click.t ?? click.timestamp);

    if (!startDate && !endDate) return true;
    if (!startDate || !endDate) return false;
    if (startDate <= clickDate && clickDate <= endDate) return true;
    return false;
}

export function filterClicksWithinTimeframe(clicks: Click[], timeframe: Timeframe) {
    return clicks.filter(click => clickIsWithinTimeframe(click, timeframe));
}

export function getLabelsPerTimeframe(timeframe: Timeframe) {
    const [startDate, endDate] = timeframe;
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