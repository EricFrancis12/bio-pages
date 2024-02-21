import type { Metadata } from 'next';
import EnterNewPasswordForm from '@/app/lib/components/auth/EnterNewPasswordForm';
import { validatePasswordresettoken } from '@/app/lib/data';

export const metadata: Metadata = {
    title: 'Reset Password'
};

export default async function Page({ params }: { params: { passwordresettoken: string } }) {
    const user = await validatePasswordresettoken(params.passwordresettoken);

    return (
        <div className='flex flex-col justify-center items-center h-screen bg-white'>
            {!!user
                ? <EnterNewPasswordForm passwordresettoken={params.passwordresettoken} />
                : <span>This token is invalid or has expired</span>
            }
        </div>
    )
}