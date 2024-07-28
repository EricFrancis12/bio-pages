'use client';

import Link from 'next/link';
import { useState } from 'react';
import { enterNewPasswordAction } from '../../actions';
import AuthForm from './AuthForm';

export default function EnterNewPasswordForm({ passwordresettoken }: {
    passwordresettoken: string,
}) {
    const [error, setError] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string>('');

    const clientEnterNewPasswordAction = async (formData: FormData) => {
        setError('');
        const password = formData.get('password')?.toString();
        const confrimPassword = formData.get('confrimPassword')?.toString();
        const formPasswordresettoken = formData.get('passwordresettoken')?.toString();

        if (!formPasswordresettoken || formPasswordresettoken !== passwordresettoken) {
            return setError('Form error. Try refreshing the page.');
        } else if (!password || !confrimPassword) {
            return setError('Please complete all form fields.');
        } else if (password !== confrimPassword) {
            return setError('Passwords do not match.');
        }

        try {
            const result = await enterNewPasswordAction(password, formPasswordresettoken);
            if (result?.success === true) {
                setSuccessMessage('Password reset successfully.');
            } else {
                setError('Something went wrong!');
            }
        } catch (err) {
            setError('Something went wrong!');
        }
    };

    return (
        <AuthForm
            type='enter new password'
            action={clientEnterNewPasswordAction}
            error={error}
            disabled={!!successMessage}
            passwordresettoken={passwordresettoken}
        >
            {(successMessage && !error) &&
                <div className='flex flex-col justify-start items-center gap-2'>
                    <div className='max-w-[200px] bg-green-500 text-white text-sm py-1 px-3 rounded-md mt-2'>
                        {successMessage}
                    </div>
                    <Link className='text-sm underline' href={'/login'}>
                        Click here to login
                    </Link>
                </div>
            }
        </AuthForm>
    )
}
