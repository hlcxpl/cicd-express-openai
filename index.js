const express = require("express");
require("dotenv").config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.get("/", (req, res) => {
    res.send(`Server is running express funcionando correctamente`);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

//crea un endpoint que devuelva  un json  con { "status": "ok" , timestamp: new Date() }
app.get("/status", (req, res) => {
    res.json({ status: "ok", timestamp: new Date() });
});


// Crea un endpoint POST en /chat que reciba en el body un JSON con una propiedad "pregunta"
// La pregunta no debe estar vacía.
// Usa el cliente OpenAI para obtener la respuesta del modelo "gpt-3.5-turbo".
// Devuelve la respuesta en un JSON. Maneja correctamente los errores.
const { OpenAI } = require('openai');
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API,
});

app.post('/chat', async (req, res) => {
    const { pregunta } = req.body;
    if (!pregunta || typeof pregunta !== 'string' || pregunta.trim() === '') {
        return res.status(400).json({ error: 'La pregunta no debe estar vacía' });
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [{ role: 'user', content: pregunta }],
            max_tokens: 100,
        });
        const answer = response.choices[0].message.content;
        res.json({ respuesta: answer });
    } catch (error) {
        console.error('Error al obtener la respuesta de OpenAI:', error);
        res.status(500).json({ error: 'Error al obtener la respuesta de OpenAI' });
    }
});