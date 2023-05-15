function info(card) {
  msg.innerHTML = "";
  if (card == "basico") {
    modal.style.display = "flex";

    msg.innerHTML += `
  <h1>  Plano básico! </h1>
  <br>
  <p> O plano básico da Fluxo Health é um plano recomendado para hospitais de médio porte que 
   oferece aos usuários acesso completo à plataforma web, permitindo que eles desfrutem de todos os
    recursos e funcionalidades disponíveis.</p>
  <br><br> 
  <h3>Beneficios</h3>
  <ul>
     <li> Acesso total a plataforma </li>
     <li> Gráficos ao vivo </li>
  </ul>
  <br><br>
  <h3>Restrições</h3>
  <ul>
     <li> Atualizações em 1° mão </li>
     <li> Manutenções trimestrais </li>
  </ul>
  `;

    let modalBox = document.getElementById("modal");

    document.addEventListener("click", function (event) {
      var clicadoFora = modalBox.contains(event.target);
      if (clicadoFora) {
        modal.style.display = "none";
      }
    });
  }

  if (card == "premium") {
    modal.style.display = "flex";

    msg.innerHTML += `
  <h1>  Plano premium! </h1>
  <br>
  <p> O plano premium da Fluxo Health é um plano recomendado para hospitais de grande porte que 
   oferece aos usuários acesso completo à plataforma web, permitindo que eles desfrutem de todos os
    recursos e funcionalidades disponíveis, além das atualizações em primeira mão e manutenções trimestrais.</p>
  <br><br> 
  <h3>Beneficios</h3>
  <ul>
  <li> Gráficos ao vivo </li>
  <li> Atualizações em 1° mão </li>
  <li> Manutenções trimestrais </li>
  <li> Acesso total a plataforma </li>
  </ul>
  `;

    let modalBox = document.getElementById("modal");

    document.addEventListener("click", function (event) {
      var clicadoFora = modalBox.contains(event.target);
      if (clicadoFora) {
        modal.style.display = "none";
      }
    });
  }
}
