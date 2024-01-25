'use client';

import Link from 'next/link';
import { useState } from 'react';
import { resetPasswordAction } from '../../actions';

export default function ResetPasswordForm() {
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const clientResetPasswordAction = async (formData: FormData) => {
        setError('');
        const email = formData.get('email')?.toString();

        if (!email) {
            return setError('Email is required.');
        }

        try {
            const result = await resetPasswordAction(email);
            if (result?.success === true) {
                setSuccessMessage('Check your email for a reset link from us.');
            } else {
                setError('Something went wrong!');
            }
        } catch (err) {
            setError('Something went wrong!');
        }
    };

    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-violet-400'>
            <h1 className='text-xl font-bold my-4'>
                Reset Password
            </h1>
            <form action={clientResetPasswordAction}
                className='flex flex-col gap-3'
            >
                {!successMessage &&
                    <>
                        <input
                            type='email'
                            name='email'
                            placeholder='Email'
                            required={true}
                        />
                        <button className='bg-violet-600 text-white font-bold cursor-pointer px-6 py-2'>
                            Submit
                        </button>
                    </>
                }
                {error &&
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                }
                {successMessage && !error &&
                    <div className='bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {successMessage}
                    </div>
                }
                <Link className='text-sm mt-3 text-right' href={'/register'}>
                    {"Don't have an account? "}<span className='underline'>Register</span>
                </Link>
            </form>
        </div>
    )
}
