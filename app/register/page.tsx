import React from 'react';
import { Metadata } from 'next';
import RegisterForm from './components/RegisterForm';

export const metadata: Metadata = {
    title: 'Register Page'
};

export default function page() {
    return (
        <div>
            <div>
                <h1>
                    Register Page
                </h1>
            </div>
            <div>
                <RegisterForm />
            </div>
        </div>
    )
}
