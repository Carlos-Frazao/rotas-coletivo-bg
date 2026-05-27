// Gerenciador de Paradas de Ônibus
// Este arquivo contém as funções para exibir as paradas no mapa com ícones PNG personalizados

let paradasVisiveis = false;
let paradasLayer = null;

// Inicializar o layer de paradas APÓS o mapa estar carregado
function inicializarParadas() {
    paradasLayer = L.layerGroup();
}

// Criar ícone personalizado a partir do PNG
function criarIconeParada() {
    return L.icon({
        iconUrl: 'pontos/icone/ponteiro-de-parada-de-onibus.png',
        iconSize: [40, 50],
        iconAnchor: [20, 50],
        popupAnchor: [0, -50],
        shadowUrl: null
    });
}

// Função para mostrar as paradas no mapa
function mostrarParadas() {
    if (!paradasLayer) inicializarParadas();
    
    paradasLayer.clearLayers();
    
    const listaParadas = Array.isArray(window.paradasDeOnibus) ? window.paradasDeOnibus : [];

    if (listaParadas.length === 0) {
        alert('Nenhuma parada de ônibus foi cadastrada.');
        return;
    }

    listaParadas.forEach(parada => {
        const icone = criarIconeParada();
        
        L.marker(parada.coords, { icon: icone })
            .addTo(paradasLayer)
            .bindPopup(`
                <div class="popup-parada">
                    <strong>🚏 ${parada.nome}</strong><br>
                    <span>${parada.descricao}</span><br><br>
                    <strong>Rotas:</strong><br>
                    ${parada.rotas.join(', ')}<br><br>
                    <strong>Funcionamento:</strong><br>
                    ${parada.horarioFuncionamento}
                </div>
            `, {
                maxWidth: 280
            });
    });

    paradasLayer.addTo(map);
    paradasVisiveis = true;
}

// Função para esconder as paradas
function esconderParadas() {
    if (paradasLayer) {
        paradasLayer.remove();
    }
    paradasVisiveis = false;
}

// Função para alternar a visibilidade das paradas
function alternarParadas() {
    if (paradasVisiveis) {
        esconderParadas();
    } else {
        mostrarParadas();
    }
}

