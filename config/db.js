const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    host: 'localhost',
    user: 'postgres', // Default PostgreSQL user
    database: 'drone_db',
    password: '', // Add your PostgreSQL password
    port: 5432, // Default PostgreSQL port
    max: 10, // Maximum number of connections
    idleTimeoutMillis: 30000, // How long a client is allowed to remain idle before being closed
});

pool.connect((err, client, release) => {
    if (err) {
        console.error('Connection error:', err.stack);
    } else {
        console.log('Connected to PostgreSQL database');
        release(); // Release the connection back to the pool
    }
});

module.exports = pool;
