const { Pool } = require("pg");
const dotenv = require("dotenv");

dotenv.config(); // Carrega as variáveis do arquivo .env

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // Necessário para conexão segura com o Neon
  },
});

module.exports = pool;
