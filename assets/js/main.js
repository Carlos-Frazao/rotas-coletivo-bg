// inicia o mapa
var map = L.map('map').setView([-15.891592075822096, -52.261878286117124], 14);

// Adicionar camada do OpenStreetMap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,
    minZoom: 14,
    attribution: '&copy; OpenStreetMap'
}).addTo(map);


// ================================================ //
// funcao que carrega outros .js atraves do main.js //
// ================================================ //
function carregarScript(src, callback) {
    var script = document.createElement('script');
    script.src = src;
    script.onload = callback || function () { };
    document.body.appendChild(script);
}
carregarScript('assets/js/leaflet-routing-machine.js', function () {
    carregarScript('assets/js/localizacao.js');
    ;carregarScript('pontos/pontos-interesse.js');
});
// ================================================ //


// variaveis pra armazenar as rotas //
let controleRota = null;

let routeLayer = null;
let pontosLayer = L.layerGroup().addTo(map);
let pontosVisiveis = false;
// ================================ //


// ================================ //
//         localizacao real         //
// ================================ //
function tracarRotaPara(destinoLatLng) {
    if (!minhaLocalizacao) {
        alert("Aguardando a deteção da sua localização atual...");
        return;
    }

    // Se já existir uma rota na tela, removemos para criar a nova
    if (controleRota) {
        map.removeControl(controleRota);
    }

    // Cria a rota a partir da sua localização até o marcador que foi clicado
    controleRota = L.Routing.control({
        waypoints: [
            minhaLocalizacao, // Origem fixa: Onde você está
            destinoLatLng     // Destino: O marcador clicado
        ],
        lineOptions: {
            styles: [{ color: '#008cff', weight: 4 }] // Cor diferenciada para a rota
        },
        language: 'pt-BR',
        createMarker: function () { return null; } // Opcional: Oculta os marcadores "A" e "B" extras do plugin para não duplicar os que já criamos
    }).addTo(map);
}

// =========================================
// LÓGICA DO MENU DE TRÊS PONTOS
// =========================================

const btnMenu = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const linkPontos = document.getElementById('link-pontos');


function abrirMenu() {
    menuLateral.classList.add('ativo');
    menuLateral.setAttribute('aria-hidden', 'false');
    btnMenu.setAttribute('aria-expanded', 'true');
}

function fecharMenu() {
    menuLateral.classList.remove('ativo');
    menuLateral.setAttribute('aria-hidden', 'true');
    btnMenu.setAttribute('aria-expanded', 'false');
}

btnMenu.addEventListener('click', function() {
    if (menuLateral.classList.contains('ativo')) {
        fecharMenu();
        return;
    }

    abrirMenu();
});

btnFechar.addEventListener('click', fecharMenu);

linkPontos.addEventListener('click', function(event) {
    event.preventDefault();
    alternarPontosInteresse();
    fecharMenu();
});

linkParadas.addEventListener('click', function(event) {
    event.preventDefault();
    alternarParadas();
    fecharMenu();
});

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        fecharMenu();
    }
});
// ================================ //