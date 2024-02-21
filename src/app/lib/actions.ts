'use server';

import { revalidatePath } from 'next/cache';
import { updateExistingBioPage, deleteBioPageBy_id, createAndSaveNewUser, fetchUserByEmail, updateExistingUser, validatePasswordresettoken, hashPassword } from './data';
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
        success: !!user ? true : false
    };
}

export async function resetPasswordAction(email: string) {
    let success = false;
    const user = await fetchUserByEmail(email);
    if (!!user) {
        const updatedUser: TUser = {
            ...user,
            passwordresettoken: generateNewPasswordResetToken(),
            passwordresettokenexpiry: generateNewPasswordResetTokenExpiry()
        };
        const successfullyUpdatedUser = await updateExistingUser(updatedUser);
        if (!!successfullyUpdatedUser) {
            const successfullySentEmail = await sendPasswordResetEmail(updatedUser);
            if (!!successfullySentEmail) {
                success = true;
            }
        }
    }
    return {
        success
    };
}

export async function enterNewPasswordAction(newPassword: string, passwordresettoken: string) {
    let success = false;
    const user = await validatePasswordresettoken(passwordresettoken);
    if (!!user) {
        const hashedpassword = await hashPassword(newPassword);
        if (hashedpassword !== user.hashedpassword) {
            const updatedUser: TUser = {
                _id: user._id,
                email: user.email,
                hashedpassword,
                // We are changing emailvalidationtoken and emailvalidationtokenexpiry to null
                // in addition to passwordresettoken and passwordresettokenexpiry, because
                // the /login route checks to see if these have a value on the user object.
                // Therefore, it makes sense to make them null here, as if they've gotten this far
                // they've already demonstrated they have access to this email address.
                emailvalidationtoken: null,
                emailvalidationtokenexpiry: null,
                passwordresettoken: null,
                passwordresettokenexpiry: null
            };
            success = await updateExistingUser(updatedUser);
        }
    }
    return {
        success
    };
}
