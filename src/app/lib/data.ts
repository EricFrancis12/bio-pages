import { QueryResult, QueryResultRow, db } from '@vercel/postgres';
import { upload } from '@vercel/blob/client';
import { default as bcrypt } from 'bcryptjs';
import type { TUser, TBioPage, TClick } from './types';
import {
    generateNewUser_id, generateNewBioPage_id,
    generateNewEmailValidationToken, generateNewEmailValidationTokenExpiry
} from '@/app/lib/_id';
import { sendNewUserActivationEmail } from './email';
import { defaultClick } from './default-data';

export async function hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
}

export async function createNewUser(email: string, password: string) {
    const hashedpassword = await hashPassword(password);
    const newUser: TUser = {
        _id: generateNewUser_id(),
        email,
        hashedpassword,
        emailvalidationtoken: generateNewEmailValidationToken(),
        emailvalidationtokenexpiry: generateNewEmailValidationTokenExpiry()
    };
    return newUser;
}

export async function createAndSaveNewUser(email: string, password: string) {
    try {
        const user = await createNewUser(email, password);
        const client = await db.connect();
        await client.sql`
            INSERT INTO users (_id, email, hashedPassword, emailvalidationtoken, emailvalidationtokenexpiry)
            VALUES (${user._id}, ${user.email}, ${user.hashedpassword}, ${user.emailvalidationtoken}, ${user.emailvalidationtokenexpiry});
        `;
        await sendNewUserActivationEmail(user);
        return user;
    } catch (err) {
        console.error('Error saving new user: ', err);
        return null;
    }
}

export function getUserFromSqlResult(result: QueryResult<QueryResultRow>) {
    if (result.rows.length !== 1 || !result.rows.at(0)?._id || !result.rows.at(0)?.email) {
        return null;
    }

    const { _id, email, hashedpassword, emailvalidationtoken, emailvalidationtokenexpiry, passwordresettokenexpiry, passwordresettoken } = result.rows[0];
    const user: TUser = {
        _id,
        email,
        hashedpassword,
        emailvalidationtoken,
        emailvalidationtokenexpiry: emailvalidationtokenexpiry ? parseInt(emailvalidationtokenexpiry) : null,
        passwordresettoken,
        passwordresettokenexpiry: passwordresettokenexpiry ? parseInt(passwordresettokenexpiry) : null
    };
    return user;
}

export async function fetchUserBy_id(user_id: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT *
            FROM users
            WHERE _id = ${user_id};
        `;
        return getUserFromSqlResult(result);
    } catch (err) {
        console.error('Error fetching user: ', err);
        return null;
    }
}

export async function fetchUserByEmail(email: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT *
            FROM users
            WHERE email = ${email};
        `;
        return getUserFromSqlResult(result);
    } catch (err) {
        console.error('Error fetching user: ', err);
        return null;
    }
}

export async function fetchUserByEmailValidationToken(emailvalidationtoken: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT *
            FROM users
            WHERE emailvalidationtoken = ${emailvalidationtoken};
        `;
        return getUserFromSqlResult(result);
    } catch (err) {
        console.error('Error fetching user: ', err);
        return null;
    }
}

export async function fetchUserByPasswordResetToken(passwordresettoken: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT *
            FROM users
            WHERE passwordresettoken = ${passwordresettoken};
        `;
        return getUserFromSqlResult(result);
    } catch (err) {
        console.error('Error fetching user: ', err);
        return null;
    }
}

export async function validatePasswordresettoken(passwordresettoken: string) {
    try {
        const user = await fetchUserByPasswordResetToken(passwordresettoken);
        if (user?.passwordresettokenexpiry) {
            const currentDate = new Date();
            const expiryDate = new Date(user.passwordresettokenexpiry);
            if (expiryDate > currentDate) {
                return user;
            }
        }
        return null;
    } catch (err) {
        console.error('Error validating passwordresettoken: ', err);
        return null;
    }
}

