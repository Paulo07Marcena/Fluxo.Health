// Variáveis globais:
let client_writing = true;
let nAnswer = 1;
let scrollHeight;
let answers = [];
let info_errada = false;

// Variáveis para o calculo de retorno financeiro
let clientName;
let nEnfermeiros;
let sEnfermeiros;
let nTecnicos;
let sTecnicos;
let nCadeiras;
let totalSalarialAtual;
let totalSalarialFuturo;
let nEnfermeirosFluxo;
let nTecnicosFluxo;
let porcentualDeReducao;

// Comando para o scroll acompanhar a conversa:
scrollHeight = document.getElementById("content");
scrollHeight.scrollTop = content.scrollHeight;

// Função de animação quando o cliente estiver digitando
function writing() {
  // Variável para receber o texto que está no input do HTML
  let sizeText = ipt_answer.value;
  // Se o cliente estiver escrevendo e a condição de escrita for verdadeira, execute:
  if (sizeText.length >= 1 && client_writing == true && info_errada == false) {
    //Adicionar uma nova estrutura de mensagem
    document.getElementById("content").innerHTML += `
      <div class="chat chat-client chat-loading" id="chat_loading${nAnswer}" >
      <div class="msg msg-client" id="msg_client${nAnswer}">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      </div>
      <div class="div-img"><img src="./Img/client.png" alt="Client" id="img_client"></div>
      </div>
    `;

    // TROCANDO A CONDIÇÃO DE ESCRITA:
    client_writing = false;

    //Variavel para os erros:
    mensagem_passada = nAnswer + 1;
  }
  // Caso o usuário apagou tudo e a condição de escrita for falsa, execute:
  else if (sizeText.length == 0 && client_writing == false) {
    if (nAnswer == 1) {
      chat_loading1.remove();
    } else if (nAnswer == 2) {
      chat_loading2.remove();
    } else if (nAnswer == 3) {
      chat_loading3.remove();
    } else if (nAnswer == 4) {
      chat_loading4.remove();
    } else if (nAnswer == 5) {
      chat_loading5.remove();
    } else if (nAnswer == 6) {
      chat_loading6.remove();
    } else if (nAnswer == 7) {
      chat_loading7.remove();
    } else if (nAnswer == 8) {
      chat_loading8.remove();
    } else if (nAnswer == 9) {
      chat_loading9.remove();
    } else if (nAnswer == 10) {
      chat_loading10.remove();
    } else if (nAnswer == 11) {
      chat_loading11.remove();
    } else if (nAnswer == 12) {
      chat_loading12.remove();
    } else if (nAnswer == 13) {
      chat_loading13.remove();
    }

    // TROCANDO A CONDIÇÃO DE ESCRITA:
    client_writing = true;
  }

  //Comando para o scroll acompanhar a conversa:
  scrollHeight = document.getElementById("content");
  scrollHeight.scrollTop = content.scrollHeight;
}

// Enviar a mensagem ao apertar o botão (enter)
let input = document.getElementById("ipt_answer");
input.addEventListener("keydown", function (evento) {
  if (evento.key === "Enter") {
    send();
  }
});

