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
    fetch(`http://localhost:3333/recuperarSenha`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({emailUser: email})
    })
    .then(res => {
      const modalImage= document.getElementById("modal-image");
      modal.style.display = "flex"
      if(res.status == 200){
        title.innerHTML = "Parabéns!"
        msg.innerHTML += `<p> Um email com mais informações foi envidado para ${email} </p>`
        modalImage.src = "../IMG/email.animation.gif"
      }
      else if(res.status == 404){
        title.innerHTML = "Email não encontrado"
        msg.innerHTML += `<p> O email ${email} não esta cadastrado no nosso sistema </p>`
        modalImage.src = "../IMG/interrogacao.png"
      }
      else if(res.status == 403){
        title.innerHTML = "Aguarde 5 minutos"
        msg.innerHTML += `<p>Um email já foi enviado para esse conta a menos de 5 minutos</p>`
        modalImage.src = "../IMG/relogio.png"
      }
      else {
        msg.innerHTML += `<p>Houve um erro tente novamente</p>`
        modalImage.src = "../IMG/erro.png"
      }

    })
  }
}

document.addEventListener("click", function (event) {
  const modalBox = document.getElementById("modal");
  const clicadoFora = modalBox.contains(event.target);
  if (clicadoFora) {
    modal.style.display = "none";
  }
});