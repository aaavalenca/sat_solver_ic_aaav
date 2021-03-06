/**
 * This file should be placed at the node_modules sub-directory of the directory where you're 
 * executing it.
 * 
 * Written by Fernando Castor in November/2017. 
 */

/*exports.solve = function(fileName) {
  let formula = propsat.readFormula(fileName)
  let result = doSolve(formula.clauses, formula.variables)
    return result; // two fields: isSat and satisfyingAssignment
}*/

// Receives the current assignment and produces the next one


function readFormula(fileName) {

    /*
  // To read the file, it is possible to use the 'fs' module.
  // Use function readFileSync and not readFile.
  // First read the lines of text of the file and only afterward use the auxiliary functions.
  let text // = ...  //  an array containing lines of text extracted from the file.
  let clauses = readClauses(text)
  let variables = readVariables(clauses)

  // In the following line, text is passed as an argument so that the function
  // is able to extract the problem specification.
  let specOk = checkProblemSpecification(text, clauses, variables)

  let result = { 'clauses': [], 'variables': [] }
  if (specOk) {
    result.clauses = clauses
    result.variables = variables
  }
  return result
*/

    // Primeiro, vamos pegar o arquivo e ler seu conteúdo para, em seguida, transformá-lo num string utf-8.
    /* https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array */

    let fs = require("fs"); // http://nodebr.com/como-funciona-a-funcao-require-do-node-js/
    let textoCompleto = fs.readFileSync(fileName);  /* lê arquivos de forma sincronizada */
    textoCompleto = textoCompleto.toString('utf-8');  /* transforma o arquivo do buffer no formato uft-8 */

    console.log("O ARQUIVO " + fileName + " CONTÉM:\n");
    console.log(textoCompleto);

    console.log("\n INÍCIO DE READFORMULA \n");

    let textoCompletoPorLinha = textoCompleto.split("\n");  /* divide o texto conforme as linhas */

    let qtdVariaveis = 0; // armazenará a quantidade de variáveis descritas na linha p
    let qtdClausulas = 0; // armazenará a quantidade de cláusulas descritas na linha p
    let clausesContinuedString = ""; // armazenará um string contínuo (concatenado) de todas as cláusulas, consecutivamente.

    // Lê o texto linha-a-linha para ignorar as linhas de comentário (c) e para buscar a quantidade de cláusulas e
    // variáveis descrita na linha de problema (p) e concatena as cláusulas num só string.
    for (let i = 0; i < textoCompletoPorLinha.length; i++) {
        // o slice vai pegar a primeira letra (0,1), para que possamos analisá-la.
        let primeiraLetra = textoCompletoPorLinha[i].slice(0,1);

        if (primeiraLetra == "c"){ /*ignore c*/
            //console.log("comentario ignorado");

        } else if(primeiraLetra == "p") {
            // estou pegando as linhas que começam com "p".
            // se elas começam com "p", separo-as em elementos (uso o espaço entre elas para isso)
            // e armazeno-as na variável temp.
            let temp = textoCompletoPorLinha[i].split(" ");
            // parseInt transforma o que estava sendo lido como string em um número inteiro.
            // E aqui, guardamos essas informações nas variáveis.
            // o número 10 depois de parseInt significa que é no sistema decimal.
            qtdVariaveis = parseInt(temp[2], 10);
            qtdClausulas = parseInt(temp[3], 10);
            // LEMBRAR!!! HÁ A POSSIBILIDADE DE HAVER MAIS ESPACOS ENTRE OS ELEMENTOS DO QUE PREVISTO. ENTAO PRECISAMOS
            // FAZER UM LOOP PARA VARRER TODOS OS ESPACOS E TIRA-LOS, ASSIM COMO FIZEMOS UM POUCO MAIS ABAIXO, PARA AS CLAUSULAS

        } else {
            //o que fiz aqui? Concatenei os elementos da equacaoTextual em uma só linha de texto, ou seja, em um só string.
            //Isto gera uma linha só, textual, com todos os números (inclusive os 0). Vamos depois dar split
            //para separar em elementos de array.
            clausesContinuedString = clausesContinuedString.concat(" ", textoCompletoPorLinha[i]);
        };


    };


    let specOk = checkProblemSpecification(clausesContinuedString, qtdClausulas, qtdVariaveis);
    // objetos de retorno do readFormula.
    let result = { 'clauses': [], 'variables': [] };

    if (specOk) {
        // Leitura da cláusula.
        let clauses = readClauses(clausesContinuedString);
        // Cria um array de falses, com uma quantidade de elementos igual ao número de variáveis.
        let variables = readVariables(qtdVariaveis);

        // o objeto clauses dentro de result passa a ser igual a clauses. variables idem
        result.clauses = clauses;
        result.variables = variables;


    }


    console.log("\nRESULTADO DE READFORMULA:\n");
    console.log(result);

    console.log("\nFINAL DO READFORMULA");
    return result;

}



