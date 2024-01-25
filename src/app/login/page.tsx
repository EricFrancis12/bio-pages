import { Metadata } from 'next';
import LoginForm from '../lib/components/auth/LoginForm';

export const metadata: Metadata = {
    title: 'Login'
};

export default async function Page() {
    return (
        <div className='grid place-items-center h-screen'>
            <LoginForm />
        </div>
    )
}
