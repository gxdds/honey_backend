require("dotenv").config();
const bcrypt = require("bcryptjs");
const { neon } = require("@neondatabase/serverless");

const sql = neon(process.env.DATABASE_URL);

// Função serverless
module.exports = async (req, res) => {
  if (req.method === "POST") {
    const { nome, email, senha, idade, sexo } = req.body;

    try {
      // Verificar se a URL do banco de dados está correta
      console.log("DATABASE_URL:", process.env.DATABASE_URL); // Verifique se a URL do banco está correta

      // Verificar se o e-mail já está cadastrado
      const userExists =
        await sql`SELECT * FROM usuario WHERE email = ${email}`;

      console.log("userExists:", userExists); // Log para inspecionar o retorno da consulta

      // Verificar se o retorno contém a propriedade 'rows' ou se é um array
      if (userExists && userExists.rows && userExists.rows.length > 0) {
        return res.status(400).json({ message: "Email já cadastrado." });
      }

      // Criptografar a senha
      const hashedPassword = await bcrypt.hash(senha, 10);

      // Inserir o novo usuário no banco de dados
      await sql`
        INSERT INTO usuario (nome, email, idade, sexo, senha, is_premium)
        VALUES (${nome}, ${email}, ${idade}, ${sexo}, ${hashedPassword}, false)
      `;

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
