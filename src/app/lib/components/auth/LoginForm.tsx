'use client';

import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AuthForm from './AuthForm';

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
                redirect: false,
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
        <AuthForm
            type='login'
            action={clientLoginAction}
            error={error}
        >
            <Link className='text-sm mt-3 text-right' href={'/register'}>
                {"Don't have an account? "}<span className='underline'>Register</span>
            </Link>
            <Link className='text-sm text-right' href={'/reset-password'}>
                {'or '}<span className='underline'>Reset Password</span>
            </Link>
        </AuthForm>
    )
}
