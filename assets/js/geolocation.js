// =========================================
// GERENCIADOR DE GEOLOCALIZAÇÃO COM CACHE
// =========================================

const GEOLOCATION_STORAGE_KEY = 'rotas_bg_geolocation';
const GEOLOCATION_TIMESTAMP_KEY = 'rotas_bg_geolocation_timestamp';
const CACHE_DURATION = 60 * 60 * 1000; // 1 hora em ms

// Obter geolocalização com cache
function obterLocalizacaoComCache() {
    const localizacaoCacheada = localStorage.getItem(GEOLOCATION_STORAGE_KEY);
    const timestampCacheado = localStorage.getItem(GEOLOCATION_TIMESTAMP_KEY);
    const agora = Date.now();

    // Se tem no cache E o cache ainda é válido
    if (localizacaoCacheada && timestampCacheado) {
        const idadeCache = agora - parseInt(timestampCacheado);
        
        if (idadeCache < CACHE_DURATION) {
            console.log('✅ Usando localização do cache');
            const coords = JSON.parse(localizacaoCacheada);
            return Promise.resolve(coords);
        }
    }

    // Caso contrário, buscar do navegador
    console.log('🔄 Buscando nova localização...');
    return obterNovaLocalizacao();
}

// Obter nova localização do navegador
function obterNovaLocalizacao() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocalização não suportada'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coords = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    precisao: position.coords.accuracy
                };

                // Salvar no localStorage
                localStorage.setItem(GEOLOCATION_STORAGE_KEY, JSON.stringify(coords));
                localStorage.setItem(GEOLOCATION_TIMESTAMP_KEY, Date.now().toString());

                console.log('✅ Localização salva em cache:', coords);
                resolve(coords);
            },
            (error) => {
                console.warn('⚠️ Erro ao obter localização:', error.message);
                reject(error);
            },
            {
                enableHighAccuracy: false,
                timeout: 5000,
                maximumAge: 0
            }
        );
    });
}

// Limpar cache de geolocalização
function limparCacheLocalizacao() {
    localStorage.removeItem(GEOLOCATION_STORAGE_KEY);
    localStorage.removeItem(GEOLOCATION_TIMESTAMP_KEY);
    console.log('🗑️ Cache de localização limpo');
}

// Obter localização (usa cache se válido)
async function obterLocalizacao() {
    try {
        const coords = await obterLocalizacaoComCache();
        return coords;
    } catch (error) {
        console.error('Erro ao obter localização:', error);
        return null;
    }
}

// Informações do cache
function infoCache() {
    const loc = localStorage.getItem(GEOLOCATION_STORAGE_KEY);
    const timestamp = localStorage.getItem(GEOLOCATION_TIMESTAMP_KEY);
    
    if (!loc || !timestamp) {
        console.log('ℹ️ Cache vazio');
        return null;
    }

    const idadeMs = Date.now() - parseInt(timestamp);
    const idadeMin = Math.floor(idadeMs / 1000 / 60);
    
    console.log(`ℹ️ Cache salvo há ${idadeMin}min - Válido por mais ${Math.ceil((CACHE_DURATION - idadeMs) / 1000 / 60)}min`);
    return JSON.parse(loc);
}
