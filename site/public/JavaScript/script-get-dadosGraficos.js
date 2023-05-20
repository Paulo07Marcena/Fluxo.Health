let idSessionSala = 1
let idSessionHospital = 1



let graficoDonuts = document.getElementById('grafico_donuts')
let graficoDeLinha = document.getElementById("grafico_de_linha");

// Colocar dados ao carregar
let carregarDonuts = [2, 1]
let carregarLinha = [{
    dataDiaria: '01/01',
    contagem: 0
}]
let contagem
let dadosLotacao = []
let dadosKpi = [0, 0]
let poltronas

window.load = plotarGraficoLotacao(carregarDonuts)
window.load = plotarGraficoLinha(carregarLinha)
window.load = buscarCadeirasEmUso(idSessionSala)
window.load = buscarTotalCadeiras(idSessionSala)
window.load = buscarCadeiras(idSessionSala)
window.load = listarCadeiras(poltronas)
window.load = contagemPoltronas(dadosKpi)


setTimeout(() => {

    buscarCadeirasEmUso(idSessionSala)
    buscarTotalCadeiras(idSessionSala)
    buscarLotacaoDiaria(idSessionSala)
    buscarCadeiras(idSessionSala)

    containerPoltrona.innerHTML = ''
    listarCadeiras(poltronas)

    plotarGraficoLotacao(dadosLotacao) 
    contagemPoltronas(dadosLotacao)

}, 4000)

// Atualizar gráficos
let atualizar2 = setInterval(() => {

    containerPoltrona.innerHTML = ''
    listarCadeiras(poltronas)
    plotarGraficoLotacao(dadosLotacao) 
    contagemPoltronas(dadosLotacao)
    
}, 11000)


// Atualizar gráficos
let atualizar = setInterval(() => {

    buscarCadeirasEmUso(idSessionSala)
    buscarTotalCadeiras(idSessionSala)
    buscarLotacaoDiaria(idSessionSala)
    buscarCadeiras(idSessionSala)
    
}, 11000)



// -=-========================================================||


function buscarTotalCadeiras(idSala) {
    fetch(`/chartPoltrona/totalCadeiras/${idSala}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos - Total: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                dadosLotacao[0] = resposta[0].qtdeTotalSala
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

                dadosLotacao[1] = resposta[0].qtde
            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API - Vazias');
        }

    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Contruindo o gráfico de LOTÇÃO
function plotarGraficoLotacao(dadosSala) {

    console.log(dadosSala)

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

    meuDonutChart.update()
}


// -=================================================\\


function buscarLotacaoDiaria(idSala) {
    fetch(`/chartPoltrona/lotacaoDiaria/${idSala}`, { cache: 'no-store' }).then(function (response) {

        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos - CONTAGEM DIÁRIA: ${JSON.stringify(resposta)}`);

                plotarGraficoLinha(resposta)

            });

        } else {
            console.error('Nenhum dado encontrado ou erro na API - Vazias');
        }

    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

// Funcção para colocar o gráfico de linhas na tela
function plotarGraficoLinha(dados) {

    let data = [];
    let labels = [];

    if (dados.length < 6) {

        // Pegando os dois primeiros caracteres e tranformando em numéricos
        var ultimaData = dados[0].dataDiaria
        var diaData = Number(`${ultimaData[0]}${ultimaData[1]}`)

        for (var i = 3; i > 0; i--) {

            if (diaData < 10) {
                labels.push(
                    `0${diaData - i}/${ultimaData[3]}${ultimaData[4]}`
                )
                data.push(0)
            } else {
                labels.push(
                    `${diaData - i}/${ultimaData[3]}${ultimaData[4]}`
                )
                data.push(0)
            }

        }

        for (var i = 0; i < dados.length; i++) {
            labels.push(
                dados[i].dataDiaria
            )
            data.push(
                dados[i].contagem
            )
        }


    } else {

        for (var i = 0; i < dados.length; i++) {
            labels.push(
                dados[i].dataDiaria
            )
            data.push(
                dados[i].contagem
            )
        }


    }


    const chart = new Chart(graficoDeLinha, {
        type: "line",
        data: {
            labels: labels,
            datasets: [
                {
                    label: "Total de pessoas na sala durante o dia",
                    data: data,
                    borderWidth: 2,
                    tension: 0.4,
                    borderColor: "#188CED",
                    fill: true,
                },
            ],
        },
        options: {
            pointBorderColor: "#188CED",
            pointBackgroundColor: "#188CED",
            backgroundColor: "#188CED",
            scales: {
                x: {
                    min: 0,
                    max: 5,
                },
                y: {
                    max: 70,
                    min: 0,
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
                },
            },
        },
    });

    chart.update()

}


// -=================================================\\

let containerPoltrona = document.getElementById('poltronaMaluca')

function buscarCadeiras(idSala) {

    fetch(`/chartPoltrona/buscarCadeiras/${idSala}`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {

                console.log(`Dados recebidos ---- : ${JSON.stringify(resposta)}`);
                poltronas = resposta

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API - Vazias');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function listarCadeiras(a) {

 contagem = dadosLotacao[0]

    for (var i = 0; i < contagem; i++) {

        if (i < a.length) {

            containerPoltrona.innerHTML +=
                `
                <div class="poltrona">
                    <div class="divTemperatura">
                        <p>${a[i].valor}°c</p>
                    </div>
    
                    <img src="../IMG/poltronaOcupada.png"/>
    
                    <span>${a[i].nome}</span>
                </div>
                `

        } else {

            containerPoltrona.innerHTML +=
                `
                <div class="poltrona">
                    <div class="divTemperatura">
                        <p>0.0°c</p>
                    </div>
    
                    <img src="../IMG/poltronaLivre.png"/>
    
                    <span>Vazia</span>
                </div>
                `
        }

    }

    var teste = 8 - contagem
    for(var i = 0; i < teste; i++){
        console.log(teste)
       containerPoltrona.innerHTML +=
       `
       <div class="poltrona">
           <img src="../IMG/poltronaNull.png" />
           <span>Sem Registro</span>
       </div>
       `
   }




}


// -=================================================\\


function contagemPoltronas(dadosLotacao){

    var vazias = dadosLotacao[0] - dadosLotacao[1]
    var emUso = dadosLotacao [1]

    document.getElementById('poltronaLivre').innerHTML = vazias
    document.getElementById('poltronaOcupada').innerHTML = emUso

    console.log('aaa' + emUso)

}