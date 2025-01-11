const bcrypt = require("bcrypt");
const pool = require("../../config/db");

module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { nome, email, senha, idade, sexo } = req.body;

    try {
      // Verificar se o e-mail já está cadastrado
      const userExists = await pool.query("SELECT * FROM usuario WHERE email = $1", [email]);
      if (userExists.rows.length > 0) {
        return res.status(400).json({ message: "Email já cadastrado." });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Inserir o novo usuário no banco de dados
      await pool.query(
        "INSERT INTO usuario (nome, email, idade, sexo, senha) VALUES ($1, $2, $3, $4, $5)",
        [nome, email, idade, sexo, hashedPassword]
      );

      res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor." });
    }
  } else {
    // Caso a requisição não seja POST, retorna erro
    res.status(405).json({ message: "Método não permitido" });
  }
};
