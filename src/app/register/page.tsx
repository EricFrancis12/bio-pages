import { Metadata } from 'next';
import BackToHomeLink from '../lib/components/BackToHomeLink';
import RegisterForm from '../lib/components/auth/RegisterForm';

export const metadata: Metadata = {
    title: 'Register'
};

export default async function Page() {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            <BackToHomeLink />
            <RegisterForm />
        </div>
    )
}
