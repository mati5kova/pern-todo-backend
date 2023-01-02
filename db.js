const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: process.env.PGUSER || 'postgres',
    password: process.env.PGPASSWORD || 'BazaJeHitra5123!',
    host: process.env.PGHOST || 'localhost',
    port: process.env.PGPORT || '5432',
    database: process.env.PGDATABASE || 'perntodo',
});

module.exports = pool;
