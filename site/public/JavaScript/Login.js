function enviar() {
  var email = ipt_email.value;
  var senha = ipt_senha.value;
  var tem_erro = true;

  // Email da fluxo:
  var emailFluxo = "fluxo.health@gmail.com";
  var senhaFluxo = "fluxo123";

  ipt_email.style.border = "solid 2px #3781db";
  ipt_senha.style.border = "solid 2px #3781db";

  div_erro.innerHTML = ``;
  div_erro2.innerHTML = ``;

  if (email == "") {
    ipt_email.value = "";
    ipt_email.style = "border-color: red;";
    div_erro.innerHTML = `Campo Vazio.`;
    tem_erro = true;
  }
  if (!email.includes("@") && !email.includes(".com")) {
    ipt_email.value = "";
    ipt_email.style = "border-color: red;";
    div_erro.innerHTML = `Email incorreto.`;
    tem_erro = true;
  }

  if (senha == "" || senha != senhaFluxo) {
    ipt_senha.value = "";
    ipt_senha.style = "border-color: red";
    div_erro2.innerHTML = `Senha incorreta.`;
    tem_erro = true;
  }

  if (tem_erro != true) {
    div_erro.innerHTML = ``;
    div_erro2.innerHTML = ``;
  }

  if (email == emailFluxo && senha == senhaFluxo) {
    window.location.href = "./Salas.html";
  }
}
