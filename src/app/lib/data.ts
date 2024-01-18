import { db } from '@vercel/postgres';
import { upload } from '@vercel/blob/client';
import type { User, BioPage, Click } from './types';
import { generateNewBioPage_id } from '@/app/lib/_id';
import { defaultClick } from './default-data';

export async function fetchUserBy_id(user_id: string) {
    const client = await db.connect();
    const result = await client.sql`
        SELECT *
        FROM users
        WHERE _id = ${user_id};
    `;
    if (result.rows.length !== 1 || !result.rows.at(0)?._id || !result.rows.at(0)?.email) return null;
    const { _id, email, hashedpassword, passwordresettoken } = result.rows[0];
    const user: User = {
        _id,
        email,
        hashedpassword,
        passwordresettoken,
        ...result.rows[0]
    };
    return user;
}

export async function fetchUserByEmail(email: string) {
    const client = await db.connect();
    const result = await client.sql`
        SELECT *
        FROM users
        WHERE email = ${email};
    `;
    if (result.rows.length !== 1 || !result.rows.at(0)?._id || !result.rows.at(0)?.email) return null;
    const { _id, email: _email, hashedpassword, passwordresettoken } = result.rows[0];
    const user: User = {
        _id,
        email: _email,
        hashedpassword,
        passwordresettoken,
        ...result.rows[0]
    };
    return user;
}

export async function fetchBioPageBy_id(bioPage_id: string) {
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
    const bioPage: BioPage = {
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
        clicks: timestamps.map((timestamp: string): Click => ({ timestamp: parseFloat(timestamp) }))
    };
    return bioPage;
}

export async function fetchBioPagesByUser_id(user_id: string) {
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
        const result: BioPage = {
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
            clicks: timestamps.map((timestamp: string): Click => ({ timestamp: parseFloat(timestamp) }))
        };
        return result;
    });
    return bioPages;;
}

export function createNewBioPage(user_id: string) {
    const newBioPage: BioPage = {
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
    const bioPage = createNewBioPage(user_id);
    const client = await db.connect();
    await client.sql`
        INSERT INTO biopages (_id, user_id, name, font, textcolor, backgroundcolor, imageSrc, headingText, subheadingText, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons)
        VALUES (${bioPage._id}, ${bioPage.user_id}, ${bioPage.name}, ${bioPage.font}, ${bioPage.textcolor}, ${bioPage.backgroundcolor}, ${bioPage.imagesrc}, ${bioPage.headingtext}, ${bioPage.subheadingtext}, ${bioPage.buttonstyle}, ${bioPage.buttoncolor}, ${bioPage.buttontextcolor}, ${bioPage.buttonbordercolor}, ${JSON.stringify(bioPage.buttons)});
    `;
    return bioPage;
}

export async function updateExistingBioPage(bioPage: BioPage) {
    const { _id, user_id, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks } = bioPage;
    const client = await db.connect();
    await client.sql`
        UPDATE
        biopages SET
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
}

export async function deleteBioPageBy_id(bioPage_id: string) {
    const client = await db.connect();
    await client.sql`
        DELETE
        FROM biopages
        WHERE _id = ${bioPage_id};
    `;
}

export async function changeBioPage_id(bioPage_id: string, newBioPage_id: string) {
    const client = await db.connect();
    await client.sql`
        UPDATE
        biopages SET
            _id = ${newBioPage_id}
        WHERE _id = ${bioPage_id};
    `;
}

export async function checkBioPage_idAvailability(checkString: string) {
    const client = await db.connect();
    const result = await client.sql`
        SELECT *
        FROM biopages
        WHERE _id = ${checkString};
    `;
    return result?.rows?.length === 0
        ? true
        : false;
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
    } catch (err: any) {
        console.error('Error uploading image:', err.message);
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
    });
}

export async function createAndSaveNewClick(click?: Click) {
    if (!click) click = {
        ...defaultClick
    };

    const { biopage_id, timestamp } = click;
    const client = await db.connect();
    await client.sql`
        INSERT INTO clicks (biopage_id, timestamp)
        VALUES (${biopage_id}, ${timestamp});
    `;
}