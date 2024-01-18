import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
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
                },

            },
            async authorize(credentials, req) {
                if (!credentials?.username || !credentials?.password) return null;

                const user = await fetchUserByEmail(credentials.username as string);
                if (!user) return null;

                if (!user.hashedpassword) {
                    // ----- TO IMPLIMENT: -----

                    // A user could not have a hashedPassword saved in the db,
                    // because they may have initially registered with an oAuth provider.
                    // Therefore, if we get to this point, we should allow them to choose a password
                    // via passwordResetToken email link.

                    // We are only allowing auth via CredentialsProvider, so we will always have a hashedPassword
                    // for the user. Therefore this can be left unhandled for now.
                }

                // const correctPasswordSubmitted = credentials.password as string === user.hashedpassword as string;
                const correctPasswordSubmitted = await bcrypt.compare(credentials.password as string, user.hashedpassword as string);
                if (!correctPasswordSubmitted) return null;

                return {
                    name: user._id,
                    email: user.email,
                    id: user._id
                };
            }
        })
    ],
    // callbacks: {
    //   async signIn(props: any) {
    //     return true;
    //   },
    //   async redirect(props: any) {
    //     const baseUrl = props.baseUrl;
    //     return baseUrl;
    //   },
    //   async session(props: any) {
    //     const session = { ...props.session };
    //     session.users = { ...session.users, test: 'hi', email: 'test-email' };
    //     return session;
    //   },
    //   async jwt(props: any) {
    //     const token = props.token;
    //     return token
    //   }
    // }
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
