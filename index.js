require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// Carga de honeytokens
const dbPassword = process.env.DB_PASSWORD;
const awsKey = process.env.AWS_ACCESS_KEY_ID;

console.log("[INFO] Inicializando servicio de backend...");

if (!dbPassword || !awsKey) {
  console.warn("[WARN] Faltan variables de entorno críticas. Los servicios externos podrían fallar.");
} else {
  console.log("[INFO] Configuración de entorno cargada correctamente en memoria.");
}

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', message: 'Aplicación operativa' });
});

app.listen(port, () => {
  console.log(`[INFO] Servidor escuchando en el puerto ${port}`);
});