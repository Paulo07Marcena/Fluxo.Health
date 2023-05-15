let dotSelected = 1;

const roomsInfo = [
  {
    nome: "Sala 1",
    assentosEmUso: 6,
    totalAssentos: 10,
  },
  {
    nome: "Sala 2",
    assentosEmUso: 4,
    totalAssentos: 10,
  },
  {
    nome: "Sala 3",
    assentosEmUso: 8,
    totalAssentos: 10,
  },
  {
    nome: "Sala 4",
    assentosEmUso: 1,
    totalAssentos: 10,
  },
  {
    nome: "Sala 5",
    assentosEmUso: 10,
    totalAssentos: 10,
  },
  {
    nome: "Sala 6",
    assentosEmUso: 10,
    totalAssentos: 10,
  },
  {
    nome: "Sala 7",
    assentosEmUso: 10,
    totalAssentos: 10,
  },
  {
    nome: "Sala 8",
    assentosEmUso: 10,
    totalAssentos: 10,
  },
];

loadRooms();

function loadRooms() {
  const rooms = document.getElementById("rooms");
  const dots = document.getElementById("dots");

  for (let i = 0; i < roomsInfo.length / 6; i++) {
    const capsule = document.createElement("div");
    capsule.setAttribute("class", "capsuleRoom");

    const param = i * 6 + 6 > roomsInfo.length ? roomsInfo.length : i * 6 + 6;
    for (let j = i * 6; j < param; j++) {
      const occupation =
        (roomsInfo[j].assentosEmUso / roomsInfo[j].totalAssentos) * 100;

      capsule.innerHTML += `
                <div class="room">
                    <p class="roomTitle">${roomsInfo[j].nome}</p>
                    <div class="roomCapacityArea">
                        <p>Lotação</p>
                        <div class="roomCapacity ${
                          occupation >= 80 ? "roomFull" : "roomEmpty"
                        }"> <a href="./Poltronas.html" class="link-sala"> ${occupation >= 80 ? "Cheia" : "Normal"} </a>
                        </div>
                    </div>
                </div>
            `;
    }

    rooms.appendChild(capsule);

    dots.innerHTML += `<button onclick="scrollRooms(${i})" id="dot${
      i + 1
    }" class="dot ${i == 0 ? "dotSelect" : ""}"></button>`;
  }
}

function scrollRooms(toScroll) {
  const rooms = document.getElementById("rooms");
  const dotToRemove = document.getElementById(`dot${dotSelected}`);
  const dotToAdd = document.getElementById(`dot${toScroll + 1}`);

  rooms.scrollTo(1250 * toScroll, 0);
  dotToRemove.classList.remove("dotSelect");
  dotToAdd.classList.add("dotSelect");

  dotSelected = toScroll + 1;
}

const ctx = document.getElementById("capacityRoomGraphic");

let labels = roomsInfo.map((item) => item.nome)
let data = roomsInfo.map((item) => Math.floor(Math.random() * (100 - 0)))

const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: labels,
    datasets: [
        {
        label: "Quantidade de Pessoas",
        data: data,
        borderWidth: 2,
        borderColor: "#3781DB",
        backgroundColor: "#3781DB8D" 
        
      }
    ],
  },
  options: {
    indexAxis: 'y',
    scales: {
      x: {
        min: 0,
        max: 100,
      },
      y: {
        min: 0,
        max: 100,
        beginAtZero: true,
      },
    },
    plugins: {
      legend: {
        display: false
      }
    }
  },
  
});

setInterval(() => {
  chart.data.datasets[0].data.forEach((element, index) => {
    chart.data.datasets[0].data[index] = Math.floor(Math.random() * (100 - 0))
  })

  chart.update();
}, 5000);