// Função para quanddo o cliente apertar o botão de enviar ou apertar o enter
function send() {
  let answer = ipt_answer.value;
  client_writing = true;

  if (info_errada == false) {
    document.getElementById("content").innerHTML += `
    <div class="chat chat-robot" id="chat_robot${nAnswer}" >
    <div class="div-img"><img src="./Img/robo.png" alt="Robo FH"></div>
    <div class="msg" id="msg_robot${nAnswer}">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    </div>
    </div>
    `;
  }

  if (nAnswer == 1) {
    document.getElementById(
      `msg_client${nAnswer}`
    ).innerHTML = `Meu nome é ${answer}`;

    setTimeout(function () {
      msg_robot1.innerHTML = "";
    }, 1000);

    setTimeout(function () {
      document.getElementById(`msg_robot1`).innerHTML += `
        <p>Olá ${answer}, vamos iniciar sua simulação de retorno financeiro? 
        <br> Me informe o número de enfermeiros em cada sala de medicação do seu hospital.
        </p>
        `;
    }, 1000);

    answers[0] = `Nome: ${answer}`;
    clientName = answer;
  }

  if (nAnswer == 2) {
    if (!isNaN(answer)) {
      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `O número de enfermeiros em cada sala de medicação do meu hospital é de ${answer}`;

      setTimeout(function () {
        msg_robot2.innerHTML = "";
      }, 1000);

      setTimeout(function () {
        document.getElementById("msg_robot2").innerHTML = `
        <p> Ótimo! <br> Agora me informe o número de técnicos de enfermagem. </p> `;
      }, 1000);

      answers[1] = `Número de enfermeiros: ${answer}`;
      nEnfermeiros = answer;
      info_errada = false;
    } else {
      document.getElementById(`msg_client${nAnswer}`).innerHTML = `${answer}`;

      setTimeout(function () {
        msg_robot2.innerHTML = "";
      }, 1000);

      setTimeout(function () {
        document.getElementById("msg_robot2").innerHTML = `
        <p> Por favor! insira um número inteiro! (Ex: 1, 5, 10) </p> `;
      }, 1000);

      nAnswer = 1;
      info_errada = true;
    }
  }

  if (nAnswer == 3) {
    if (!isNaN(answer)) {
      setTimeout(function () {
        msg_robot3.innerHTML = "";
      }, 1000);

      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `O número de técnicos em enfermagem presente em cada sala de medicação do meu hospital é de ${answer}`;

      setTimeout(function () {
        document.getElementById("msg_robot3").innerHTML += `
        <p> Certo! <br> Informe o salário médio dos enfermeiros. </p> `;
      }, 1000);

      answers[2] = `Número de Técnicos de enfermagem: ${answer}`;
      nTecnicos = answer;
      info_errada = false;
    } else {
      document.getElementById(`msg_client${nAnswer}`).innerHTML = `${answer}`;

      setTimeout(function () {
        msg_robot3.innerHTML = "";
      }, 1000);

      setTimeout(function () {
        document.getElementById("msg_robot3").innerHTML = `
        <p> Por favor! insira um número inteiro! (Ex: 1, 5, 10) </p> `;
      }, 1000);

      nAnswer = 2;
      info_errada = true;
    }
  }

  if (nAnswer == 4) {
    if (!isNaN(answer)) {
      setTimeout(function () {
        msg_robot4.innerHTML = "";
      }, 1000);

      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `O sálario médio dos meus enfermeiros está em torno de R$${answer}`;

      setTimeout(function () {
        document.getElementById("msg_robot4").innerHTML += `
        <p> Anotado! <br> Informe agora o salário médio dos técnicos em enfermagem. </p> `;
      }, 1000);

      answers[3] = `Salário enfermeiros: R$${answer}`;
      sEnfermeiros = answer;
      info_errada = false;
    } else {
      document.getElementById(`msg_client${nAnswer}`).innerHTML = `${answer}`;

      setTimeout(function () {
        msg_robot4.innerHTML = "";
      }, 1000);

      setTimeout(function () {
        document.getElementById("msg_robot4").innerHTML = `
        <p> Por favor! insira um número inteiro! (Ex: 1500, 5000, 1000) </p> `;
      }, 1000);

      nAnswer = 3;
      info_errada = true;
    }
  }

  if (nAnswer == 5) {
    if (!isNaN(answer)) {
      setTimeout(function () {
        msg_robot5.innerHTML = "";
      }, 1000);

      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `O sálario médio dos meus técnicos em enfermeiros está em torno de R$${answer}`;

      setTimeout(function () {
        document.getElementById("msg_robot5").innerHTML += `
        <p> Já estamos quase acabando! <br> Por último, informe o número de cadeiras nas salas de medicação </p> `;
      }, 1000);

      answers[4] = `Salário técnicos em enfermagem: R$${answer}`;
      sTecnicos = answer;
      info_errada = false;
    } else {
      document.getElementById(`msg_client${nAnswer}`).innerHTML = `${answer}`;

      setTimeout(function () {
        msg_robot5.innerHTML = "";
      }, 1000);

      setTimeout(function () {
        document.getElementById("msg_robot5").innerHTML = `
        <p> Por favor! insira um número inteiro! (Ex: 1500, 5000, 1000) </p> `;
      }, 1000);

      nAnswer = 4;
      info_errada = true;
    }
  }

  if (nAnswer == 6) {
    if (!isNaN(answer)) {
      setTimeout(function () {
        msg_robot6.innerHTML = "";
      }, 1000);

      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `O número médio de cadeiras em cada sala de medicação é de ${answer} cadeiras `;

      setTimeout(function () {
        document.getElementById("msg_robot6").innerHTML += `
        <p> OK, para dar sequência a nossa simulação verifique se os dados estão corretos: <br><br>
        ${answers[1]} <br>
        ${answers[2]} <br>
        ${answers[3]} <br>
        ${answers[4]} <br>
        ${answers[5]} <br>
        <br><br>
        Se sim digite 1 (um), caso algo esteja errado digite 2(dois).
        </p> `;
      }, 1000);

      answers[5] = `Cadeiras: ${answer}`;
      nCadeiras = answer;
      info_errada = false;
    } else {
      document.getElementById(`msg_client${nAnswer}`).innerHTML = `${answer}`;

      setTimeout(function () {
        msg_robot6.innerHTML = "";
      }, 1000);

      setTimeout(function () {
        document.getElementById("msg_robot6").innerHTML = `
        <p> Por favor! insira um número inteiro! (Ex: 1, 5, 10) </p> `;
      }, 1000);

      nAnswer = 5;
      info_errada = true;
    }
  }

  if (nAnswer == 7) {
    msg_robot7.innerHTML = "";

    if (answer == 1) {
      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `As informações estão correta `;

      document.getElementById("msg_robot7").innerHTML = `
      <p> 
      Só um momento estamos realizando o seu calculo!
      </p> `;

      nAnswer = 8;
    } else if (answer == 2) {
      document.getElementById(
        `msg_client${nAnswer}`
      ).innerHTML = `As informações estão incorretas `;

      document.getElementById("msg_robot7").innerHTML = `
      <p> 
      Certo vamos reiniciar a simulação!
      </p> `;

      setTimeout(function () {
        content.innerHTML = "";
        nAnswer = 1;
        content.innerHTML += `
        
        <div class="chat chat-robot">
            <div class="div-img"><img src="./Img/robo.png" alt="Robo FH"></div>
            <div class="msg">
              <p>Olá seja bem vindo(a), para dar início a simulação infome o seu nome!</p>
            </div>
          </div>
        `;
      }, 3000);
    }
  }

  if (nAnswer == 8) {
    chat_robot7.remove();
    document.getElementById("content").innerHTML += `
    <div class="chat chat-robot" id="chat_robot${nAnswer}" >
    <div class="div-img"><img src="./Img/robo.png" alt="Robo FH"></div>
    <div class="msg" id="msg_robot${nAnswer}">
    <div class="cube"></div>
    <div class="cube"></div>
    <div class="cube"></div>
    </div>
    </div>
    `;
    nAnswer++;
  }

  if (nAnswer == 9) {
    calculation();
  }

  //Comando para o scroll acompanhar a conversa:
  scrollHeight = document.getElementById("content");
  scrollHeight.scrollTop = content.scrollHeight;
  nAnswer++;
  ipt_answer.value = "";
  console.log(answers);
}

