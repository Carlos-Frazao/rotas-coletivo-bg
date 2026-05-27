// =========================================
// GERENCIADOR DE MODAIS
// =========================================

document.addEventListener('DOMContentLoaded', function() {
    const fecharBtn = document.getElementById('fechar-modal');
    const voltarBtn = document.getElementById('voltar-modal');

    if (fecharBtn) {
        fecharBtn.addEventListener('click', voltarParaPaginaPrincipal);
    }

    if (voltarBtn) {
        voltarBtn.addEventListener('click', voltarParaPaginaPrincipal);
    }

    // Fechar ao pressionar ESC
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            voltarParaPaginaPrincipal();
        }
    });
});

function voltarParaPaginaPrincipal() {
    // Voltar para a página anterior (index.html)
    window.history.back();
}

// Função auxiliar para abrir uma página modal
function abrirModal(url) {
    window.location.href = url;
}
