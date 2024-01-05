const { db } = require('@vercel/postgres');
const { bioPages, users } = require('../src/app/lib/placholder-data');

async function seedUsers(client) {
    try {
        await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
        // Create the 'users' table if it doesn't exist
        const createTable = await client.sql`
            CREATE TABLE IF NOT EXISTS users (
                _id VARCHAR(255) NOT NULL UNIQUE,
                email VARCHAR(255) NOT NULL UNIQUE,
                hashedpassword VARCHAR(255) NOT NULL,
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
            users: insertedUsers,
        };
    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
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
                buttons VARCHAR(255) NOT NULL,
                clicks VARCHAR(255) NOT NULL,
                PRIMARY KEY(_id),
                FOREIGN KEY (user_id) REFERENCES users(_id)
            );
        `;

        console.log(`Created 'biopages' table`);

        // Insert data into the 'biopages' table
        const insertedBioPages = await Promise.all(
            bioPages.map(
                (bioPage) => client.sql`
                    INSERT INTO biopages (_id, user_id, font, textcolor, backgroundcolor, imagesrc, headingtext, subheadingtext, buttonstyle, buttons, clicks)
                    VALUES (${bioPage._id}, ${bioPage.user_id}, ${bioPage.font}, ${bioPage.textcolor}, ${bioPage.backgroundcolor}, ${bioPage.imagesrc}, ${bioPage.headingtext}, ${bioPage.subheadingtext}, ${bioPage.buttonstyle}, ${bioPage.buttoncolor}, ${bioPage.buttontextcolor}, ${bioPage.buttonbordercolor}, ${JSON.stringify(bioPage.buttons)}, ${JSON.stringify(bioPage.clicks)});
                `,
            )
        );

        console.log(`Seeded ${bioPages.length} biopages`);

        return {
            createTable,
            bioPages: insertedBioPages,
        };
    } catch (error) {
        console.error('Error seeding biopages:', error);
        throw error;
    }
}


async function main() {
    const client = await db.connect();

    // await seedUsers(client);
    await seedBioPages(client);

    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});
