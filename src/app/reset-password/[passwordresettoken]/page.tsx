import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchUserByPasswordResetToken, updateExistingUser } from '@/app/lib/data';
import { TUser } from '@/app/lib/types';

export const metadata: Metadata = {
    title: 'Reset Password'
};

export default async function Page({ params }: { params: { passwordresettoken: string } }) {
    let success = false;
    try {
        const user = await fetchUserByPasswordResetToken(params.passwordresettoken);
        if (user?.passwordresettokenexpiry) {
            const currentDate = new Date();
            const expiryDate = new Date(user.passwordresettokenexpiry);
            if (expiryDate > currentDate) {
                const updatedUser: TUser = {
                    ...user,
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
                await updateExistingUser(updatedUser);
                success = true;
            }
        }
    } catch (err) {
        console.error(err);
    }

    return (
        <div className='text-center w-full mt-8 mx-4'>
            {success === true
                ? <>
                    Password reset successfully.{' '}
                    <Link
                        href='/login'
                        className='text-blue-300 underline'
                    >
                        Click Here
                    </Link>
                    {' '}to log in.
                </>
                : <>
                    This token is invalid or has expired
                </>
            }
        </div>
    )
}