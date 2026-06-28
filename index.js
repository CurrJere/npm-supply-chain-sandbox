require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Carga de honeytokens
const dbPassword = process.env.DB_PASSWORD;
const awsKey = process.env.AWS_ACCESS_KEY_ID;

console.log("[INFO] Inicializando backend de pruebas...");

if (!dbPassword || !awsKey) {
  console.warn("[WARN] Faltan credenciales clave. Posible fallo en servicios externos.");
} else {
  console.log("[INFO] Entorno cargado en memoria correctamente.");
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Servicio operativo' });
});

app.listen(port, () => {
  console.log(`[INFO] Servicio escuchando en puerto ${port}`);
});