// inicia o mapa com borda limite, para que o usuario não va alem de bg
// lembrando que precisa apenas de 2 pontos, que no caso vão ser as extremidades do mapa, o canto superior direito e o inferior esquerdo 

var limiteMapa = L.latLngBounds(
    [-15.921688802374888, -52.336126347434714], // canto inferior esquerdo
    [-15.847337478348539, -52.19212862753714]  // canto superior direito
);

var map = L.map('map', {
    center: [-15.891592075822096, -52.261878286117124],
    zoom: 15,
    minZoom: 10,
    maxZoom: 20,
    maxBounds: limiteMapa,
    maxBoundsViscosity: 1.0
});

// adiciona o mapa do openstreetmap
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
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
carregarScript('assets/motor/leaflet-routing-machine.js');
carregarScript('assets/js/localizacao.js');
carregarScript('pontos/pontos-interesse.js', function() {
    mostrarPontosInteresse();
});
carregarScript('secao/geolocation.js');
carregarScript('rotas/rotas.js');
carregarScript('assets/js/modal.js');

// variaveis pra armazenar as rotas //
let controleRota = null;

let routeLayer = null;
let pontosLayer = L.layerGroup().addTo(map);
let pontosVisiveis = false;

// ================================ //
//         localizacao real         //
// ================================ //
function tracarRotaPara(destinoLatLng) {
    if (!minhaLocalizacao) {
        alert("Aguardando a deteção da sua localização atual...");
        return;
    }

    // se ja tiver uma rota no mapa ele vai tirar
    if (controleRota) {
        map.removeControl(controleRota);
    }

    // cria uma rota a partir da sua localizacao usando o localizacao.js e o leaflet-routing-machine.js //
    controleRota = L.Routing.control({
        waypoints: [
            minhaLocalizacao, // onde voce ta, baseado no localizacao.js //
            destinoLatLng     // destino: marcador do pontos_interesse.js //
        ],
        lineOptions: {
            styles: [{ color: 'red', weight: 4 }] // cor da linha da rota, e a espessura // 
        },
        language: 'pt-BR',
        createMarker: function () { return null; } // para nao criar os marcadores padroes da rota //
    }).addTo(map);
}

// ========================================= //
//       LÓGICA DO MENU DE TRÊS PONTOS       //
// ========================================= //

const btnMenu = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const linkPontos = document.getElementById('link-pontos'); // esse quem faz os pontos aparecerem //

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

btnMenu.addEventListener('click', function () {
    if (menuLateral.classList.contains('ativo')) {
        fecharMenu();
        return;
    }

    abrirMenu();
});

btnFechar.addEventListener('click', fecharMenu);

linkPontos.addEventListener('click', function (event) {
    event.preventDefault();
    alternarPontosInteresse();
    fecharMenu();
});

document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        fecharMenu();
    }
});