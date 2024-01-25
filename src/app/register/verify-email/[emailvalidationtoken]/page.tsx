import type { Metadata } from 'next';
import Link from 'next/link';
import { fetchUserByEmailValidationToken, updateExistingUser } from '@/app/lib/data';
import { User } from '@/app/lib/types';

export const metadata: Metadata = {
    title: 'Verify Email'
};

export default async function Page({ params }: { params: { emailvalidationtoken: string } }) {
    let success = false;
    try {
        const user = await fetchUserByEmailValidationToken(params.emailvalidationtoken);
        if (user?.emailvalidationtokenexpiry) {
            const currentDate = new Date();
            const expiryDate = new Date(user.emailvalidationtokenexpiry);
            if (expiryDate > currentDate) {
                const updatedUser: User = {
                    ...user,
                    // We are changing these to null because the /login route checks to see if these have a value
                    // on the user object. If they do, it won't let them log in, because it means they never
                    // verified their email here.
                    emailvalidationtoken: null,
                    emailvalidationtokenexpiry: null
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
                    Email validated successfully.{' '}
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
