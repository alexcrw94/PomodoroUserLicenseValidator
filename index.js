const express = require("express");
const mongoose = require("mongoose");
const User = require('./schema'); 

const app = express();
const port = process.env.PORT || 3000;
const mongodbUri = process.env.MONGODB_URI;

app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("🔥 Conectado a MongoDB"))
    .catch(err => console.error("Error al conectar a MongoDB", err));


// Buscar usuario
app.get("/pomodoro-extension/user", async (req, res) => {
    const userId = req.query.userId;
    
    if (!userId) {
        return res.status(400).json({ error: "userId es requerido" });
    }

    try {
        let user = await User.findOne({ userId });

        if (user) {
            console.log('Usuario encontrado:', user);
            res.json({ user });
          } else {
            console.log('Usuario no encontrado');
            res.json({ message: 'Usuario no encontrado'});
          }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.post("/pomodoro-extension/user", async (req, res) => {
    const { userId, skins } = req.body;

    // Verificar que los parámetros necesarios están presentes
    if (!userId || !skins || !Array.isArray(skins) || skins.length === 0) {
        return res.status(400).json({ error: "userId y skins son requeridos" });
    }

    try {
        // Crear un nuevo documento de usuario
        const newUser = new User({
            userId,
            skins
        });

        // Guardar el nuevo usuario en la base de datos
        await newUser.save();

        // Responder con el usuario guardado
        res.status(201).json({ message: "Usuario creado con éxito", user: newUser });
    } catch (err) {
        console.error("Error al guardar el usuario:", err);
        res.status(500).json({ error: "Error en el servidor" });
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
