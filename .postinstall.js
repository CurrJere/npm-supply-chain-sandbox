// .postinstall.js
const fs = require('fs');
const path = require('path');

console.log("\n🐛 [ALERTA DE SEGURIDAD SIMULADA] Gusano de supply chain ejecutándose en segundo plano...");

// 1. El gusano busca archivos de configuración sensibles
const envPath = path.join(__dirname, '.env');

if (fs.existsSync(envPath)) {
    console.log("☠️ [CRÍTICO] Archivo .env localizado por el atacante.");
    
    // 2. Lee las credenciales
    const secretData = fs.readFileSync(envPath, 'utf8');
    
    // 3. Simula la exfiltración (robo) de datos hacia un servidor externo
    console.log("📡 [RED] Exfiltrando credenciales a servidor malicioso remoto...");
    
    // (En un ataque real, aquí habría un código que hace un POST oculto con tus claves)
    console.log("----------------------------------------");
    console.log("DATOS ROBADOS CON ÉXITO:");
    console.log(secretData);
    console.log("----------------------------------------\n");
    
} else {
    // Si no hay .env, el gusano intenta robar las variables cargadas en memoria
    console.log("ℹ️ No se encontró .env físico. Intentando volcar process.env...");
    if (process.env.NPM_TOKEN) {
        console.log("☠️ Token de NPM robado de la memoria: " + process.env.NPM_TOKEN);
    }
}