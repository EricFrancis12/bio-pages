'use client';

import Link from 'next/link';
import { useState } from 'react';
import { createAndSaveNewUserAction } from '../../actions';
import AuthForm from './AuthForm';

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
        <AuthForm
            type='register'
            action={clientRegisterAction}
            error={error}
            disabled={!!successMessage}
        >
            {successMessage && !error &&
                <div className='bg-green-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2'>
                    {successMessage}
                </div>
            }
            <Link className='text-sm mt-3 text-right' href={'/login'}>
                Have an account? <span className='underline'>Log in</span>
            </Link>
        </AuthForm>
    )
}
