'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createAndSaveNewUserAction } from '../../actions';

export default function LoginForm() {
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const clientRegisterAction = async (formData: FormData) => {
        setError('');
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) {
            return setError('Email and password are required.');
        }

        try {
            const result = await createAndSaveNewUserAction(email, password);
            if (result?.success === true) {
                setSuccessMessage('Check your email for validation.');
            } else {
                setError('Something went wrong!');
            }
        } catch (err) {
            setError('Something went wrong!');
        }
    }

    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-violet-400'>
            <h1 className='text-xl font-bold my-4'>
                Register
            </h1>
            <form action={clientRegisterAction}
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
                        <input
                            type='password'
                            name='password'
                            placeholder='Password'
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
                <Link className='text-sm mt-3 text-right' href={'/login'}>
                    Have an account? <span className='underline'>Log in</span>
                </Link>
            </form>
        </div>
    )
}
