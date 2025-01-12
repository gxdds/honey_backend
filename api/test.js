require("dotenv").config();
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

module.exports = async (req, res) => {
  try {
    const result = await sql`SELECT version()`;
    const { version } = result[0];
    res.status(200).send(version + "\n deu certo caralho kkkkkkkkkkkk");
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    res.status(500).send("Erro interno do servidor");
  }
};
