var fileName = "./hole5.cnf"; // arquivo de entrada
/*
exports.solve = function(fileName) {
    let formula = readFormula(fileName)
    let result = doSolve(formula.clauses, formula.variables)
    return result

}*/

let x = doSolve(readFormula(fileName).clauses, readFormula(fileName).variables);
console.log(x);

function readFormula(fileName) {

    // Primeiro, vamos pegar o arquivo e ler seu conteúdo para, em seguida, transformá-lo num string utf-8.
    // https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array
    let fs = require("fs"); // http://nodebr.com/como-funciona-a-funcao-require-do-node-js/
    let entireText = fs.readFileSync(fileName);  // lê arquivos de forma sincronizada
    entireText = entireText.toString('utf-8');  // transforma o arquivo do buffer no formato uft-8

    console.log("\nO ARQUIVO " + fileName + " CONTÉM:\n");
    console.log(entireText);

    //console.log("\n INÍCIO DE READFORMULA:\n");

    // Divide o texto conforme as linhas de enter
    let entireTextLineByLine = entireText.split("\n");

    let variablesQuantity = 0; // armazenará a quantidade de variáveis descritas na linha p.
    let clausesQuantity = 0; // armazenará a quantidade de cláusulas descritas na linha p.
    let clausesContinuedString = ""; // armazenará um string concatenado de todas as cláusulas, consecutivamente.

    /*O loop abaixo lê o texto linha-a-linha, ignora os comentários (c), busca a quantidade de cláusulas e
    variáveis descrita na linha de problema (p) e concatena as cláusulas num só string.*/
    for (let i = 0; i < entireTextLineByLine.length; i++) {
        // o chartAt vai pegar a primeira letra (0), para que possamos analisá-la.
        let firstLetter = entireTextLineByLine[i].charAt(0);

        if (firstLetter == "c"){ /*ignore c*/

        } else if(firstLetter == "p") {
            // Se as linhas começam com "p", separo-as em elementos (usando o espaço) e as armazeno na variável temp.
            let temp = entireTextLineByLine[i].split(" ");
            // parseInt transforma o que estava sendo lido como string em um número inteiro.
            variablesQuantity = parseInt(temp[2], 10);
            clausesQuantity = parseInt(temp[3], 10);

        } else {
            // Concatenando tudo em um só string. Isto gera uma linha com todos os números (inclusive os 0).
            clausesContinuedString = clausesContinuedString.concat(" ", entireTextLineByLine[i]);
        };

    };


    let specOk = checkProblemSpecification(clausesContinuedString, clausesQuantity, variablesQuantity);
    // objetos de retorno do readFormula.
    let result = { 'clauses': [], 'variables': [] };

    if (specOk) {
        // Leitura da cláusula.
        let clauses = readClauses(clausesContinuedString);
        // Cria um array de falses, com uma quantidade de elementos igual ao número de variáveis.
        let variables = readVariables(variablesQuantity);

        // o objeto clauses dentro de result passa a ser igual a clauses. variables idem
        result.clauses = clauses;
        result.variables = variables;

    };

    //console.log("\nRESULTADO DE READFORMULA:\n");
    //console.log(result);

    //console.log("\nFINAL DO READFORMULA:\n");
    return result;

}

