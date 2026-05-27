// ================================ //
//         localizacao real         //
// ================================ //

if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {

        // pega sua localizacao em coordenadas //
        minhaLocalizacao = L.latLng(position.coords.latitude, position.coords.longitude);

        // icone de cor vermelha, pra diferenciar do icone das rotas //
        var icone = new L.Icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
        });

        // vai criar um marcador aonde voce ta
        L.marker(minhaLocalizacao, {icon: icone}).addTo(map).bindPopup("<b>Sua localização</b>").openPopup();

    }, function (error) {
        alert("Não foi possível obter sua localização.");
    });
} 

// ================================ //