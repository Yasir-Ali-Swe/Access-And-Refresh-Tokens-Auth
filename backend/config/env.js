import "dotenv/config";

const PORT = process.env.PORT || 4000;
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET = process.env.JWT_SECRET;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

export { PORT, DATABASE_URL, JWT_SECRET, EMAIL_USER, EMAIL_PASS };