function doSolve(clauses, assignment) {

    /*Essa função recebe como entrada o array contendo a atribuição inicial de valores às variáveis da fórmula
    e outro array contendo as cláusulas.*/

    let isSat = false;

    if (clauses.length > 0){

        console.log("Procurando soluções satisfatíveis");

        /*Se a atribuição atual ainda não satisfaz a fórmula, continuo a testá-las (usando nextAssignment(assignment)).
        O contador sobe toda vez que a nextAssignment é chamada, cuja quantidade de vezes é igual a
        2ˆ(todas as combinações possíveis de atribuições de valor às variáveis), como descrito no while loop*/
        let assignmentsCounter = 1;
        while ((!isSat) && assignmentsCounter <= Math.pow(2, assignment.length)){

            // Um array contendo a resolução do "OU" entre os elementos das cláusulas.
            let clausesAssigned = [];

            // O j faz pular a cláusula, de um em um.
            for (let j = 0; j < clauses.length; j++){

                let clausesAnswer = false;

                // O i percorre os elementos dentro de uma cláusula, cláusula a cláusula.
                /*O "!clausesAnswer" é uma otimização, previnindo que o loop continue caso verifique-se que a resolução de
                uma cláusula é falso, pois quando chegar mais na frente para testar o "E", invariavelmente falharia.*/
                for (let i = 0; i < clauses[j].length && !clausesAnswer; i++){

                    let temp = clauses[j][i];

                    /*Se a variável for representada por um número negativo, multiplico por -1 (porque, inicialmente, o
                    sinal de - é apenas para denotar negação (numa versão anterior do programa, em que havia transformado
                    as variáveis em string, eu pedia para fazer um .charAt() na o primeiro caractere e, se encontrasse
                    um "-", dava parseInt e enfim multiplicava por (-1). É fácil entender por que mudei).*/
                    if(temp < 0){

                        temp = temp*(-1);
                        /*Se tiver o "-", é a negação, então negamos o valor atual. Como foi apontado pelo professor em
                        sala de aula, como o array em JS começa em 0, tenho que subtrair 1 para encontrar a atribuição
                        da variável que pareia com o número que representa a variável.*/
                        temp = !assignment[temp-1];

                    } else {

                        temp = assignment[temp-1];

                    }

                    // aqui é o "OU". Explico como funciona ali em baixo, na solução para o "E".
                    clausesAnswer = temp || clausesAnswer;

                };

                // Joga os resultados do "OU" para a clausesAssigned.
                clausesAssigned.push(clausesAnswer);

            };

            // A resposta para a resolução do "E" entre cláusulas.
            let answerToClauses = true;

            /* O i vai pulando de resolução em resolução dos elementos da clause e, caso encontre uma resposta para
            answerToClauses, cessa o loop. */
            for (let i = 0; i < clausesAssigned.length && answerToClauses; i++){

                /*Assim como no "OU", como precisamos apenas resolver de dois em dois, o resultado de uma instância de
                da cláusula e a próxima instância retroalimenta answerToClauses, até terminar a cláusula. A última alteração
                fica como a final.*/
                answerToClauses = clausesAssigned[i] && answerToClauses;

            }

            isSat = answerToClauses;

            // Se a resolução do "E" não for satisfatível, passamos para as próximas atribuições com a função nextAssignment.
            if (!isSat){

                assignment = nextAssignment(assignment);

            }

            assignmentsCounter++;

        }

    } else {

        console.log("Não há cláusulas válidas no arquivo " + fileName);

    };

    let result = {'isSat': isSat, 'satisfyingAssignment': null}

    // Caso seja satisfatível, devolve o objeto acima, que imprimirá "isSat" uma atribuição de valores que a satisfaz.
    if (isSat) {
        result.satisfyingAssignment = assignment;

    };


return result;



}

function checkProblemSpecification(text, clausesQuantity, variablesQuantity){

    //console.log("\n VERIFICANDO SE A LINHA DE PROBLEMA (p) ESTÁ CORRETA \n");

    /*ClausesSortedDescendant é o string contínuo de todas as cláusulas, com os sinais de menos/not (-) retirados,
    divididos por um espaco e ordenados de forma decrescente. Assim, o primeiro elemento corresponde ao número mais
    alto e, consequentemente, ao número de variáveis.*/
    let clausesSortedDescendant = text;
    clausesSortedDescendant = clausesSortedDescendant.replace(/-/g, ""); // procura onde tem "-" e troca por nada.
    clausesSortedDescendant = clausesSortedDescendant.split(" ");
    clausesSortedDescendant.sort(function(a, b){return b-a}); //https://www.w3schools.com/js/tryit.asp?filename=tryjs_array_sort_low

    let highestVariableNum = parseInt(clausesSortedDescendant[0], 10);

    // São o antigo string de cláusulas, agora partido a partir de cada elemento 0 (final de linha real).
    let splitClauses = text.split(" 0");
    /*Tem que dar o pop, porque quando dá-se split, o método considera que há mais um elemento depois do último 0.*/
    splitClauses.pop();

    let specOk = false;

    // Faz um teste para saber se as cláusulas/variáveis conferem com a descrição do problema.
    if (clausesQuantity == splitClauses.length){
        //console.log("A quantidade de cláusulas confere com a descrição");
        // Caso as cláusulas confiram, faz um teste para saber se as variáveis conferem com a descricao do problema (p).
        if (variablesQuantity == highestVariableNum){
            //console.log("A quantidade de variáveis confere com a descrição");
            specOk = true;
        } else {
            //console.log("A quantidade de variáveis NÃO confere com a descrição");
            specOk = false;
        };

    } else {
        //console.log("A quantidade de cláusulas NÃO confere com a descrição");
        specOk = false;
    };

        return specOk;

}

