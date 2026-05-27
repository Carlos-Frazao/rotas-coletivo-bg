// =========================================
// EXEMPLO DE USO - GEOLOCALIZAÇÃO COM CACHE
// =========================================

// 1️⃣ USAR A LOCALIZAÇÃO (na primeira vez solicita permissão)
async function iniciarComLocalizacao() {
    const coords = await obterLocalizacao();
    
    if (coords) {
        console.log('Latitude:', coords.latitude);
        console.log('Longitude:', coords.coords.longitude);
        console.log('Precisão:', coords.precisao, 'metros');
        
        // Exemplo: centralizar mapa na localização do usuário
        // map.setView([coords.latitude, coords.longitude], 15);
    } else {
        console.log('Não foi possível obter a localização');
    }
}

// 2️⃣ VERIFICAR INFORMAÇÕES DO CACHE
function checarCache() {
    infoCache();
}

// 3️⃣ FORÇAR ATUALIZAR LOCALIZAÇÃO (limpa cache)
async function atualizarLocalizacao() {
    limparCacheLocalizacao();
    return await obterLocalizacao();
}

// 4️⃣ CHAMAR NA INICIALIZAÇÃO DO SITE (opcional)
// Descomente para usar:
// document.addEventListener('DOMContentLoaded', iniciarComLocalizacao);
