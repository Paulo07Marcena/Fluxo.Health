var database = require("../database/config")

function listar() {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listar()");
    var instrucao = `
        SELECT * FROM Hospital;
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

function entrar(loginHosp, senhaHosp) {
    console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ", loginHosp, senhaHosp)
    var instrucao = `
        SELECT * FROM Hospital WHERE loginHosp = '${loginHosp}' AND senhaHosp = '${senhaHosp}';
    `;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

// Coloque os mesmos parâmetros aqui. Vá para a var instrucao
function cadastrar(nomeHosp, cepHosp , numHosp , cnpjHosp , loginHosp , senhaHosp , plano) {
    
    // Insira exatamente a query do banco aqui, lembrando da nomenclatura exata nos valores
    //  e na ordem de inserção dos dados.
    var instrucao = `
        INSERT INTO Hospital (nomeHosp , cepHosp , numHosp , cnpjHosp , loginHosp , senhaHosp , dataContratacao , fkplano) VALUES ('${nomeHosp}', '${cepHosp}' , '${numHosp}' , '${cnpjHosp}' , '${loginHosp}' , '${senhaHosp}' , now() , '${plano}')`;
    console.log("Executando a instrução SQL: \n" + instrucao);
    return database.executar(instrucao);
}

module.exports = {
    entrar,
    cadastrar,
    listar,
};

