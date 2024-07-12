import { Resend } from 'resend';
import { TUser, TEmailAddress } from './types';

export async function sendEmail({ message, html, to, from, subject, replyTo }: {
    message?: string,
    html?: string,
    to: TEmailAddress,
    from: TEmailAddress | `${string}<${TEmailAddress}>`,
    subject: string,
    replyTo?: TEmailAddress,
}) {
    if (message == null && html == null) return null;

    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const result = await resend.emails.send({
            to,
            from,
            subject,
            html: html as string ?? message as string,
            reply_to: replyTo,
        });
        return result;
    } catch (err) {
        console.error('Error sending email: ', err);
        return null;
    }
}

export async function sendNewUserActivationEmail(user: TUser) {
    return await sendEmail({
        html: `<p>Thanks for signing up. Please <a href="http://${process.env.NEXT_PUBLIC_DOMAIN}/register/verify-email/${user.emailvalidationtoken}">Click Here</a> to activate your account.</p>`,
        to: user.email as TEmailAddress,
        from: process.env.TRANSACTION_EMAIL_ADDRESS as TEmailAddress,
        subject: 'Account activation',
        replyTo: process.env.TRANSACTION_EMAIL_ADDRESS as TEmailAddress
    });
}

export async function sendPasswordResetEmail(user: TUser) {
    return await sendEmail({
        html: `<p>Please <a href="http://${process.env.NEXT_PUBLIC_DOMAIN}/reset-password/${user.passwordresettoken}">Click Here</a> to reset your password.</p>`,
        to: user.email as TEmailAddress,
        from: process.env.TRANSACTION_EMAIL_ADDRESS as TEmailAddress,
        subject: 'Password reset',
        replyTo: process.env.TRANSACTION_EMAIL_ADDRESS as TEmailAddress
    });
}