function calculation() {
  //Comando para o scroll acompanhar a conversa:
  scrollHeight = document.getElementById("content");
  scrollHeight.scrollTop = content.scrollHeight;

  // Definindo o número de funcionários necessários de acordo com o número de cadeiras
  if (nCadeiras <= 4) {
    nEnfermeirosFluxo = 1;
    nTecnicosFluxo = 1;
  } else if (nCadeiras <= 8) {
    nEnfermeirosFluxo = 1;
    nTecnicosFluxo = 2;
  } else if (nCadeiras <= 12) {
    nEnfermeirosFluxo = 1;
    nTecnicosFluxo = 3;
  } else if (nCadeiras <= 16) {
    nEnfermeirosFluxo = 1;
    nTecnicosFluxo = 4;
  } else if (nCadeiras <= 20) {
    nEnfermeirosFluxo = 2;
    nTecnicosFluxo = 2;
  }

  // Gastos atuais do cliente:
  totalSalarialAtual = nEnfermeiros * sEnfermeiros + nTecnicos * sTecnicos;

  // Gastos do cliente com a Fluxo Health:
  totalSalarialFuturo =
    nEnfermeirosFluxo * sEnfermeiros + nTecnicosFluxo * sTecnicos;

  // Percentual de redução salarial:
  porcentualDeReducao = 100 - (totalSalarialFuturo * 100) / totalSalarialAtual;

  // Exibir duas mensagens seguidas, onde será apresentando os valores de redução para o cliente:
  if (nAnswer == 9) {
    setTimeout(function () {
      msg_robot8.innerHTML = "";
    }, 1000);

    setTimeout(function () {
      document.getElementById("msg_robot8").innerHTML += `
      <p> Parabéns ${clientName}, com a Fluxo Heath você terá uma redução salarial de até: <br> 
      <span class ="porcentagem">${porcentualDeReducao.toFixed(
        2
      )}%</span> </p> `;
    }, 1000);

    //Comando para o scroll acompanhar a conversa:
    scrollHeight = document.getElementById("content");
    scrollHeight.scrollTop = content.scrollHeight;

    nAnswer = 10;
  }

  if (nAnswer == 10) {
    setTimeout(function () {
      document.getElementById("content").innerHTML += `
      <div class="chat chat-robot" id="chat_robot${nAnswer}" >
      <div class="div-img"><img src="./Img/robo.png" alt="Robo FH"></div>
      <div class="msg" id="msg_robot${nAnswer}">
      <div class="cube"></div>
      <div class="cube"></div>
      <div class="cube"></div>
      </div>
      </div>
      `;
    }, 2000);

    var modeloMatematicoCaio =
      100 -
      ((nTecnicosFluxo + nEnfermeirosFluxo) * 100) /
        (Number(nEnfermeiros) + Number(nTecnicos));

    setTimeout(function () {
      document.getElementById("msg_robot12").innerHTML = `
        <p> Essa redução só é possivel, pois, com a ferramenta da Fluxo Health você estará reduzindo seus funcionarios da seguinte forma: <br><br>
        De ${nEnfermeiros} enfermeiros para ${nEnfermeirosFluxo} enfermeiros. <br>
        De ${nTecnicos} técnicos de enfermagem para ${nTecnicosFluxo} técnicos de enfermagem. <br>
        Para cada sala de medicação com ${nCadeiras} cadeiras.<br>
        Tendo assim uma redução de ${modeloMatematicoCaio.toFixed(
          2
        )}% na quantidade de pessoas na equipe.
        <br> <br>
        Totalizando um redução salarial por sala igual a: <br>
        <span class ="porcentagem"> R$
        ${(totalSalarialAtual - totalSalarialFuturo).toFixed(2)}
        </span><br>
        Gostou do seu futuro resultado com a Fluxo Health? Acesse a páginas de 
        <a  target="_blank" class="a-robo" href="./Contrate-nos.html"> 
        Contrate-nos </a> para ver os planos disponiveis
        </p>       
        `;
    }, 3000);

    //Comando para o scroll acompanhar a conversa:
    scrollHeight = document.getElementById("content");
    scrollHeight.scrollTop = content.scrollHeight;

    nAnswer++;
  }

  //Comando para o scroll acompanhar a conversa:
  scrollHeight = document.getElementById("content");
  scrollHeight.scrollTop = content.scrollHeight;
}
