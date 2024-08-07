'use client';

import Link from 'next/link';
import { useState } from 'react';
import { resetPasswordAction } from '../../actions';
import AuthForm from './AuthForm';

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
        <AuthForm
            type='reset password'
            action={clientResetPasswordAction}
            error={error}
            disabled={!!successMessage}
        >
            {(successMessage && !error) &&
                <div className='flex justify-center text-white w-full text-sm mt-2'>
                    <div className='max-w-[200px] px-3 py-1 bg-green-500 rounded-md'>
                        {successMessage}
                    </div>
                </div>
            }
            <Link className='text-sm mt-3 text-right' href={'/register'}>
                {"Don't have an account? "}<span className='underline'>Register</span>
            </Link>
        </AuthForm>
    )
}
