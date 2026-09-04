process.loadEnvFile();

export default{
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    DATABASE_PORT: process.env.DATABASE_PORT,
    DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
    AUTH_SECRET: process.env.AUTH_SECRET || 'DUMMY',
    MAIL_ID: process.env.MAIL_ID,
    APP_PASSWORD: process.env.APP_PASSWORD,
}