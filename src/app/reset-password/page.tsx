import { Metadata } from 'next';
import BackToHomeLink from '../lib/components/BackToHomeLink';
import ResetPasswordForm from '../lib/components/auth/ResetPasswordForm';

export const metadata: Metadata = {
    title: 'Reset Password'
};

export default async function Page() {
    return (
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            <BackToHomeLink />
            <ResetPasswordForm />
        </div>
    )
}
