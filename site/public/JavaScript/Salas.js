getData()

let dotSelected = 1;
let roomsInfo = []

async function infoSalas() {
  var salaFetch = await fetch("http://localhost:3333/salas/listar/1")
  var salasNovas = await salaFetch.json()
  return salasNovas
}

async function getData() {
  roomsInfo = (await infoSalas()).msg
  loadRooms();  
  UpdateGraphic()
}

function loadRooms() {
  console.log(roomsInfo)
  const rooms = document.getElementById("rooms");
  const dots = document.getElementById("dots");
 

  dots.innerHTML = ''
  rooms.innerHTML = ''

  for (let i = 0; i < roomsInfo.length / 6; i++) {
    const capsule = document.createElement("div");
    capsule.setAttribute("class", "capsuleRoom");

    const param = i * 6 + 6 > roomsInfo.length ? roomsInfo.length : i * 6 + 6;
    for (let j = i * 6; j < param; j++) {
      const occupation =
        (roomsInfo[j].totalPoltonasUso   >= roomsInfo[j].TotalPoltronas);

      capsule.innerHTML += `
                <div class="room">
                    <p class="roomTitle">${roomsInfo[j].nomeSala}</p>
                    <div class="roomCapacityArea">
                        <p>Lotação</p>
                        <a href="./Poltronas.html?id=${roomsInfo[j].idSala}" class="link-sala"> 
                          <div class="roomCapacity ${occupation ? "roomFull" : "roomEmpty"}">  ${occupation ? "Cheia" : "Normal"} 
                          </div> 
                        </a>
                    </div>
                </div>
            `;
    }

    rooms.appendChild(capsule);

    dots.innerHTML += `<button onclick="scrollRooms(${i})" id="dot${i + 1
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



const chart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: []  ,
    datasets: [
      {
        label: "Quantidade de Pessoas",
        data: [],
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
        max: 1,
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

  



function UpdateGraphic() {

let labels = roomsInfo.map((item) => item.nomeSala)
let data = roomsInfo.map((item) => item.totalPoltonasUso)
chart.data.datasets[0].data = data
chart.data.labels = labels
chart.update()

var MaiorInfo = roomsInfo[0].TotalPoltronas

  for (var i = 1; i < roomsInfo.length ; i++) {

    if (roomsInfo[i].TotalPoltonas > MaiorInfo) {
      MaiorInfo = roomsInfo[i].TotalPoltonas
    }
  }
  console.log(MaiorInfo)
  chart.options.scales.x.max = MaiorInfo

}

setInterval(() => {
 getData()

}, 5000);