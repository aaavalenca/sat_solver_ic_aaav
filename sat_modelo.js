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
function nextAssignment(currentAssignment) {
  // implement here the code to produce the next assignment based on currentAssignment. 
  return newAssignment
}

function doSolve(clauses, assignment) {

/*    let isSat = false
  while ((!isSat) && /!* must check whether this is the last assignment or not*!/) {
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

    console.log("\n VERIFICANDO SE A LINHA DE PROBLEMA ESTÁ CORRETA \n");

    // ClausesSortedDescendant é o string contínuo de todas as cláusulas, com os sinais de menos/not (-) retirados, divididos por um
    // espaco e ordenados de forma decrescente. Assim, o primeiro elemento corresponde ao número mais alto e, consequentemente,
    // o número de variáveis.
    let clausesSortedDescendant = text;
    clausesSortedDescendant = clausesSortedDescendant.replace(/-/g, "");
    clausesSortedDescendant = clausesSortedDescendant.split(" ");
    clausesSortedDescendant.sort(function(a, b){return b-a}); //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_low
    //console.log(clausesTest);

    let highestVariableNum = parseInt(clausesSortedDescendant[0], 10);

    // Cláusulas divididas são o antigo string de cláusulas agora partido a partir de cada elemento 0 (final de linha real).
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

};


function readClauses (clausulasEmString){

    console.log("\n SEPARANDO AS CLÁUSULAS EM ARRAYS \n");

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

    console.log("\n CRIANDO UM ARRAY DE " + qtd + " falses \n");

    // Leitura das variáveis.
    let variablesFalsas = [];

    for (let i = 0; i < qtd; i++){
        variablesFalsas.push(false); // aqui, estou mandando valores "false" para a array chamada variablesFalsas.
    };

    return variablesFalsas;
}

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
    let clausesContinuedString = ""; // armazenará um string contínuo (concatenado) de todas as cláusulas, consecutivamente. É o antigo clausesTemp

    // Lê o texto linha-a-linha para ignorar as linhas de comentário (c) e para buscar a quantidade de cláusulas e
    // variáveis descrita na linha de problema (p) e concatena as cláusulas num só string.
    for (let i = 0; i < textoCompletoPorLinha.length; i++) {
        // o slice vai pegar a primeira letra, para que possamos analisá-la.
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
            //o que fiz aqui? Concatenei os elementos da equacaoTextual em uma só linha de texto,
            //ou seja, em uma só string. Essa informação, com a igualdade, foi para jogar a informação lá em cima.
            //isto gera uma linha só, textual, com todos os números (inclusive o 0. Vamos agora dar split, e talvez slice,
            //para separar em elementos de array. Lembrar que .push vai jogando elementos numa array (enquanto vão crescendo em função de i).
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

        // o objeto clauses dentro de results passa a ser igual a clauses
        result.clauses = clauses;
        result.variables = variables;
    }

    //console.log(clauses[0][0]); // uma array dentro de outra array. Aqui estou vendo as variáveis dentro das cláusulas
    console.log("\nO RESULTADO DE READFORMULA:\n");
    console.log(result);
//    console.log(clauses);


    console.log("\n FINAL DO READFORMULA");


    return result;

}



/* RESOLVENDO PROBLEMAS SATisfativeis
  * André Valença
  * Introducão à Computação
  * Professor Fernando Castor
  *
  * */


var fileName = "./tutorial.cnf"; // nome do arquivo de entrada

readFormula(fileName);