export async function updateExistingUser(user: TUser) {
    const { _id, email, hashedpassword, emailvalidationtoken, emailvalidationtokenexpiry, passwordresettoken, passwordresettokenexpiry } = user;
    try {
        const client = await db.connect();
        await client.sql`
            UPDATE
            users SET
                email = ${email},
                hashedpassword = ${hashedpassword},
                emailvalidationtoken = ${emailvalidationtoken},
                emailvalidationtokenexpiry = ${emailvalidationtokenexpiry},
                passwordresettoken = ${passwordresettoken},
                passwordresettokenexpiry = ${passwordresettokenexpiry}
            WHERE _id = ${_id};
        `;
        return true;
    } catch (err) {
        console.error('Error updating user: ', err);
        return false;
    }
}

export async function fetchBioPageBy_id(bioPage_id: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT
                biopages.*,
                ARRAY_AGG(clicks.timestamp) AS clicks
            FROM biopages
            LEFT JOIN clicks ON biopages._id = clicks.biopage_id
            WHERE biopages._id = ${bioPage_id}
            GROUP BY biopages._id;
        `;
        if (result.rows.length !== 1) return null;
        const { _id, user_id, name, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks: timestamps } = result.rows[0];
        const bioPage: TBioPage = {
            _id,
            user_id,
            font,
            name,
            textcolor,
            backgroundcolor,
            imagesrc,
            headingtext,
            subheadingtext,
            buttonstyle,
            buttoncolor,
            buttontextcolor,
            buttonbordercolor,
            ...result.rows[0],
            buttons: JSON.parse(buttons),
            // the click.timestamp properties are returned as strings from the db, so we need to parseFloat()
            clicks: timestamps.map((timestamp: string): TClick => ({ timestamp: parseFloat(timestamp) }))
        };
        return bioPage;
    } catch (err) {
        console.error('Error fetching bioPage: ', err);
        return null;
    }
}

export async function fetchBioPagesByUser_id(user_id: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT
                biopages.*,
                ARRAY_AGG(clicks.timestamp) AS clicks
            FROM biopages
            LEFT JOIN clicks ON biopages._id = clicks.biopage_id
            WHERE biopages.user_id = ${user_id}
            GROUP BY biopages._id;
        `;
        const bioPages = result.rows.map(bioPage => {
            const { _id, user_id: _user_id, name, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks: timestamps } = bioPage;
            const result: TBioPage = {
                _id,
                user_id,
                name,
                font,
                textcolor,
                backgroundcolor,
                imagesrc,
                headingtext,
                subheadingtext,
                buttonstyle,
                buttoncolor,
                buttontextcolor,
                buttonbordercolor,
                ...bioPage,
                buttons: JSON.parse(buttons),
                clicks: timestamps.map((timestamp: string): TClick => ({ timestamp: parseFloat(timestamp) }))
            };
            return result;
        });
        return bioPages;
    } catch (err) {
        console.error('Error fetching bioPages: ', err);
        return [];
    }
}

export function createNewBioPage(user_id: string) {
    const newBioPage: TBioPage = {
        _id: generateNewBioPage_id(),
        user_id,
        name: '',
        font: '1',
        textcolor: 'white',
        backgroundcolor: 'black',
        imagesrc: '',
        headingtext: '',
        subheadingtext: '',
        buttonstyle: 'no_shadow-0',
        buttoncolor: 'blue',
        buttontextcolor: 'white',
        buttonbordercolor: 'white',
        buttons: [],
        clicks: []
    };
    return newBioPage;
}

