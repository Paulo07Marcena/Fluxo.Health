function cadastrar() {
  // Criando váriaveis:
  let erro = false;
  let nome = ipt_nome.value;
  let telefone = ipt_telefone.value;
  let email = ipt_email.value;
  let senha = ipt_senha.value;
  let hospital = ipt_hospital.value;
  let cep = ipt_cep.value;
  let numero = ipt_numero.value;

  // Definindo o span com o display none "Escondendo o span":
  span_nome.style.display = "none";
  span_email.style.display = "none";
  span_telefone.style.display = "none";
  span_senha.style.display = "none";
  span_hospital.style.display = "none";

  // Definindo a cor das bordas dos inputs
  ipt_telefone.style.border = "solid 2px #3781db";
  ipt_nome.style.border = "solid 2px #3781db";
  ipt_email.style.border = "solid 2px #3781db";
  ipt_senha.style.border = "solid 2px #3781db";
  ipt_hospital.style.border = "solid 2px #3781db";

  // Limpando:
  msg.innerHTML = "";

  // Testes de validações:

  // Nome:
  if (nome == "") {
    erro = true;
    span_nome.style.display = "block";
    span_nome.style.position = "relative";
    ipt_nome.style.border = "solid 2px #ff0000";
  }

  // Hospital:
  if (hospital == "") {
    erro = true;
    span_hospital.style.display = "block";
    span_hospital.style.position = "relative";
    ipt_hospital.style.border = "solid 2px #ff0000";
  }

  // Telefone:
  if (isNaN(telefone) || telefone == "") {
    erro = true;
    span_telefone.style.display = "block";
    span_telefone.style.position = "relative";
    ipt_telefone.style.border = "solid 2px #ff0000";
  }

  // Email:
  if (!email.includes("@") || !email.includes(".com")) {
    erro = true;
    span_email.style.position = "relative";
    span_email.style.display = "block";
    ipt_email.style.border = "solid 2px #ff0000";
  }

  // Senha:
  if (senha.length < 8) {
    erro = true;
    span_senha.style.display = "block";
    span_senha.style.position = "relative";
    ipt_senha.style.border = "solid 2px #ff0000";
  }

  if(!cep.includes("-") || cep.indexOf("-") != 5  || numero.length == 0){
    erro = true;
    span_local.style.display = "block";
    span_local.style.position = "relative";
    ipt_cep.style.border = "solid 2px #ff0000";
    ipt_numero.style.border = "solid 2px #ff0000";
  }

  if (erro == false) {
    modal.style.display = "flex";
    // Armazenando os dados fornecidos:
    let dados = {
      nome: nome,
      telefone: telefone,
      email: email,
      senha: senha,
    };

    msg.innerHTML += `
    <h3> ${dados.nome} seja muito bem vindo(a) a Fluxo Health! <h3>
    <br>
    <p> Um email com mais informações foi envidado para ${dados.email} </p>
    `;

    let modalBox = document.getElementById("modal");

    document.addEventListener("click", function (event) {
      var clicadoFora = modalBox.contains(event.target);
      if (clicadoFora) {
        modal.style.display = "none";
      }

      ipt_nome.value = "";
      ipt_hospital.value = "";
      ipt_cep.value = "";
      ipt_numero.value = "";
      ipt_email.value = "";
      ipt_telefone.value = "";
      ipt_senha.value = "";
    });
  }
}
