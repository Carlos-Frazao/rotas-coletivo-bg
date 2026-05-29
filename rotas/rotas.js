function carregarRota() {

    const rotaSelecionada =
        document.getElementById("routeSelector").value;

    const painelDescricao =
        document.getElementById("routeDetails");

    // Validação
    if (!rotaSelecionada || !rotasDefinidas[rotaSelecionada]) {

        alert("Selecione uma rota válida.");

        painelDescricao.innerHTML =
            "Selecione uma rota para ver detalhes.";

        return;
    }

    // Remove rota anterior
    if (controleRota) {
        map.removeControl(controleRota);
    }

    // Dados da rota
    const rota = rotasDefinidas[rotaSelecionada];

    // Atualiza painel
    painelDescricao.innerHTML = rota.descricao;

    // Cria nova rota
    controleRota = L.Routing.control({

        waypoints: [
            L.latLng(...rota.inicio),
            L.latLng(...rota.fim)
        ],

        lineOptions: {
            styles: [{
                color: "#ff0000",
                weight: 4
            }]
        },

        language: "pt-BR",

        show: false,

        createMarker: () => null

    }).addTo(map);
}

// cadastro de rotas
const rotasDefinidas = {
    rota1: {
        inicio: [-15.885765838661039, -52.26668395656091],
        fim: [-15.882002783397061, -52.212888836554036],
        descricao: `
            Saída do Terminal da Barra com destino ao Águas Quentes.
            Passa pelas principais avenidas comerciais, parra pelo BNH, morada do sol,
            e se o transito estiver bom, o tempo estimado é de 20 à 30 minutos.
        `
    },

    rota2: {
        inicio: [-15.891592, -52.261878],
        fim: [-15.894885, -52.264227],
        descricao: `
            <strong>Rota 2:</strong>
            Linha expressa ligando o Centro ao bairro Vila Maria.
            Atendimento de segunda a sábado com alta frequência nos horários de pico.
        `
    },

    rota3: {
        inicio: [-15.882916, -52.264379],
        fim: [-15.891317, -52.259715],
        descricao: `
            <strong>Rota 3:</strong>
            Trajeto que conecta o Jardim Europa à Ponte Metálica.
            Rota panorâmica que passa pela orla do rio interligando as regiões.
        `
    }
};