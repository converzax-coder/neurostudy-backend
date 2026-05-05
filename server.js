const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json({ limit: "10mb" }));

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.post("/api/estudiar", async (req, res) => {
  try {
    const { text, mode } = req.body;

    if (!text) {
      return res.status(400).json({ error: "Falta texto." });
    }

    const instrucciones = {
      facil: "Explica el contenido de forma sencilla, clara y ordenada.",
      tdah: "Divide el contenido en pasos cortos, concretos y fáciles de seguir.",
      examen: "Crea preguntas tipo examen con respuestas breves.",
      visual: "Convierte el contenido en un esquema visual textual con ideas clave.",
      accesible: "Reescribe el contenido con frases cortas, lenguaje claro y estructura accesible.",
      divertido: "Convierte el contenido en una experiencia de estudio divertida tipo reto."
    };

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "Eres un asistente educativo inclusivo. Respondes en español, de forma clara, útil y no abrumadora."
        },
        {
          role: "user",
          content: `${instrucciones[mode] || instrucciones.facil}\n\nContenido:\n${text}`
        }
      ],
      temperature: 0.4
    });

    res.json({
      result: completion.choices[0].message.content
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Error usando la IA."
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor funcionando en puerto 3000");
});
