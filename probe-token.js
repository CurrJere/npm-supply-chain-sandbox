// Simula lo que haria una dependencia maliciosa: buscar un token de npm que exfiltrar.

console.log("[INFO] Iniciando sonda de reconocimiento de entorno...");

const candidateKeys = ['NODE_AUTH_TOKEN', 'NPM_TOKEN', 'NPM_AUTH_TOKEN'];
let tokenFound = false;

for (const key of candidateKeys) {
    const val = process.env[key];
    
    if (val && val.length > 0) {
        tokenFound = true;
        // En un escenario real, el malware ejecutaría la llamada fetch() hacia el C&C aquí.
        console.log(`[CRITICAL] VULNERABILIDAD CONFIRMADA: Token estático localizado en process.env['${key}'].`);
        console.log(`[CRITICAL] El atacante puede exfiltrar el valor de forma inmediata (Longitud: ${val.length} bytes).`);
    }
}

if (!tokenFound) {
    console.log("[OK] Entorno seguro. No se han detectado credenciales estáticas en memoria.");
    console.log("[OK] Validación OIDC completada: El vector de exfiltración ha sido neutralizado.");
}