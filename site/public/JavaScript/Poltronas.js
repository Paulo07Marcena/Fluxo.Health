let totalCadeiras = 8;
let cadeirasOcupadas = 2;
let exibirGrafico = 1;

let graficoDonuts = document.getElementById("grafico_donuts");

// --=| Conta referente aos dados do gráfico Donuts
let porcCadeirasVazias =
  ((totalCadeiras - cadeirasOcupadas) / totalCadeiras) * 100;
let porcCadeirasOcupadas = (cadeirasOcupadas * 100) / totalCadeiras;

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

/* -- lm35Temperatura */
var contextoLm35Temperatura = document
  .getElementById("lm35Temperatura")
  .getContext("2d");
contextoLm35Temperatura.canvas.width = 1000;
contextoLm35Temperatura.canvas.height = 300;
var lm35Temperatura = new Chart(contextoLm35Temperatura, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Temperatura",
        type: "line",
        borderColor: ["#014792"],
        backgroundColor: ["#014792"],
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          distribution: "series",
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Temperatura",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    animation: {
      duration: 0,
    },
  },
});
/* -- chave */
var contextoChave = document.getElementById("chave").getContext("2d");
contextoChave.canvas.width = 1000;
contextoChave.canvas.height = 300;
var chave = new Chart(contextoChave, {
  type: "line",
  data: {
    datasets: [
      {
        label: "Chave",
        type: "line",
        borderColor: ["#014792"],
        backgroundColor: ["#014792"],
      },
    ],
  },
  options: {
    scales: {
      xAxes: [
        {
          distribution: "series",
          ticks: {
            beginAtZero: true,
          },
        },
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Chave",
          },
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
    animation: {
      duration: 0,
    },
  },
});

var paginacao = {};
var tempo = {};
function obterDados(grafico, endpoint) {
  var http = new XMLHttpRequest();
  http.open("GET", "http://localhost:8000/sensores/" + endpoint, false);
  http.send(null);
  var valores = JSON.parse(http.responseText);
  if (paginacao[endpoint] == null) {
    paginacao[endpoint] = 0;
  }
  if (tempo[endpoint] == null) {
    tempo[endpoint] = 0;
  }
  // Exibir à partir do último elemento exibido anteriormente
  var ultimaPaginacao = paginacao[endpoint];
  paginacao[endpoint] = valores.length;
  var valores = valores.slice(ultimaPaginacao);
  valores.forEach((valor) => {
    //Máximo de 60 itens exibidos no gráfico
    if (
      grafico.data.labels.length == 10 &&
      grafico.data.datasets[0].data.length == 10
    ) {
      grafico.data.labels.shift();
      grafico.data.datasets[0].data.shift();
    }
    grafico.data.labels.push(tempo[endpoint]++);
    grafico.data.datasets[0].data.push(parseFloat(valor));
    grafico.update();

    // Verificando se tem uma pessoa
    if (grafico === chave) {
      if (grafico.data.datasets[0].data[9] == 1) {
        poltrona01.innerHTML = `
        <div class="divTemperatura">
        <p id="temperatura01"></p>
        </div>
        <img src="../IMG/poltronaOcupada.png" />
        <span>Poltrona 01</span>
      </div>
      `;

        temperatura01.innerHTML = `
      ${lm35Temperatura.data.datasets[0].data[9]}°C
      `;

        poltronaLivre.innerHTML = 4;
        poltronaOcupada.innerHTML = 3;
        cadeirasOcupadas = 3;

        if (exibirGrafico == 1) {
          graficoDeDonutts();
          exibirGrafico = 2;
        }
      } else {
        poltrona01.innerHTML = `
        <div class="divTemperatura">
        <p id="temperatura01">0.00°C</p>
        </div>
        <img src="../IMG/poltronaLivre.png" />
        <span>Poltrona 01</span>
      </div>
      `;

        poltronaLivre.innerHTML = 5;
        poltronaOcupada.innerHTML = 2;
        cadeirasOcupadas = 2;
        if (exibirGrafico == 2) {
          graficoDeDonutts();
          exibirGrafico = 1;
        }
      }
    }
  });
}


setInterval(() => {
  obterDados(lm35Temperatura, "lm35/temperatura");
  obterDados(chave, "chave");
}, 3000);


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


function graficoDeDonutts() {
  // --=| Conta referente aos dados do gráfico Donuts
  porcCadeirasVazias =
    ((totalCadeiras - cadeirasOcupadas) / totalCadeiras) * 100;
  let porcCadeirasOcupadas = (cadeirasOcupadas * 100) / totalCadeiras;

  dados = {
    datasets: [
      {
        data: [porcCadeirasOcupadas.toFixed(1), porcCadeirasVazias.toFixed(1)],
        backgroundColor: ["#011526", "#188CED"],
      },
    ],

    labels: ["Ocupada", "Livre"],
  };

  opcoes = {
    cutoutPercentage: 40,
  };

  meuDonutChart = new Chart(graficoDonuts, {
    type: "doughnut",
    data: dados,
    options: opcoes,
  });
}
