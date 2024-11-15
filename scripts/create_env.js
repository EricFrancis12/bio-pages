const fs = require('fs');

const envFilePath = './.env';

const envFileContent = `NODE_ENV="" # "development" or "production"
NEXT_PUBLIC_DOMAIN="" # mydomain.com
NEXT_PUBLIC_APP_NAME="Bio Pages App"

POSTGRES_URL="" # postgres://default:example@example.com:5432/mydb
POSTGRES_PRISMA_URL=""
POSTGRES_URL_NON_POOLING=""
POSTGRES_USER=""
POSTGRES_HOST=""
POSTGRES_PASSWORD=""
POSTGRES_DATABASE=""

NEXTAUTH_SECRET="REPLACE_ME"
NEXTAUTH_URL="http://localhost:3000" # Replace with your actual root domain (https://mydomain.com)

BLOB_READ_WRITE_TOKEN="REPLACE_ME" # More info: https://vercel.com/docs/storage/vercel-blob

RESEND_API_KEY="" # Your API Key from https://resend.com
TRANSACTION_EMAIL_ADDRESS="" # support@mydomain.com

NEXT_PUBLIC_GA_MEASUREMENT_ID="" # (OPTIONAL) Your GA Measurement ID from: https://analytics.google.com/analytics/web
`;

(async function () {
    if (fs.existsSync(envFilePath)) {
        console.log(`.env file detected at ${envFilePath}`);
        return;
    }

    console.log(`Creating .env file at ${envFilePath}`);
    fs.writeFileSync(envFilePath, envFileContent, { encoding: 'utf8' });
}());
