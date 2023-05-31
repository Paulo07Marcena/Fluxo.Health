function cadastrar() {
  // Criando váriaveis:
  let erro = false;
  let nome = ipt_nome.value;
  let login = ipt_email.value;
  let senha = ipt_senha.value;
  let cep = ipt_cep.value;
  let numero = ipt_numero.value;
  let cnpj = ipt_cnpj.value
  let plano = 0

  // Definindo o span com o display none "Escondendo o span":
  span_hospital.style.display = "none";
  span_email.style.display = "none";
  span_cnpj.style.display = "none";
  span_senha.style.display = "none";
  span_local.style.display = "none";
  span_local.style.position = "none";


  // Definindo a cor das bordas dos inputs
  ipt_nome.style.border = "solid 2px #3781db";
  ipt_email.style.border = "solid 2px #3781db";
  ipt_senha.style.border = "solid 2px #3781db";
  ipt_cep.style.border = "solid 2px #3781db";
  ipt_numero.style.border = "solid 2px #3781db";

  // Limpando:
  msg.innerHTML = "";

  // Testes de validações:


  if (Premium.checked) {
    plano = 2
  }

  if (basico.checked) {
    plano = 1
  }
  // Nome:
  if (nome == "") {
    erro = true;
    span_hospital.style.display = "block";
    span_hospital.style.position = "relative";
    ipt_nome.style.border = "solid 2px #ff0000";
  }

  // Email:
  if (!login.includes("@") || !login.includes(".com")) {
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

  if (!cep.includes("-") || cep.indexOf("-") != 5 || numero.length == 0) {
    erro = true;
    span_local.style.display = "block";
    span_local.style.position = "relative";
    ipt_cep.style.border = "solid 2px #ff0000";
    ipt_numero.style.border = "solid 2px #ff0000";
  }

  if(cnpj.length > 14 || cnpj == ''){
    erro = true;
    span_cnpj.style.display = "block";
    span_cnpj.style.position = "relative";
    ipt_cnpj.style.border = "solid 2px #ff0000";
  }

  if (erro == false) {
    modal.style.display = "flex";
    // Armazenando os dados fornecidos:
    let dados = {
      nome: nome,
      cep: cep,
      numero: numero,
      cnpj: cnpj,
      login: login,
      senha: senha,
      plano: plano,
    };

    msg.innerHTML += `
    <h3> ${dados.nome} seja muito bem vindo(a) a Fluxo Health! <h3>
    <br>
    <p> Um email com mais informações foi envidado para ${dados.login} </p>
    `;

    let modalBox = document.getElementById("modal");

    document.addEventListener("click", function (event) {
      var clicadoFora = modalBox.contains(event.target);
      if (clicadoFora) {
        modal.style.display = "none";
      }

      ipt_nome.value = "";
      ipt_cep.value = "";
      ipt_numero.value = "";
      ipt_email.value = "";
      ipt_senha.value = "";
      ipt_cnpj.value = "";
    });
    

    fetch("/usuarios/cadastrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        // crie um atributo que recebe o valor recuperado aqui
        // Agora vá para o arquivo routes/usuario.js
        nomeHospServer: nome,
        cepServer: cep,
        numServer: numero,
        cnpjServer: cnpj,
        loginServer: login,
        senhaServer: senha,
        planoServer: plano,
      })
    }).then(function (resposta) {

      console.log("resposta: ", resposta);

      if (resposta.ok) {
       
        modal.style = 'display: none'
        msg.style = 'display: none'

        setTimeout(() => {
          window.location = "Login.html";
        }, "2000")

      } else {
        throw ("Houve um erro ao tentar realizar o cadastro!");
      }
    }).catch(function (resposta) {
      console.log(`#ERRO: ${resposta}`);
    });

    return false;

  }

}
