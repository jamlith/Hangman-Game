var words = ["language", "interface", "framework", "stylesheet", "relative", "absolute", "variable", "function", "object", "scope", "method", "property", "document", "global", "local"];
var randIndex = Math.floor(Math.random()*words.length);
var solution = words[randIndex];
var exploded= [];
exploded = solution.split("");
var choices = "abcdefghijklmnopqrstuvwxyz".split("");
var chances = 10;
document.getElementById("guesses").innerText = chances;
var blanks_solved = 0;
var wins = 0;
var losses = 0;
var over = 0;



var blanks_gen = function(solutionArr) {

    var html = "<div id=\"blanks-container\">\n";
    for (var i = 0; i < solutionArr.length; i++) {
        html += "\t<div class=\"letter-box\" id=\"ltr" + i + "\">_</div>\n";
    }
    html += "</div>\n";
    return html;
}

function resetGame() {
    over = 0;
    blanks_solved = 0;
    chances = 10;
    document.getElementById("guesses").innerText = chances;
    choices = "abcdefghijklmnopqrstuvwxyz".split("");
    randIndex = Math.floor(Math.random()*words.length);
    solution = words[randIndex];
    exploded = solution.split("");
    document.getElementById("blanks-container").style = "";
    document.getElementById("blanks-div").innerHTML = blanks_gen(exploded);
    document.getElementById("outcome").innerText = "Press any key to guess now!";
    document.getElementById("guessed").innerText = "";
}

document.getElementById("blanks-div").innerHTML =  blanks_gen(exploded);

document.onkeypress = function(event) {
    if (over != 0) {
        if (event.key.toLowerCase() == "r") {
            resetGame();
            return;
        } else {
            return;
        }
    }
    var i = choices.indexOf(event.key.toLowerCase());
    if (i != -1) {
        var z = exploded.indexOf(event.key.toLowerCase());
        if (z != -1) {
            for (var x = 0; x < exploded.length; x++) {
                if (exploded[x] == event.key.toLowerCase()) {
                    document.getElementById("ltr" + x).innerText = event.key.toUpperCase();
                    blanks_solved++;
                    if (blanks_solved == exploded.length) {
                        over = 1;
                        document.getElementById("blanks-container").style = "color: green;";
                        document.getElementById("outcome").innerText = "YOU WIN! Press R to start a new game.";
                        wins++;
                        document.getElementById("wincount").innerText = wins;
                    }
                }
            }
            choices[i] = "";
        } else {
            chances--;
            document.getElementById("guesses").innerText = chances;
            document.getElementById("guessed").innerText += " " + event.key.toUpperCase();
            if (chances == 0) {
                over = 1;
                document.getElementById("blanks-container").style = "color: red;";
                for (var p = 0; p < exploded.length; p++) {
                    if (document.getElementById("ltr" + p).innerText == "_") {
                        document.getElementById("ltr" + p).innerText = exploded[p].toUpperCase();
                    }
                }
                document.getElementById("outcome").innerText = "YOU LOSE!  Press R to start a new game.";
                losses++;
                document.getElementById("losscount").innerText = losses;
            } else {
                choices[i] = "";
            }
        }
    }
}
