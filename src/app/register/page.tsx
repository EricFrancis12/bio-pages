import { Metadata } from 'next';
import RegisterForm from '../lib/components/auth/RegisterForm';

export const metadata: Metadata = {
    title: 'Register'
};

export default async function Page() {
    return (
        <div className='grid place-items-center h-screen'>
            <RegisterForm />
        </div>
    )
}
