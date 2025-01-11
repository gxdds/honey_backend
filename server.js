const express = require("express");
const cors = require("cors");
require("dotenv").config();

const apiRoutes = require("./api"); // Rotas da API

const app = express();
app.use(cors());
app.use(express.json());

// Rotas principais
app.use("/api", apiRoutes);

// Inicia o servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
