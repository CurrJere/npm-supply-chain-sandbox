// index.js
require('dotenv').config();
const express = require('express');
const app = express();
const port = 3000;

const dbPassword = process.env.DB_PASSWORD;
const awsKey = process.env.AWS_ACCESS_KEY_ID;

if (!dbPassword || !awsKey) {
  console.warn("⚠️  [AVISO] Faltan credenciales en el entorno. La app podría no funcionar correctamente.");
} else {
  console.log("✅ Credenciales cargadas en memoria correctamente.");
}

app.get('/', (req, res) => {
  res.send('¡Servidor de prueba funcionando y seguro!');
});

app.listen(port, () => {
  console.log(`Aplicación de prueba escuchando en http://localhost:${port}`);
});