function readClauses (clausesContinuedString){

    // console.log("\nSEPARANDO AS CLÁUSULAS EM ARRAYS \n");

    // Antigo string de cláusulas agora partido a partir de cada elemento 0 (final de linha real).
    let splitClauses = clausesContinuedString.split(" 0");
    /* Tem que dar o pop (tirar o último elemento), porque quando dá split, o método considera que há mais um
    elemento depois do último zero.*/
    splitClauses.pop();

    // Vai receber as cláusulas já separadas, com suas variáveis dentro dela (um array de arrays).
    let clauses = [];

    /*Pega as cláusulas separadas (um array de strings) e dá um split onde há espacos,
    criando um array de arrays-das-variáveis (que também são strings) dentro desta cláusula.*/
    for (let i = 0; i < splitClauses.length; i++) {
        let variablesInClausesTemp = splitClauses[i].split(" ");

        let variablesInClauses = [];

        /*Procura elementos vazios no array, ignora-os e dá push somente nos que têm valor para variablesInClauses, que,
        subsequentemente, dá push em clauses.*/
        for (let j = 0; j < variablesInClausesTemp.length; j++){

            // Se a variável não for vazia, transforma o string em inteiros decimais e insere nas variáveis da cláusula.
            if (variablesInClausesTemp[j] != ""){
                variablesInClauses.push(parseInt(variablesInClausesTemp[j], 10));
            };

        };

        // Insere o array de variáveis da cláusula em clauses.
        clauses.push(variablesInClauses);
    };

    return clauses;

}

function readVariables(variablesQuantity){
    
    // Leitura das variáveis.
    let variablesOfFalses = [];

    for (let i = 0; i < variablesQuantity; i++){

        // aqui, estou mandando valores "false" para o array acima.
        variablesOfFalses.push(false);

    };

    return variablesOfFalses;

}

function nextAssignment(currentAssignment) {

    let newAssignment = currentAssignment;

    // O último elemento da array == false?
    if(newAssignment[newAssignment.length-1] == false){
        // Então, vira true.
        newAssignment[newAssignment.length-1] = true;

        // Se não,
    } else {

        // Pegamos o currentAssignment e colocamos esse valor noutra variável.
        let inceptionAssignment = currentAssignment;

        // Se o length desta array for maior que 1, tiramos o último elemento.
        if(inceptionAssignment.length > 1){
            inceptionAssignment.pop();

            /* Chamamos a funcão com o novo array. Se o primeiro for false de novo, convertemos para true e empurramos
            um "false" para o fim do array*/
            newAssignment = nextAssignment(inceptionAssignment);
            newAssignment.push(false);

        /* Se formos dando .pop até ficar apenas um true, transformamo-no em false e damos .push de falses cada vez que
        a funcão é devolvida. Temos novamente um array só de falses*/
        } else {
            newAssignment[0] = false;
        };

    };

    return newAssignment;

}


/*
const sat = require ('./sat_final.js')
console.log(sat_final.solve(fileName))
*/

/*
// Tempo
solving = solve(fileName);
console.time(solving);
console.timeEnd(solving);
*/
