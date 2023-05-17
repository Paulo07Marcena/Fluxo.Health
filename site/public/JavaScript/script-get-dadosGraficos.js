let graficoDonuts = document.getElementById('grafico_donuts')
let carregar = [10, 5]
window.load = plotarGraficoLotacao(carregar)

setInterval(buscarTotalCadeiras(4), 2000)
setInterval(buscarCadeirasEmUso(4), 2000)

let dadosLotacao = []

function buscarTotalCadeiras(idSala) {
    fetch(`/chartPoltrona/totalCadeiras/${idSala}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos - Total: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                dadosLotacao.push(resposta[0].qtdeTotalSala)
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API - Total');
        }

    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Função responsável por pegar
function buscarCadeirasEmUso(idSala) {
    fetch(`/chartPoltrona/cadeirasEmUso/${idSala}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos - Uso: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                dadosLotacao.push(resposta[0].qtde)
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API - Vazias');
        }

    })
    .catch(function (error) {
        console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
    });

}

setInterval(()=>{
    if(dadosLotacao.length > 0){
        plotarGraficoLotacao(dadosLotacao)
    }
}, 10000)


// Contruindo o gráfico de LOTÇÃO
function plotarGraficoLotacao(dadosSala){

    let totalCadeiras = dadosSala[0]
    let cadeirasOcupadas = dadosSala[1]
    let porcCadeirasVazias = ((totalCadeiras - cadeirasOcupadas) / totalCadeiras) * 100
    let porcCadeirasOcupadas = (cadeirasOcupadas * 100) / totalCadeiras

    let dados = {
        datasets: [
            {
                data: [porcCadeirasOcupadas, porcCadeirasVazias],
                backgroundColor: ["#011526", "#188CED"],
            },
        ],

        labels: ["Ocupada", "Livre"],
    };

    let opcoes = {
        cutoutPercentage: 40,
    };

    let meuDonutChart = new Chart(graficoDonuts, {
        type: "doughnut",
        data: dados,
        options: opcoes,
    });
    
}
