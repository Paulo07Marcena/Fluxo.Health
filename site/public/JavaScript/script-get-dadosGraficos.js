let idSessionSala
let idSessionHospital = 1

var pegarId = () => {
    var query = location.search.slice(1);
    var query = query.split('=')
    idSessionSala = Number(query[1])

    id_sala.innerHTML = `0${idSessionSala}`
    console.log('PEGOU O ID: ' + idSessionSala)
}

let graficoDonuts = document.getElementById('grafico_donuts')
let graficoDeLinha = document.getElementById("grafico_de_linha");

// Colocar dados ao carregar
let carregarDonuts = [2, 1]
let carregarLinha = [{
    dataDiaria: '05/01',
    contagem: 0
}]

let contagem

let dadosLotacao = []

let dadosKpi = [0, 0]

let poltronas

window.load = pegarId()
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

}, 2000)

// Atualizar gráficos
let atualizar2 = setInterval(() => {

    containerPoltrona.innerHTML = ''
    listarCadeiras(poltronas)
    plotarGraficoLotacao(dadosLotacao)
    contagemPoltronas(dadosLotacao)

}, 5000)

// Atualizar gráficos
let atualizar = setInterval(() => {

    buscarCadeirasEmUso(idSessionSala)
    buscarTotalCadeiras(idSessionSala)
    buscarLotacaoDiaria(idSessionSala)
    buscarCadeiras(idSessionSala)

}, 5000)



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

    if (dados.length == 0) {

        var dataAtual = new Date()
        var mesAtual = dataAtual.getMonth()
        var diaAtual = dataAtual.getDate()

        for (var d = 6; d > 0; d--) {
            labels.push(
                `${diaAtual - d}/0${mesAtual + 1}`
            )
            data.push(0)
        }


    } else if (dados.length < 6) {

        var ultimaData = dados[0].dataDiaria.split('/')
        var diaData = Number(ultimaData[0])

        for (var i = 3; i > 0; i--) {

            labels.push(
                `${diaData - i}/${ultimaData[1]}`
            )
            data.push(0)

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


function listarCadeiras(ocupadas) {

    contagem = dadosLotacao[0]

    const alerta = document.getElementById("contAlerta")
    alerta.innerHTML = ""
    for (var i = 0; i < contagem; i++) {
        if (i < ocupadas.length) {

            if (ocupadas[i].valor > 0) {

                poltronaMaluca.innerHTML +=
                    `
                <div class="contPoltrona">
                    <div class="poltrona">

                        <div class="divTemperatura">
                            <p>${Number(ocupadas[i].valor).toFixed(1)}°c</p>
                        </div>

                        <img src="../IMG/poltronaOcupada.png" />

                        <span>${ocupadas[i].nomePoltrona}</span>

                    </div>

                    <div class="showTermometro">
                        <img src="../IMG/termometro-amarelo.png" class="termometro">
                    </div>

                </div>
                `
                var showTermometro = document.getElementsByClassName('showTermometro')
                if (ocupadas[i].valor <= 35.5) {
                    showTermometro[i].innerHTML = '<img src="../IMG/termometro-roxo.png" class="termometro">'
                    AbrirAlerta(ocupadas[i].valor, "../IMG/termometro-roxo.png", ocupadas[i].nomePoltrona)
                } else if (ocupadas[i].valor >= 35.6 && ocupadas[i].valor <= 37.5) {
                    showTermometro[i].innerHTML = '<img src="../IMG/termometro-verde.png" class="termometro">'

                } else if (ocupadas[i].valor >= 37.6 && ocupadas[i].valor <= 38) {
                    showTermometro[i].innerHTML = '<img src="../IMG/termometro-amarelo.png" class="termometro">'
                    AbrirAlerta(ocupadas[i].valor, "../IMG/termometro-amarelo.png", ocupadas[i].nomePoltrona)
                } else if (ocupadas[i].valor >= 38.1 && ocupadas[i].valor <= 39.5) {
                    showTermometro[i].innerHTML = '<img src="../IMG/termometro-laranja.png" class="termometro">'
                    AbrirAlerta(ocupadas[i].valor, "../IMG/termometro-laranja.png", ocupadas[i].nomePoltrona)
                } else if (ocupadas[i].valor >= 39.6) {
                    showTermometro[i].innerHTML = '<img src="../IMG/termometro-vermelho.png" class="termometro">'
                    AbrirAlerta(ocupadas[i].valor, "../IMG/termometro-vermelho.png", ocupadas[i].nomePoltrona)
                }

            }


            else {

                poltronaMaluca.innerHTML +=
                    `
                <div class="contPoltrona">
                    <div class="poltrona">

                        <div class="divTemperatura">
                            <p>0.0°c</p>
                        </div>

                        <img src="../IMG/poltronaLivre.png" />

                        <span>${ocupadas[i].nomePoltrona}</span>

                    </div>

                    <div class="showTermometro">
                        <img src="../IMG/termometro-cinza.png" class="termometro">
                    </div>

                </div>
                `
            }


        }  else {

            poltronaMaluca.innerHTML +=
                `
            <div class="contPoltrona">
                <div class="poltrona">

                    <div class="divTemperatura">
                        <p>0.0°c</p>
                    </div>

                    <img src="../IMG/poltronaLivre.png" />

                    <span>Vazia</span>

                </div>

                <div class="showTermometro">
                    <img src="../IMG/termometro-cinza.png" class="termometro">
                </div>

            </div>
            `
        }

    }


    var semRegistro = 8 - contagem
    for (var i = 0; i < semRegistro; i++) {
        containerPoltrona.innerHTML +=
            `
        <div class="contPoltrona">
            <div class="poltrona">

                <img src="../IMG/poltronaNull.png" />

                <span>Sem registro</span>

            </div>

            <div class="showTermometro">
                <img src="../IMG/termometro-cinza.png" class="termometro">
            </div>

        </div>
       `
    }

}


// -=================================================\\


function contagemPoltronas(dadosLotacao) {

    var vazias = dadosLotacao[0] - dadosLotacao[1]
    var emUso = dadosLotacao[1]

    document.getElementById('poltronaLivre').innerHTML = vazias
    document.getElementById('poltronaOcupada').innerHTML = emUso

    console.log('Poltronas em uso: ' + emUso)

}
function AbrirAlerta(temperatura, termometro, poltrona) {
    const alerta = document.getElementById("contAlerta")
    alerta.innerHTML += `
        <div class="divAlerta" onclick="fecharAlerta(${alerta.children.length})">
            <img src="${termometro}">
            <p> Paciente da ${poltrona} está com ${Number(temperatura).toFixed(1)}°C</p>
            <button class="btnFecharAlerta">
            <img src="../IMG/Vector.png" alt="" />
            </button> 
        </div>
    `
}
function fecharAlerta(index) {
    const alerta = document.getElementById("contAlerta")
    alerta.removeChild(alerta.children[index])
}