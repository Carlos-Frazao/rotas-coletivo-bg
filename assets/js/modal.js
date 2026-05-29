// ========================================= //
//           gerenciador de modais           //
// ========================================= //

document.addEventListener('DOMContentLoaded', function() {
    const voltarBtn = document.getElementById('voltar-modal');

    if (voltarBtn) {
        voltarBtn.addEventListener('click', voltarParaPaginaPrincipal);
    }

});

function voltarParaPaginaPrincipal() {
    // volta pro index.html
    window.history.back();
}

// funcao generica pra abrir modais
function abrirModal(url) {
    window.location.href = url;
}
