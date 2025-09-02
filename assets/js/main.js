// Coordenadas aproximadas do centro de Barra do Garças, MT
var coordenadasCentro = [-15.8944, -52.2570];

// Cria o mapa e o centraliza em Barra do Garças com um nível de zoom de 13
var mapa = L.map('mapa').setView(coordenadasCentro, 13);

// Define os limites do mapa para que o usuário não consiga arrastar muito para longe
// As coordenadas definem um retângulo que limita a área de visualização.
var limiteSudoeste = [-15.95, -52.35]; 
var limiteNordeste = [-15.80, -52.15]; 
var limiteDoMapa = L.latLngBounds(limiteSudoeste, limiteNordeste);

mapa.setMaxBounds(limiteDoMapa);

// Adiciona a camada base do mapa do OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mapa);