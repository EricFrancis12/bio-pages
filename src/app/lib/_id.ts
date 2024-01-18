import crypto from 'crypto';
import { nanoid } from 'nanoid'

export function generateNewUser_id() {
    return `${crypto.randomUUID()}_u`;
}

export function generateNewBioPage_id() {
    return `${nanoid()}_b`;
}
