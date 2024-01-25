require('dotenv').config();

const { db } = require('@vercel/postgres');
const { users, bioPages, clicks } = require('../src/app/lib/placeholder-data');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the 'users' table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                _id VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                hashedpassword VARCHAR(255) NOT NULL,
                emailvalidationtoken VARCHAR(255),
                emailvalidationtokenexpiry BIGINT,
                passwordresettoken VARCHAR(255),
                passwordresettokenexpiry BIGINT,
                PRIMARY KEY (_id)
            );
        `;

        console.log(`Created 'users' table`);

        // Insert data into the 'users' table
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                return client.sql`
                    INSERT INTO users (_id, email, hashedpassword)
                    VALUES (${user._id}, ${user.email}, ${user.hashedpassword});
                `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            createTable,
            users: insertedUsers
        };
    } catch (err) {
        console.error('Error seeding users:', err);
        throw err;
    }
}

async function seedBioPages(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the 'biopages' table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS biopages (
                _id VARCHAR(255) NOT NULL UNIQUE,
                user_id VARCHAR(255) NOT NULL,
                name VARCHAR(255),
                font VARCHAR(255) NOT NULL,
                textcolor VARCHAR(255) NOT NULL,
                backgroundcolor VARCHAR(255) NOT NULL,
                imagesrc VARCHAR(255),
                headingtext VARCHAR(255) NOT NULL,
                subheadingtext VARCHAR(255) NOT NULL,
                buttonstyle VARCHAR(255) NOT NULL,
                buttoncolor VARCHAR(255) NOT NULL,
                buttontextcolor VARCHAR(255) NOT NULL,
                buttonbordercolor VARCHAR(255) NOT NULL,
                buttons VARCHAR,
                PRIMARY KEY(_id),
                FOREIGN KEY (user_id) REFERENCES users(_id)
            );
        `;

        console.log(`Created 'biopages' table`);

        // Insert data into the 'biopages' table
        const insertedBioPages = await Promise.all(
            bioPages.map(
                (bioPage) => client.sql`
                    INSERT INTO biopages (_id, user_id, name, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttoncolor, buttontextcolor, buttonbordercolor, buttons)
                    VALUES (${bioPage._id}, ${bioPage.user_id}, ${bioPage.name}, ${bioPage.font}, ${bioPage.textcolor}, ${bioPage.backgroundcolor}, ${bioPage.imagesrc}, ${bioPage.headingtext}, ${bioPage.subheadingtext}, ${bioPage.buttonstyle}, ${bioPage.buttoncolor}, ${bioPage.buttontextcolor}, ${bioPage.buttonbordercolor}, ${JSON.stringify(bioPage.buttons)});
                `,
            )
        );

        console.log(`Seeded ${bioPages.length} biopages`);

        return {
            createTable,
            bioPages: insertedBioPages
        };
    } catch (err) {
        console.error('Error seeding biopages:', err);
        throw err;
    }
}

async function seedClicks(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

        // Create the 'clicks' table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS clicks (
                biopage_id VARCHAR(255),
                timestamp BIGINT NOT NULL,
                FOREIGN KEY (biopage_id) REFERENCES biopages(_id) ON UPDATE CASCADE
            );
        `;

        console.log(`Created 'clicks' table`);

        // Insert data into the 'clicks' table
        const insertedClicks = await Promise.all(
            clicks.map(
                (click) => client.sql`
                    INSERT INTO clicks (biopage_id, timestamp)
                    VALUES (${click.biopage_id}, ${click.timestamp});
                `,
            )
        );

        console.log(`Seeded ${clicks.length} clicks`);

        return {
            createTable,
            clicks: insertedClicks
        };
    } catch (err) {
        console.error(err);
        throw err;
    }
}



async function main() {
    const client = await db.connect();

    await seedUsers(client);
    await seedBioPages(client);
    await seedClicks(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
