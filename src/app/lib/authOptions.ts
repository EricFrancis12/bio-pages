import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { fetchUserByEmail } from '@/app/lib/data';

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Email Address',
                    type: 'text',
                    placeholder: 'Email address...'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Password...'
                }
            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) {
                    return null;
                }

                const user = await fetchUserByEmail(credentials.username as string);
                if (!user) {
                    return null;
                }

                if (user?.emailvalidationtoken) {
                    // The emailvalidationtoken is removed on email verification,
                    // so if they still have it we know they are not verified
                    // and they should not be allowed to log in.
                    return null;
                }

                if (!user.hashedpassword) {
                    // ----- IMPORTANT: -----

                    // A user could not have a hashedPassword saved in the db
                    // because they may have initially registered with an oAuth provider.
                    // Therefore, if we get to this point, we should allow them to choose a password
                    // via passwordresettoken email link.

                    // However, currently we are only allowing auth via CredentialsProvider,
                    // so we should always have a hashedPassword for the user.
                    // Therefore, if for whatever reason they don't have a hashedpassword on file,
                    // we should disallow login.

                    // If we add more providers in the future, this will need to be addressed.
                    return null;
                }

                const correctPasswordSubmitted = await bcrypt.compare(credentials.password as string, user.hashedpassword as string);
                if (!correctPasswordSubmitted) {
                    return null;
                }

                return {
                    name: user._id,
                    email: user.email,
                    id: user._id
                };
            }
        })
    ]
};
