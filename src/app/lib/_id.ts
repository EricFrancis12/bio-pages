import crypto from 'crypto';

export function generateNewUser_id() {
    return `${crypto.randomUUID()}_u`;
}

export function generateNewBioPage_id() {
    return `${crypto.randomUUID()}_b`;
}
