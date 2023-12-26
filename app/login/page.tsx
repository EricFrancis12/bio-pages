import React from 'react';
import { Metadata } from 'next';
import LoginForm from './components/LoginForm';

export const metadata: Metadata = {
    title: 'Login Page'
};

export default function page() {
    return (
        <div>
            <div>
                <h1>
                    Login Page
                </h1>
            </div>
            <div>
                <LoginForm />
            </div>
        </div>
    )
}
