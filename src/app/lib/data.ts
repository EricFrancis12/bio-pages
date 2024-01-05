import { db } from '@vercel/postgres';
import type { User, BioPage, Click } from './types';
import { generateNewBioPage_id } from '@/app/lib/_id';
import { CLICKS_MAX_NUM_DAYS_STORED, MAX_NUM_CLICKS } from './hard-limits';
import { filterOldTimestamps } from './utils';

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
        SELECT *
        FROM biopages
        WHERE _id = ${bioPage_id};
    `;
    if (result.rows.length !== 1) return null;
    const { _id, user_id, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks } = result.rows[0];
    const bioPage: BioPage = {
        _id,
        user_id,
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
        ...result.rows[0],
        buttons: JSON.parse(buttons),
        clicks: JSON.parse(clicks)
    };
    return bioPage;
}

export async function fetchBioPagesByUser_id(user_id: string) {
    const client = await db.connect();
    const result = await client.sql`
        SELECT *
        FROM biopages
        WHERE user_id = ${user_id};
    `;
    const bioPages = result.rows.map(bioPage => {
        const { _id, user_id: _user_id, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks } = bioPage;
        const result: BioPage = {
            _id,
            user_id,
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
            clicks: JSON.parse(clicks)
        };
        return result;
    });
    return bioPages;;
}

export function createNewBioPage(user_id: string) {
    const newBioPage: BioPage = {
        _id: generateNewBioPage_id(),
        user_id,
        font: '1',
        textcolor: 'white',
        backgroundcolor: 'black',
        imagesrc: '',
        headingtext: '',
        subheadingtext: '',
        buttonstyle: 'fill-0',
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
        INSERT INTO biopages (_id, user_id, font, textcolor, backgroundcolor, imageSrc, headingText, subheadingText, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons, clicks)
        VALUES (${bioPage._id}, ${bioPage.user_id}, ${bioPage.font}, ${bioPage.textcolor}, ${bioPage.backgroundcolor}, ${bioPage.imagesrc}, ${bioPage.headingtext}, ${bioPage.subheadingtext}, ${bioPage.buttonstyle}, ${bioPage.buttoncolor}, ${bioPage.buttontextcolor}, ${bioPage.buttonbordercolor}, ${JSON.stringify(bioPage.buttons)}, ${JSON.stringify(bioPage.clicks)});
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
            buttons = ${JSON.stringify(buttons)},
            clicks = ${JSON.stringify(clicks)}
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


export async function saveNewClickToBioPage(bioPage_id: string, click?: Click) {
    if (!click) click = {
        t: Date.now()
    };

    const bioPage = await fetchBioPageBy_id(bioPage_id);
    if (bioPage?.clicks) {
        bioPage.clicks.push(click);

        if (bioPage.clicks.length > MAX_NUM_CLICKS) {
            const newClicks = bioPage.clicks.slice(0, MAX_NUM_CLICKS);
            bioPage.clicks = newClicks;
        }

        bioPage.clicks = filterOldTimestamps(bioPage.clicks, CLICKS_MAX_NUM_DAYS_STORED);

        await updateExistingBioPage(bioPage as BioPage);
    }
    return bioPage;
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