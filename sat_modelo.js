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

    let fs = require("fs"); // http://nodebr.com/como-funciona-a-funcao-require-do-node-js/

    /* https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array */
    let texto;
    texto = fs.readFileSync(fileName);  /* lê arquivos de forma sincronizada */
//console.log(texto);
    texto = texto.toString('utf-8');  /* transforma o arquivo do buffer no formato uft-8 */

    console.log(texto);

    let textoPorLinha = texto.split("\n");  /* divide o texto conforme as linhas */

//console.log(textoPorLinha.length);

    var qtdVariaveis = 0;
    var qtdClausulas = 0;
    var clausesTemp = "";

    console.log("\n Inicio do calculo \n");
    for (let i = 0; i < textoPorLinha.length; i++) {
        // o slice vai pegar a primeira letra, para que possamos analisá-la.
        var primeiraLetra = textoPorLinha[i].slice(0,1);

        if(primeiraLetra == "c"){ /*ignore c*/

            //console.log("comentario ignorado");

        } else if(primeiraLetra == "p") {
            // estou pegando as linhas que começam com "p".
            // se elas começam com "p", separo-as em elementos (uso o espaço entre elas para isso)
            // e armazeno-as na variável temp.
            let temp = textoPorLinha[i].split(" ");
            // parseInt transforma o 2 que estava sendo lido como string em um número inteiro.
            // E aqui, guardamos essas informações nas variáveis.
            // o número 10 depois de parseInt significa que é no sistema decimal.
            qtdVariaveis = parseInt(temp[2], 10);
            qtdClausulas = parseInt(temp[3], 10);
            //console.log(temp);

        } else {
            //o que fiz aqui? Concatenei os elementos da equação textual em uma só linha de texto,
            //ou seja, em uma só string. Essa informação, com a igualdade, foi para jogar a informação lá em cima.
            //isto gera uma linha só, textual, com todos os números (inclusive o 0. Vamos agora dar split, e talvez slice,
            //para separar em elementos de array. Lembrar que .push vai jogando elementos numa array (enquanto vão crescendo em função de i).
            clausesTemp = clausesTemp.concat(" ", textoPorLinha[i]);
        };


    };

    let clausesTest = clausesTemp;
    clausesTest = clausesTest.replace(/-/g, "");
    clausesTest = clausesTest.split(" ");
    clausesTest.sort(function(a, b){return b-a}); //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_low

    console.log(clausesTest);

    clausesTemp = clausesTemp.split(" 0") // o espaço " "
    clausesTemp.pop();
    console.log(clausesTemp);

//https://www.w3schools.com/js/js_comparisons.asp
    var clauses = [];
    for (let i = 0; i < clausesTemp.length; i++) {
        let temp = clausesTemp[i].split(" ");
        //temp.shift();
        //temp.slice(0,1);

        //é um loop que procura elementos vazios no array, ignora-os e dá push somente nos que têm valor para temp2 que,
        // subsequentemente, dá push em clauses.
        let temp2 = [];
        for (let j = 0; j < temp.length; j++){
            if (temp[j] != ""){
                temp2.push(temp[j]);
            };

        }
        clauses.push(temp2);
        //console.log(temp2);
    };

    var variables = [];

    for (let k = 0; k < qtdVariaveis; k++){
        variables.push(false); // aqui, estou mandando valores para a array chamada variables.
    };

//teste pra verificar se a quantidade de cláusulas...

    let specOk = false;

    if (qtdClausulas == clausesTemp.length){
        console.log("A quantidade de cláusulas confere com a descrição")

        if (qtdVariaveis == parseInt(clausesTest[0], 10)){
            console.log("A quantidade de variáveis confere com a descrição")

        } else {
            console.log("A quantidade de variáveis NÃO confere com a descrição")
        };

    } else {
        console.log("A quantidade de cláusulas NÃO confere com a descrição")
    };


    console.log(clauses[0][0]); // uma array dentro de outra array. Aqui estou vendo as variáveis dentro das cláusulas
    console.log(variables);
    console.log(clauses);

    console.log("final do programa");


}

/* RESOLVENDO PROBLEMAS SATisfativeis
  * André Valença
  * Introducão à Computação
  * Professor Fernando Castor
  *
  * */


var fileName = "./hole6.cnf"; // nome do arquivo de entrada

readFormula(fileName);