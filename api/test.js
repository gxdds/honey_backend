const express = require("express");
const pool = require("../config/db");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.status(200).json({ message: "Conexão bem-sucedida!", data: result.rows[0] });
  } catch (error) {
    console.error("Erro ao conectar ao banco:", error);
    res.status(500).json({ message: "Erro na conexão com o banco." });
  }
});

module.exports = router;
