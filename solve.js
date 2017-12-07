// Lendo o outro arquivo, contendo todas as funções.
const sat = require ('./sat_final_andre.js');

/* Caso queiramos substituir o nome do arquivo aqui no código.

var fs = require('fs');
var files = fs.readdirSync('./cnf');
files.shift();

console.log(files);
console.log(sat.solve("./hole1.cnf"));
*/

// Caso queiramos escolher um arquivo diretamente no terminal.
// https://stackoverflow.com/questions/9168737/read-a-text-file-using-node-js

var fs = require('fs')

    /* process.argv contém toda a invocação da linha de comando. O primeiro [0] é até o diretório do node. O [1] é
    até o arquivo a pasta e o .js que está rodando. O [2] é o arquivo que você quer ler. Guardamos dentro de uma
    variável*/
    fileName = process.argv[2];

    // Lemos o arquivo não-sincronicamente.
    /* O readFile vai pegar o nome do arquivo, transformar num string utf8. Essa callback function vai ser chamada
    quando o readFile terminar de ler. Se der erro, lança um erro. */
    fs.readFile(fileName, 'utf8', function(err, data) {
    if (err) throw err;
});

console.log(sat.solve(fileName));