// Dados da Rota 01 (Terminal -> Abel_Libro)
var rota1 = {
    nome: "Terminal - Abel_Libra",
    pontos: [
        [-15.885409798155381, -52.26663208796818], // Coordenadas do Terminal.
        [-15.8858, -52.2680],
        [-15.8862, -52.2705],
        [-15.8868, -52.2732],
        [-15.8875, -52.2760],
        [-15.8882, -52.2790],
        [-15.8888, -52.2820],
        [-15.8895, -52.2850],
        [-15.8900, -52.2880],
        [-15.8905, -52.2910],
        [-15.88143254882798, -52.2964542533495] // Coordenadas do Bairro Abel_Libro
        ],
            detalhes: "Esta rota conecta o Terminal Central ao bairro Abel Libro, passando pela Avenida Principal. Tempo médio de percurso: 25 minutos. Intervalo entre ônibus: 30 minutos."
        };
// Coordenadas de Barra do Garças - MT
        const barraDoGarcasCoords = [-15.8944, -52.2570];
        
        // Inicializar o mapa
        const map = L.map('map').setView(barraDoGarcasCoords, 13);
        
        // Adicionar camada do OpenStreetMap
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);
        
        // Adicionar controle de escala
        L.control.scale({metric: true, imperial: false}).addTo(map);
        
        // Inicializar paradas
        inicializarParadas();
        
        // Variáveis para armazenar a rota atual

        //let currentRoute = null;
        let currentRouteControl = null; // Vamos usar isso para guardar a rota

        let routeLayer = null;
        let pontosLayer = L.layerGroup().addTo(map);
        let pontosVisiveis = false;

        
        // Dados das rotas (com a rota1 do seu arquivo)
        const rotas = {
            rota1: rota1,
            rota2: {
                nome: "Centro → Vila Maria",
                pontos: [
                    [-15.89440, -52.25700], // Centro
                    [-15.89600, -52.25900],
                    [-15.89750, -52.26100],
                    [-15.89900, -52.26350],
                    [-15.90050, -52.26600],
                    [-15.90200, -52.26900],
                    [-15.90350, -52.27200],
                    [-15.90450, -52.27500],
                    [-15.90500, -52.27800],
                    [-15.90550, -52.28100]  // Vila Maria
                ],
                detalhes: "Rota que liga o Centro à Vila Maria, passando pelo Hospital Municipal e pela Escola Estadual. Tempo médio de percurso: 20 minutos. Intervalo entre ônibus: 40 minutos."
            },
            rota3: {
                nome: "Jardim Europa → Ponte Metálica",
                pontos: [
                    [-15.88000, -52.25000], // Jardim Europa
                    [-15.88200, -52.25100],
                    [-15.88400, -52.25200],
                    [-15.88600, -52.25300],
                    [-15.88800, -52.25400],
                    [-15.89000, -52.25500],
                    [-15.89200, -52.25550],
                    [-15.89400, -52.25600],
                    [-15.89600, -52.25650],
                    [-15.89800, -52.25700]  // Ponte Metálica
                ],
                detalhes: "Rota turística que conecta o Jardim Europa à Ponte Metálica sobre o Rio Araguaia. Passa por pontos comerciais e áreas residenciais. Tempo médio de percurso: 15 minutos. Intervalo entre ônibus: 1 hora."
            }
        };
        
        // Função para carregar a rota selecionada
        // Cole a nova função aqui
        function carregarRota() {
            const selecao = document.getElementById('routeSelector');
            const rotaId = selecao.value;

            if (!rotaId) {
                alert('Por favor, selecione uma rota.');
                return;
            }

            // Remover rota anterior se existir
            if (currentRouteControl) {
                map.removeControl(currentRouteControl);
                currentRouteControl = null;
            }

            // Obter dados da rota selecionada
            const currentRoute = rotas[rotaId];

            // Mapear os pontos para o formato L.latLng
            const waypoints = currentRoute.pontos.map(ponto => L.latLng(ponto[0], ponto[1]));

            // Criar a rota com o plugin de Roteamento
            currentRouteControl = L.Routing.control({
                waypoints: waypoints,

                // Define o serviço de roteamento (OSRM é gratuito)
                router: L.Routing.osrmv1({
                    serviceUrl: 'https://router.project-osrm.org/route/v1'
                }),

                // Estilo da linha (igual ao que você tinha)
                lineOptions: {
                    styles: [{color: '#3388ff', weight: 5, opacity: 0.7}]
                },

                addWaypoints: false, // Impede que o usuário adicione novos pontos
                routeWhileDragging: false, // Não recalcula ao arrastar
                show: true, // Mostra o painel com as direções

                // Tenta esconder os marcadores "Start" e "End"
                createMarker: function() { return null; }

            }).addTo(map);

            // Atualizar informações da rota
            document.getElementById('routeDetails').textContent = currentRoute.detalhes;
        }
        function criarIconePonto(ponto) {
            return L.divIcon({
                className: 'icone-ponto-interesse',
                html: `<span>${ponto.icone || '📍'}</span>`,
                iconSize: [34, 34],
                iconAnchor: [17, 34],
                popupAnchor: [0, -30]
            });
        }

        function mostrarPontosInteresse() {
            pontosLayer.clearLayers();
            const listaPontos = Array.isArray(window.pontosInteresse) ? window.pontosInteresse : [];

            if (listaPontos.length === 0) {
                alert('Nenhum ponto de interesse foi cadastrado ainda.');
                return;
            }

            listaPontos.forEach(ponto => {
                L.marker(ponto.coords, {icon: criarIconePonto(ponto)})
                    .addTo(pontosLayer)
                    .bindPopup(`
                        <div class="popup-ponto">
                            <strong>${ponto.icone || '📍'} ${ponto.nome}</strong><br>
                            <span>${ponto.tipo || 'Ponto de interesse'}</span>
                        </div>
                    `);
            });

            pontosVisiveis = true;
        }

        function esconderPontosInteresse() {
            pontosLayer.clearLayers();
            pontosVisiveis = false;
        }

        function alternarPontosInteresse() {
            if (pontosVisiveis) {
                esconderPontosInteresse();
                return;
            }

            mostrarPontosInteresse();
        }

// =========================================
// LÓGICA DO MENU DE TRÊS PONTOS
// =========================================

const btnMenu = document.getElementById('btn-menu');
const btnFechar = document.getElementById('btn-fechar');
const menuLateral = document.getElementById('menu-lateral');
const linkPontos = document.getElementById('link-pontos');
const linkParadas = document.getElementById('link-paradas');

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
