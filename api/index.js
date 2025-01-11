const express = require("express");
const authRoutes = require("./auth");
const testRoutes = require("./test");

const router = express.Router();  // Inicialize o router primeiro

router.use("/auth", authRoutes);  // Agora você pode usar router.use
router.use("/test", testRoutes);  // E então usar a outra rota

module.exports = router;
