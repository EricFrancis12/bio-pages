import { Metadata } from 'next';
import ResetPasswordForm from '../lib/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
    title: 'Reset Password'
};

export default async function Page() {
    return (
        <div className='grid place-items-center h-screen'>
            <ResetPasswordForm />
        </div>
    )
}
