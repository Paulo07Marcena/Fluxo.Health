let graficoDonuts = document.getElementById("grafico_donuts");

// --=| Conta referente aos dados do gráfico Donuts
let totalCadeiras = 20
let cadeirasOcupadas = 5
let porcCadeirasVazias = ((totalCadeiras - cadeirasOcupadas) / totalCadeiras) * 100
let porcCadeirasOcupadas = (cadeirasOcupadas * 100) / totalCadeiras

let dados = {
  datasets: [
    {
      data: [porcCadeirasOcupadas.toFixed(1), porcCadeirasVazias.toFixed(1)],
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

//

const graficoDeLinha = document.getElementById("grafico_de_linha");

let data = [35, 50, 45, 75, 40, 66];
let labels = ["17/04", "18/04", "19/04", "20/04", "21/04", "22/04"];

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