export async function createAndSaveNewBioPage(user_id: string) {
    try {
        const bioPage = createNewBioPage(user_id);
        const client = await db.connect();
        await client.sql`
            INSERT INTO biopages (_id, user_id, name, font, textcolor, backgroundcolor, imageSrc, headingText, subheadingText, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons)
            VALUES (${bioPage._id}, ${bioPage.user_id}, ${bioPage.name}, ${bioPage.font}, ${bioPage.textcolor}, ${bioPage.backgroundcolor}, ${bioPage.imagesrc}, ${bioPage.headingtext}, ${bioPage.subheadingtext}, ${bioPage.buttonstyle}, ${bioPage.buttoncolor}, ${bioPage.buttontextcolor}, ${bioPage.buttonbordercolor}, ${JSON.stringify(bioPage.buttons)});
        `;
        return bioPage;
    } catch (err) {
        console.error('Error saving new bioPage: ', err);
        return null;
    }
}

export async function updateExistingBioPage(bioPage: TBioPage) {
    const { _id, user_id, name, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks } = bioPage;
    try {
        const client = await db.connect();
        await client.sql`
            UPDATE
            biopages SET
                name = ${name},
                font = ${font},
                textcolor = ${textcolor},
                backgroundcolor = ${backgroundcolor},
                imagesrc = ${imagesrc},
                headingtext = ${headingtext},
                subheadingtext = ${subheadingtext},
                buttonstyle = ${buttonstyle},
                buttoncolor = ${buttoncolor},
                buttontextcolor = ${buttontextcolor},
                buttonbordercolor = ${buttonbordercolor},
                buttons = ${JSON.stringify(buttons)}
            WHERE _id = ${_id}
            AND user_id = ${user_id};
        `;
        return true;
    } catch (err) {
        console.error('Error updating bioPage: ', err);
        return false;
    }
}

export async function deleteBioPageBy_id(bioPage_id: string) {
    try {
        const client = await db.connect();
        await client.sql`
            DELETE
            FROM biopages
            WHERE _id = ${bioPage_id};
        `;
        return true;
    } catch (err) {
        console.error('Error deleting bioPage: ', err);
        return false;
    }
}

export async function changeBioPage_id(bioPage_id: string, newBioPage_id: string) {
    try {
        const client = await db.connect();
        await client.sql`
            UPDATE
            biopages SET
                _id = ${newBioPage_id}
            WHERE _id = ${bioPage_id};
        `;
        return true;
    } catch (err) {
        console.error('Error changing bioPage _id: ', err);
    }
}

export async function checkBioPage_idAvailability(checkString: string) {
    try {
        const client = await db.connect();
        const result = await client.sql`
            SELECT *
            FROM biopages
            WHERE _id = ${checkString};
        `;
        return result?.rows?.length === 0
            ? true
            : false;
    } catch (err) {
        console.error('Error checking bioPage availability: ', err);
        return false;
    }
}

export async function uploadImageFile(blobUrl: string) {
    try {
        const response = await fetch(blobUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch blob data');
        }

        const blobData = await response.blob();

        const imageFileName = `avatar-${crypto.randomUUID()}.jpeg`;

        // Create a File object from the Blob data
        const imageFile = new File([blobData], imageFileName, { type: blobData.type });

        const uploadResult = await upload(imageFileName, imageFile, {
            access: 'public',
            handleUploadUrl: '/api/avatar/upload',
        });

        return uploadResult;
    } catch (err) {
        console.error('Error uploading image: ', err);
        return null;
    }
}

export async function deleteImageFile(imageFileUrl: string) {
    return await fetch('/api/avatar', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'DELETE',
        body: JSON.stringify({ url: imageFileUrl })
    })
        .catch(err => console.error(err));
}

export async function createAndSaveNewClick(click?: TClick) {
    if (!click) click = {
        ...defaultClick
    } as TClick;
    const { biopage_id, timestamp } = click;
    try {
        const client = await db.connect();
        await client.sql`
            INSERT INTO clicks (biopage_id, timestamp)
            VALUES (${biopage_id}, ${timestamp});
        `;
        return click;
    } catch (err) {
        console.error('Error saving new click: ', err);
        return null;
    }
}