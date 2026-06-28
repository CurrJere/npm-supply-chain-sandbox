require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

// La aplicación legítima carga las credenciales en el process.env al arrancar.
// En el sandbox, estas son los "honeytokens" que el malware intentará leer.
const dbPassword = process.env.DB_PASSWORD;
const awsKey = process.env.AWS_ACCESS_KEY_ID;
const npmToken = process.env.NPM_TOKEN;

console.log("[INFO] Inicializando servicio de backend...");

// Validación estándar de variables de entorno (Fail-fast)
if (!dbPassword || !awsKey || !npmToken) {
    console.warn("[WARN] Faltan variables de entorno críticas. Los servicios externos podrían fallar.");
} else {
    console.log("[INFO] Configuración de entorno cargada correctamente en memoria.");
}

// Endpoint de health-check (estándar de la industria para monitorización)
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'UP',
        message: 'Aplicación de pruebas operativa',
        timestamp: new Date().toISOString()
    });
});

app.listen(port, () => {
    console.log(`[INFO] Servidor escuchando en el puerto ${port}`);
});