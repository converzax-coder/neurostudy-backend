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
  const { text, mode } = req.body;

  let resultado = "";

  if (mode === "facil") {
    resultado = "Resumen fácil:\n" + text.slice(0, 300);
  } else if (mode === "tdah") {
    resultado = "Pasos cortos:\n1. Lee el texto por partes.\n2. Subraya la idea principal.\n3. Resume en una frase.\n\nTexto base:\n" + text.slice(0, 200);
  } else if (mode === "examen") {
    resultado = "Preguntas tipo examen:\n1. ¿Cuál es la idea principal?\n2. ¿Qué conceptos aparecen?\n3. ¿Qué conclusión puedes sacar?";
  } else {
    resultado = "Contenido procesado:\n" + text.slice(0, 300);
  }

  res.json({
    result: resultado
  });
  });
});

app.listen(3000, () => {
  console.log("Servidor funcionando en puerto 3000");
});