function doSolve(clauses, assignment) {

    //Essa função recebe como entrada o array contendo a atribuição inicial de valores às variáveis da fórmula
        //readFormula(fileName).variables
    //e outro array contendo as cláusulas.
        //readFormula(fileName).clauses


    let verifyingAssignments = assignment;
    let verifyingClauses = clauses;

    let isSat = false;

    // se esse elemento da clause transformado em texto começar com o sinal de -, multiplicamos clauses por -1,
    //pegamos o resultado e subtraímos 1. Isto vai dar a posição a que se refere o valor dessa variável.



    //console.log(answerToClauses);

    //nextAssignment(assignment);
    //return clausesAssigned;

    // 1) loop - while a fórmula não for satisfeita nem todas as atribuições
    // tiveram sido testadas, ela verifica se a atribuição atual satisfaz ou não a fórmula

    let contador = 1;

    while ((!isSat) && contador <= Math.pow(2, verifyingAssignments.length)){
        //continue testando
        // 2) se não satisfizer, pega a próxima atribuição de valores e tenta novamente. assignment = nextAssignment(assignment)
        let clausesAssigned = [];

        for (let j = 0; j < clauses.length; j++){

            let clausesAnswer = false;

            for (let i = 0; i < clauses[j].length && !clausesAnswer; i++){

                let temp = clauses[j][i];

                if(temp < 0){

                    temp = temp*(-1);
                    temp = !assignment[temp-1];

                } else {

                    temp = assignment[temp-1];

                }

                clausesAnswer = temp || clausesAnswer;

            };

            clausesAssigned.push(clausesAnswer);
        };

        let answerToClauses = true;

        for (let i = 0; i < clausesAssigned.length && answerToClauses; i++){

            answerToClauses = clausesAssigned[i] && answerToClauses;

        }

        isSat = answerToClauses;

        if (!isSat){

            assignment = nextAssignment(assignment);

        }

        contador++;

    }

    let result = {'isSat': isSat, 'satisfyingAssignment': null}

    if (isSat) {
        result.satisfyingAssignment = assignment;

    }

return result;


       //enquanto a formula nao for satisfeita (clausulas sao falsas e as atribuicoes possivels das variaveis nao forem testadas),continue procurando


    // 3) Seu resultado é um objeto com dois atributos,
        // (i) isSat, que guarda um valor booleano indicando se a fórmula foi ou não satisfeita
        // (ii) satisfyingAssignment, que guarda null se a fórmula não foi satisfeita ou
            // um array contendo a atribuição que a satisfaz, caso contrário.

/*    let isSat = false
  while ((!isSat) && /!* must check whether this is the last assignment or not*!/)
  ou seja, se chegou a Math.pow(2, currentAssignment.length)
  {
    // does this assignment satisfy the formula? If so, make isSat true. 

    // if not, get the next assignment and try again. 
    assignment = nextAssignment(assignment)
  }
  let result = {'isSat': isSat, satisfyingAssignment: null}
  if (isSat) {
    result.satisfyingAssignment = assignment
  }
  return result*/

}

function checkProblemSpecification(text, qtdClausulas, qtdVariaveis){

    console.log("\n VERIFICANDO SE A LINHA DE PROBLEMA (p) ESTÁ CORRETA \n");

    // ClausesSortedDescendant é o string contínuo de todas as cláusulas, com os sinais de menos/not (-) retirados, divididos por um
    // espaco e ordenados de forma decrescente. Assim, o primeiro elemento corresponde ao número mais alto e, consequentemente,
    // o número de variáveis.
    let clausesSortedDescendant = text;
    clausesSortedDescendant = clausesSortedDescendant.replace(/-/g, "");
    clausesSortedDescendant = clausesSortedDescendant.split(" ");
    clausesSortedDescendant.sort(function(a, b){return b-a}); //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_low
    //console.log(clausesTest);

    let highestVariableNum = parseInt(clausesSortedDescendant[0], 10);

    // clausesSeparadas são o antigo string de cláusulas agora partido a partir de cada elemento 0 (final de linha real).
    let clausesSeparadas = text.split(" 0");
    // Tem que dar o pop (tirar o último elemento), porque quando dá split,
    // o método considera que há mais um elemento depois do último zero.
    clausesSeparadas.pop();

    // Cria specOk, inicialmente com valor falso.
    let specOk = false;

    // Faz um teste para saber se as cláusulas conferem com a descricao do problema (p).
    if (qtdClausulas == clausesSeparadas.length){
        console.log("A quantidade de cláusulas confere com a descrição");
        // Caso as cláusulas confiram, faz um teste para saber se as variáveis conferem com a descricao do problema (p).
        if (qtdVariaveis == highestVariableNum){
            console.log("A quantidade de variáveis confere com a descrição");
            specOk = true;
        } else {
            console.log("A quantidade de variáveis NÃO confere com a descrição");
            specOk = false;
        };

    } else {
        console.log("A quantidade de cláusulas NÃO confere com a descrição");
        specOk = false;
    };

        return specOk;

}

