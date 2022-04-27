const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const credentials = {
    user: process.env.USER,
    host: process.env.HOST,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DATABASE_PORT,
};

const pool = new Pool(credentials);

pool.connect(() => {
    // eslint-disable-next-line no-console
    console.log('db connection established😀');
});

module.exports = pool;
