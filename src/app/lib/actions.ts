'use server';

import { revalidatePath } from 'next/cache';
import { updateExistingBioPage, deleteBioPageBy_id, createAndSaveNewUser, fetchUserByEmail, updateExistingUser } from './data';
import { sendPasswordResetEmail } from './email';
import { generateNewPasswordResetToken, generateNewPasswordResetTokenExpiry } from './_id';
import type { TBioPage, TUser } from './types';

export async function updateBioPageAction(bioPage: TBioPage) {
    await updateExistingBioPage(bioPage);
    return revalidatePath(`/dashboard/bio-pages/${bioPage._id}/edit`);
}

export async function deleteBioPageBy_idAction(bioPage_id: string) {
    await deleteBioPageBy_id(bioPage_id);
    return revalidatePath('/dashboard/bio-pages');
}

export async function createAndSaveNewUserAction(email: string, password: string) {
    const user = await createAndSaveNewUser(email, password);
    return {
        // Notice we are not returning the user object to the client,
        // so they won't have access to the emailvalidationtoken.
        // We only want them to have access to the token from the link
        // in the activation email.
        success: user ? true : false
    };
}

export async function resetPasswordAction(email: string) {
    const user = await fetchUserByEmail(email);
    if (user) {
        const updatedUser: TUser = {
            ...user,
            passwordresettoken: generateNewPasswordResetToken(),
            passwordresettokenexpiry: generateNewPasswordResetTokenExpiry()
        };
        await updateExistingUser(updatedUser);
        await sendPasswordResetEmail(updatedUser);
        return {
            success: true
        };
    }
    return {
        success: false
    };
}
