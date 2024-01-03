import type { Click, buttonStyle, buttonStyleType, buttonStyleRadius } from "./types";

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