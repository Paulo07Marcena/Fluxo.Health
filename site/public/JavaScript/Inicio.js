function LIMPAR() {
  var nome = INPT1.value;
  var telefone = INPT2.value;
  var email = INPT3.value;
  var mensagem = INPT4.value;
  var tem_erro = "não";

  INPT1.style.border = "solid 2px #3781db";
  INPT2.style.border = "solid 2px #3781db";
  INPT3.style.border = "solid 2px #3781db";
  INPT4.style.border = "solid 2px #3781db";

  div_email.innerHTML = "";
  div_mensagem.innerHTML = "";
  div_nome.innerHTML = "";
  div_telefone.innerHTML = "";

  if (nome == "") {
    INPT1.value = "";
    INPT1.style = "border-color: red;";
    div_nome.innerHTML = `Campo Vazio.`;
    tem_erro = "sim";
  }

  if (telefone == "") {
    INPT2.value = ""
    INPT2.style = "border-color:red"
    div_telefone.innerHTML = `Campo Vazio.`
    tem_erro = "sim"
  }

  if (isNaN(telefone)) {
    INPT2.value = "";
    INPT2.style = "border-color: red;";
    div_telefone.innerHTML = `Informe corretamente o número.`;
    tem_erro = "sim";
  }

  if (!email.includes("@") && !email.includes(".")) {
    INPT3.value = "";
    INPT3.style = "border-color: red;";
    div_email.innerHTML = `Informe corretamente o email.`;
    tem_erro = "sim";
  }

  if (email == "") {
    INPT3.value = "";
    INPT3.style = "border-color: red;";
    div_email.innerHTML = `Campo Vazio.`;
    tem_erro = "sim";
  }

  if (mensagem == "") {
    INPT4.value = "";
    INPT4.style = "border-color: red";
    div_mensagem.innerHTML = `Campo Vazio.`;
    tem_erro = "sim";
  }

  if (tem_erro != "sim") {
    div_nome.innerHTML = "";
    div_telefone.innerHTML = "";
    div_email.innerHTML = "";
    div_mensagem.innerHTML = "";
  }
}