function readClauses (clausulasEmString){

    console.log("\nSEPARANDO AS CLÁUSULAS EM ARRAYS \n");

    // Cláusulas divididas são o antigo string de cláusulas agora partido a partir de cada elemento 0 (final de linha real).
    let clausesSeparadas = clausulasEmString.split(" 0");
    // Tem que dar o pop (tirar o último elemento), porque quando dá split,
    // o método considera que há mais um elemento depois do último zero.
    clausesSeparadas.pop();
    //console.log(clausesDivididas);

    //https://www.w3schools.com/js/js_comparisons.asp
    // clauses vai receber as cláusulas já separadas, com suas variáveis dentro dela (array de arrays).
    let clauses = [];

    // Esse loop pega as cláusulas separadas (um array de strings) e dá um split onde há espacos,
    // criando um array de arrays das variáveis (que também são strings) dentro desta cláusula
    for (let i = 0; i < clausesSeparadas.length; i++) {
        let variablesDaClauseTemp = clausesSeparadas[i].split(" ");

        //é um loop que procura elementos vazios no array, ignora-os e dá push somente nos que têm valor para variablesDaClause que,
        // subsequentemente, dá push em clauses.
        let variablesDaClause = [];
        for (let j = 0; j < variablesDaClauseTemp.length; j++){

            // Se a variável não for vazia, transforma o string em inteiros decimais e insere nas variáveis da cláusula.
            if (variablesDaClauseTemp[j] != ""){
                variablesDaClause.push(parseInt(variablesDaClauseTemp[j], 10));
            };

        }

        // Insere o array de variáveis da cláusula em clauses
        clauses.push(variablesDaClause);
    };

    return clauses;

}

function readVariables(qtd){

    console.log("\nCRIANDO UM ARRAY DE " + qtd + " falses \n");

    // Leitura das variáveis.
    let variablesFalsas = [];

    for (let i = 0; i < qtd; i++){
        variablesFalsas.push(false); // aqui, estou mandando valores "false" para a array chamada variablesFalsas.
    };

    return variablesFalsas;

}

function nextAssignment(currentAssignment) {

    //console.log("INICIANDO NEXT ASSIGNMENT COM ARRAY DE " + currentAssignment.length + " ELEMENTOS");

    //1) Recebemos a array contendo as atribuições atuais (o false, false de variablesFalsas).
    let newAssignment = currentAssignment;

   // console.log("ESSE ARRAY 'E: ")
    //console.log(newAssignment);

    //2) O primeiro elemento dela é F?


    // se o último elemento da array (newAssignment.length-1),
    if(newAssignment[newAssignment.length-1] == false){
        //2.1) Sim. Então, vira T.
        newAssignment[newAssignment.length-1] = true;

        //console.log("último elemento desse array era false");

        // se não,
    } else{
        //console.log("último elemento desse array era true");
        //2.2) Não, é T.

        let inceptionAssignment = currentAssignment;

        if(inceptionAssignment.length >= 2){
            inceptionAssignment.pop();

            newAssignment = nextAssignment(inceptionAssignment);
            newAssignment.push(false);
        } else{
            newAssignment[0] = false;
        };

    };

    return newAssignment;


}

var d = new Date();
var nInicial = d.getTime();

var fileName = "./hole6.cnf"; // nome do arquivo de entrada

var resultado = readFormula(fileName);
//console.log(resultado);


//aqui, peguei o elemento variables do objeto result e transformei numa variável global chamada variablesFinal e vou jogar em nextAssignment
let variablesFinal = resultado.variables;
let clausesFinal = resultado.clauses;



if (resultado.clauses.length > 0){

    console.log("Procurando soluções satisfatíveis");
    var resultadoDoSolve = doSolve(clausesFinal, variablesFinal);
    console.log(resultadoDoSolve);

} else {

    console.log("Não há cláusulas válidas no arquivo " + fileName);

}

console.log(nInicial);
console.log(d.getTime());

var tempoexec = d.getTime() - nInicial;

console.log("Tempo decorrido " + tempoexec);

//console.log("As variaveis sao:")
//console.log(variablesFinal);
//nextAssignment(variablesFinal);
//console.log(nextAssignment(variablesFinal));


/*
function nextAssignment(currentAssignment) {

//O que são as possibilidades de V ou F para duas variáveis?
// São quatro possibilidades, ou seja, 2^2 E, também, a contagem de 0 a 3 em binários
// [00, 01, 10, 11], [FF, FV, VF, VV]. Só preciso agora que tenham os zeros na frente de 0 e 1,
// para que sempre tenha o mesmo número de casas. Essa função ajuda:
// https://stackoverflow.com/questions/2998784/how-to-output-integers-with-leading-zeros-in-javascript
// Deu erro, 32-bit.

    let newAssignment = [];

    for (let i = 0; i < Math.pow(2, currentAssignment.length); i++){

        newAssignment.push(pad(i.toString(2), currentAssignment.length));

        function pad(num, size) {
            let s = i.toString(2)+"";
            while (s.length < currentAssignment.length) s = "0" + s;
            return s;
        }

    }

    // fazer aqui um loop que faz a varredura, transformando false em verdadeiro quando possível
    // https://stackoverflow.com/questions/39734887/generating-all-possible-true-false-combinations (?)


    // implement here the code to produce the next assignment based on currentAssignment.
    return newAssignment;


}

nextAssignment(variablesFinal);
console.log(nextAssignment(variablesFinal));

 */