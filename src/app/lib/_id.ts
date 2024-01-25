import crypto from 'crypto';
import { nanoid } from 'nanoid';

const oneDaysMs = 1000 * 60 * 60 * 24;

export function generateNewUser_id() {
    return `${crypto.randomUUID()}_u`;
}

export function generateNewBioPage_id() {
    return `${nanoid()}_b`;
}

export function generateNewEmailValidationToken() {
    return `${crypto.randomBytes(32).toString('base64url')}`;
}

export function generateNewEmailValidationTokenExpiry() {
    return Date.now() + oneDaysMs;
}

export function generateNewPasswordResetToken() {
    return `${crypto.randomBytes(32).toString('base64url')}`;
}

export function generateNewPasswordResetTokenExpiry() {
    return Date.now() + oneDaysMs;
}
