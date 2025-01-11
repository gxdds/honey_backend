const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const pool = require("../../config/db");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { email, senha } = req.body;

    try {
      // Verificar se o usuário existe
      const user = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
      if (user.rows.length === 0) {
        return res.status(400).json({ message: "Usuário não encontrado." });
      }

      // Verificar a senha
      const validPassword = await bcrypt.compare(senha, user.rows[0].senha);
      if (!validPassword) {
        return res.status(400).json({ message: "Senha incorreta." });
      }

      // Gerar o JWT
      const token = jwt.sign({ id: user.rows[0].id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({ message: "Login bem-sucedido!", token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  } else {
    res.status(405).json({ message: "Método não permitido" });
  }
};
