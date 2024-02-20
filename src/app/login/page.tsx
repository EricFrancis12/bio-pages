import { Metadata } from 'next';
import BackToHomeLink from '../lib/components/BackToHomeLink';
import LoginForm from '../lib/components/auth/LoginForm';

export const metadata: Metadata = {
    title: 'Login'
};

export default async function Page() {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            <BackToHomeLink />
            <LoginForm />
        </div>
    )
}
