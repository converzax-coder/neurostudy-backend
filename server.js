const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.post("/api/estudiar", (req, res) => {
  res.json({
    result: "Funciona"
  });
});

app.listen(3000, () => {
  console.log("Servidor funcionando en puerto 3000");
});
