function entrar() {
  var login = ipt_email.value;
  var senha = ipt_senha.value;
  var tem_erro = false;

  // Email da fluxo:
  // var emailFluxo = "fluxo.health@gmail.com";
  // var senhaFluxo = "fluxo123";

  ipt_email.style.border = "solid 2px #3781db";
  ipt_senha.style.border = "solid 2px #3781db";

  div_erro.innerHTML = ``;
  div_erro2.innerHTML = ``;

  if (login == "") {
    ipt_email.value = "";
    ipt_email.style = "border-color: red;";
    div_erro.innerHTML = `Campo Vazio.`;
    tem_erro = true;
  }
  if (!login.includes("@") && !login.includes(".com")) {
    ipt_email.value = "";
    ipt_email.style = "border-color: red;";
    div_erro.innerHTML = `Email incorreto.`;
    tem_erro = true;
  }

  if (senha == "") {
    ipt_senha.value = "";
    ipt_senha.style = "border-color: red";
    div_erro2.innerHTML = `Senha incorreta.`;
    tem_erro = true;
  }

  if (tem_erro != true) {
    div_erro.innerHTML = ``;
    div_erro2.innerHTML = ``;


    fetch("/usuarios/entrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        loginServer: login,
        senhaServer: senha
      })
    }).then(function (resultados) {
      console.log("resultados: ", resultados);

      if (resultados.ok) {
        resultados.json().then(

          dados => {
            console.log(dados)

            sessionStorage.nomeHosp = dados.nomeHosp
            sessionStorage.idHosp = dados.idHosp

            setTimeout(() => {

              window.location = "./dashboard/Salas.html"
            }, "1000")

          })

      } else {
        throw ("Houve um erro ao entrar!")
      }

    }).catch(function (resultados) {
      console.log(`ERRO: ${resultados}`)
    });

    return false

  }

}

