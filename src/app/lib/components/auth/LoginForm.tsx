'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
    const { push } = useRouter();

    const [error, setError] = useState<string>('');

    const clientLoginAction = async (formData: FormData) => {
        setError('');
        const email = formData.get('email')?.toString();
        const password = formData.get('password')?.toString();

        if (!email || !password) {
            return setError('Email and password are required.');
        }

        try {
            const result = await signIn('credentials', {
                username: email,
                password,
                redirect: false
            });
            if (!result?.ok) {
                return setError(result?.error ?? 'Something went wrong!');
            } else {
                push('/dashboard');
            }
        } catch (err) {
            setError('Something went wrong!');
        }
    }

    return (
        <div className='shadow-lg p-5 rounded-lg border-t-4 border-violet-400'>
            <h1 className='text-xl font-bold my-4'>
                Login
            </h1>
            <form action={clientLoginAction}
                className='flex flex-col gap-3'
            >
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
                    Login
                </button>
                {error &&
                    <div className='bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                        {error}
                    </div>
                }
                <Link className='text-sm mt-3 text-right' href={'/register'}>
                    {"Don't have an account? "}<span className='underline'>Register</span>
                </Link>
            </form>
        </div>
    )
}
