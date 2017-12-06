/* RESOLVENDO PROBLEMAS SATisfativeis
  * André Valença
  * Introducão à Computação
  * Professor Fernando Castor
  *
  * */



var entrada = "./hole1.cnf"; // nome do arquivo de entrada

var fs = require("fs"); // http://nodebr.com/como-funciona-a-funcao-require-do-node-js/

/* https://stackoverflow.com/questions/34857458/reading-local-text-file-into-a-javascript-array */
var texto;
texto = fs.readFileSync(entrada);  /* lê arquivos de forma sincronizada */
//console.log(texto);
texto = texto.toString('utf-8');  /* transforma o arquivo do buffer no formato uft-8 */

console.log(texto);

var textoPorLinha = texto.split("\n");  /* divide o texto conforme as linhas */

//console.log(textoPorLinha.length);

var qtdVariaveis = 0;
var qtdClausulas = 0;
var equacaoTextual = "";

console.log("\n Inicio do calculo \n");
for (var i = 0; i < textoPorLinha.length; i++) {
    // o slice vai pegar a primeira letra, para que possamos analisá-la.
    var primeiraLetra = textoPorLinha[i].slice(0,1);

        if(primeiraLetra == "c"){ /*ignore c*/

            //console.log("comentario ignorado");

            } else if(primeiraLetra == "p") {
                // estou pegando as linhas que começam com "p".
                // se elas começam com "p", separo-as em elementos (uso o espaço entre elas para isso)
                // e armazeno-as na variável temp.
                var temp = textoPorLinha[i].split(" ");
                // parseInt transforma o 2 que estava sendo lido como string em um número inteiro. E aqui, guardamos essas informações nas variáveis.
                // o número 10 depois de parseInt significa que é decimals
                qtdVariaveis = parseInt(temp[2], 10);
                qtdClausulas = parseInt(temp[3], 10);
                //console.log(temp);

                    } else {
                    //o que fiz aqui? Concatenei os elementos da equação textual em uma só linha de texto,
                    //ou seja, em uma só string. Essa informação, com a igualdade, foi para jogar a informação lá em cima.
                    //isto gera uma linha só, textual, com todos os números (inclusive o 0. Vamos agora dar split, e talvez slice,
                    //para separar em elementos de array. Lembrar que .push vai jogando elementos numa array (enquanto vão crescendo em função de i).
                    equacaoTextual = equacaoTextual.concat(" ", textoPorLinha[i]);

                    };


};

equacaoTextual = equacaoTextual.split("0")
var clausulas = equacaoTextual.pop();




console.log(equacaoTextual);
console.log("final do programa");

for (var j = 0; i < clausulas.length; i++)
    var 
