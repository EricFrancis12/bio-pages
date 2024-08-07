import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';
import useProtectedRoute from '@/app/lib/hooks/useProtectedRoute';

export async function POST(req: NextRequest): Promise<NextResponse> {
    const session = await useProtectedRoute();
    if (!session) {
        return NextResponse.json({ success: false, message: 'unauthorized' });
    }

    const body = (await req.json()) as HandleUploadBody;

    try {
        const jsonResponse = await handleUpload({
            body,
            request: req,
            onBeforeGenerateToken: async (
                _: string,
                /* clientPayload?: string, */
            ) => {
                // Generate a client token for the browser to upload the file
                // ⚠️ Authenticate and authorize users before generating the token.
                // Otherwise, you're allowing anonymous uploads.

                return {
                    allowedContentTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
                    tokenPayload: JSON.stringify({
                        // optional, sent to your server on upload completion
                        // you could pass a user id from auth, or a value from clientPayload
                    }),
                };
            },
            onUploadCompleted: async ({ blob, tokenPayload }) => {
                // Get notified of client upload completion
                // ⚠️ This will not work on `localhost` websites,
                // Use ngrok or similar to get the full upload flow

                try {
                    // Run any logic after the file upload completed
                    // const { userId } = JSON.parse(tokenPayload);
                    // await db.update({ avatar: blob.url, userId });
                } catch (error) {
                    throw new Error('Could not update user');
                }
            },
        });

        return NextResponse.json(jsonResponse);
    } catch (err) {
        return NextResponse.json(
            { error: (err as Error).message },
            { status: 400 }, // The webhook will retry 5 times waiting for a 200
        );
    }
}