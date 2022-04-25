const { Pool } = require('pg');

const credentials = {
    user: 'postgres',
    host: 'localhost',
    database: 'SDC_QA',
    password: 'password',
    port: 5432,
};

const pool = new Pool(credentials);

pool.connect(() => {
    // eslint-disable-next-line no-console
    console.log('db connection established😀');
});

module.exports = pool;
