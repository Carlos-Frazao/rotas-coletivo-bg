function criarIconePonto(ponto) {
    return L.divIcon({
        className: 'icone-ponto-interesse',
        html: `<span>${ponto.icone || '📍'}</span>`,
        iconSize: [55, 55],
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
        var marcador = L.marker(ponto.coords, { icon: criarIconePonto(ponto) })
            .addTo(pontosLayer)
            .bindPopup(`
                        <div class="popup-ponto">
                            <strong>${ponto.icone || '📍'} ${ponto.nome}</strong><br>
                            <span>${ponto.tipo || 'Ponto de interesse'}</span>
                        </div>
                    `);

        marcador.on('click', function(e) {
        tracarRotaPara(e.target.getLatLng());
    });

    return marcador;          
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

window.pontosInteresse = [
    { coords: [-15.885765838661039, -52.26668395656091], nome: "Terminal Central", icone: "🚌", tipo: "Terminal" },
    { coords: [-15.876554906616544, -52.224567929315334], nome: "Ponto 2", icone: "📍", tipo: "Parada" },
    { coords: [-15.874555473389727, -52.232127412648154], nome: "Ponto 3", icone: "📍", tipo: "Parada" },
    { coords: [-15.875878654179695, -52.23514470837077], nome: "Ponto 4", icone: "📍", tipo: "Parada" },
    { coords: [-15.876937769672292, -52.2367793197155], nome: "Ponto 5", icone: "📍", tipo: "Parada" },
    { coords: [-15.878073560277754, -52.23912404885899], nome: "Ponto 6", icone: "📍", tipo: "Parada" },
    { coords: [-15.882002783397061, -52.212888836554036], nome: "Ponto 7", icone: "📍", tipo: "Parada" },
    { coords: [-15.884622329823237, -52.247081957796404], nome: "Ponto 8", icone: "📍", tipo: "Parada" },
    { coords: [-15.886862209876508, -52.24775206919989], nome: "Ponto 9", icone: "📍", tipo: "Parada" },
    { coords: [-15.888813390521294, -52.25101377272993], nome: "Ponto 10", icone: "📍", tipo: "Parada" },
    { coords: [-15.888614252546521, -52.25283426799859], nome: "Ponto 11", icone: "📍", tipo: "Parada" },
    { coords: [-15.889599450147653, -52.25640693894587], nome: "Ponto 12", icone: "📍", tipo: "Parada" },
    { coords: [-15.890324166781609, -52.25860498082942], nome: "Ponto 13", icone: "📍", tipo: "Parada" },
    { coords: [-15.891370885894402, -52.2583277298752], nome: "Ponto 14", icone: "📍", tipo: "Parada" },
    { coords: [-15.891317119707779, -52.2597152734616], nome: "Ponto 15", icone: "📍", tipo: "Parada" },
    { coords: [-15.893138918027079, -52.26114572561775], nome: "Ponto 16", icone: "📍", tipo: "Parada" },
    { coords: [-15.891077014726465, -52.259656202443715], nome: "Ponto 17", icone: "📍", tipo: "Parada" },
    { coords: [-15.889883917109405, -52.256772879874], nome: "Ponto 18", icone: "📍", tipo: "Parada" },
    { coords: [-15.89488539753914, -52.26422705384809], nome: "Ponto 19", icone: "📍", tipo: "Parada" },
    { coords: [-15.884449377383106, -52.27242280679118], nome: "Ponto 20", icone: "📍", tipo: "Parada" },
    { coords: [-15.887304603765847, -52.268159817318484], nome: "Ponto 21", icone: "📍", tipo: "Parada" },
    { coords: [-15.882916556485734, -52.26437955887275], nome: "Ponto 22", icone: "📍", tipo: "Parada" },
    { coords: [-15.877682596247313, -52.26183818799017], nome: "Ponto 23", icone: "📍", tipo: "Parada" },
    { coords: [-15.891668444694401, -52.256110323036545], nome: "Ponto 24", icone: "📍", tipo: "Parada" },
    { coords: [-15.878186352382198, -52.29458620406999], nome: "Ponto 25", icone: "📍", tipo: "Parada" },
    { coords: [-15.888373837132598, -52.25697256440109], nome: "Ponto 26", icone: "📍", tipo: "Parada" },
    { coords: [-15.888223324489882, -52.25788893747948], nome: "Ponto 27", icone: "📍", tipo: "Parada" },
    { coords: [-15.891319438997984, -52.262452092920846], nome: "Ponto 28", icone: "📍", tipo: "Parada" },
    { coords: [-15.889864600051894, -52.26403558422892], nome: "Ponto 29", icone: "📍", tipo: "Parada" },
    { coords: [-15.880674509943901, -52.22756198496789], nome: "Ponto 30", icone: "📍", tipo: "Parada" },
    { coords: [-15.876593516876948, -52.23201933884033], nome: "Ponto 31", icone: "📍", tipo: "Parada" },
    { coords: [-15.877951879150242, -52.231886834749], nome: "Ponto 32", icone: "📍", tipo: "Parada" },
    { coords: [-15.880279992441125, -52.23183883092783], nome: "Ponto 33", icone: "📍", tipo: "Parada" },
    { coords: [-15.88223201956372, -52.23168880322551], nome: "Ponto 34", icone: "📍", tipo: "Parada" },
    { coords: [-15.893271233730909, -52.33112462312541], nome: "Ponto 35", icone: "📍", tipo: "Parada" },
    { coords: [-15.893383469082655, -52.33340487639753], nome: "Ponto 36", icone: "📍", tipo: "Parada" },
    { coords: [-15.894932097899574, -52.333151987314075], nome: "Ponto 37", icone: "📍", tipo: "Parada" },
    { coords: [-15.895306465173746, -52.33135531821834], nome: "Ponto 38", icone: "📍", tipo: "Parada" },
    { coords: [-15.87846811611358, -52.28709870638164], nome: "Ponto 39", icone: "📍", tipo: "Parada" },
    { coords: [-15.878241346896402, -52.3017450992273], nome: "Ponto 40", icone: "📍", tipo: "Parada" },
    { coords: [-15.880598465759567, -52.24190625442078], nome: "Ponto 41", icone: "📍", tipo: "Parada" },
    { coords: [-15.881554224572927, -52.24118174922814], nome: "Ponto 42", icone: "📍", tipo: "Parada" },
    { coords: [-15.892400569990146, -52.2624881083946], nome: "Ponto 43", icone: "📍", tipo: "Parada" },
    { coords: [-15.875057197194023, -52.26576645146297], nome: "Ponto 44", icone: "📍", tipo: "Parada" }
];