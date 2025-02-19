const mongoose = require('mongoose');
const { Schema } = mongoose;

// Esquema de colores dentro de un skin
const colorSchema = new Schema({
  background: { type: String, required: true },
  text: { type: String, required: true },
  button: { type: String, required: true },
  buttonHover: { type: String, required: true }
});

// Esquema de un skin
const skinSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  icon: { type: String, required: true },
  font: { type: String, required: true },
  image: { type: String, required: true },
  sound: { type: String, required: true },
  colors: { type: colorSchema, required: true }
});

// Esquema principal para el documento
const userSchema = new Schema({
  userId: { type: String, required: true, unique: true },
  skins: [skinSchema]
});

// Crear y exportar el modelo
const User = mongoose.model('User', userSchema);
module.exports = User;
