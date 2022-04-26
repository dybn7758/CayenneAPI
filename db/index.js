const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'SDC_QA',
    password: process.env.DATABASE_PASSWORD,
    port: 5432,
};

const pool = new Pool(credentials);

pool.connect(() => {
    // eslint-disable-next-line no-console
    console.log('db connection established😀');
});

module.exports = pool;
