import React from 'react';
import { Metadata } from 'next';
import ResetPasswordForm from './components/ResetPasswordForm';

export const metadata: Metadata = {
    title: 'Reset Password Page'
};

export default function page() {
    return (
        <div>
            <div>
                <h1>
                    Reset Password Page
                </h1>
            </div>
            <div>
                <ResetPasswordForm />
            </div>
        </div>
    )
}
