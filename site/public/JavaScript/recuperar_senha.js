function enviar() {
  // Criando váriaveis:
  let erro = false;
  const email = ipt_email.value;

  // Definindo o span com o display none "Escondendo o span":
  span_email.style.display = "none";

  // Definindo a cor das bordas dos inputs
  ipt_email.style.border = "solid 2px #3781db";

  // Limpando:
  msg.innerHTML = "";

  // Teste de validações:

  // Email:
  if (!email.includes("@") || !email.includes(".com") || email == "") {
    erro = true;
    span_email.style.position = "relative";
    span_email.style.display = "block";
    ipt_email.style.border = "solid 2px #ff0000";
  }

  if (erro == false) {
    modal.style.display = "flex";
    
    fetch(`http://localhost:3333/recuperarSenha`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({emailUser: email})
    })

    msg.innerHTML += `
    <p> Um email com mais informações foi envidado para ${email} </p>
    `;

    let modalBox = document.getElementById("modal");

    document.addEventListener("click", function (event) {
      var clicadoFora = modalBox.contains(event.target);
      if (clicadoFora) {
        modal.style.display = "none";
      }

      ipt_email.value = "";
    });
  }
}
