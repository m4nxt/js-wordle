const load = async (url) => {
    try {
        const response = await fetch(url);
        const data = await response.text();
        console.log(data);
        return data;
    } catch (err) {
        console.error(err);
    }
};

const words = Object.entries(load("https://raw.githubusercontent.com/m4nxt/wordle/main/words.txt"));
console.log(typeof(words))

var i = 0;
var j = 0;
var input = "";
var inplist = [];
var word = words[Math.floor(Math.random() * words.length)];

document.addEventListener('keydown', function(event) {
    if (event.key === "Backspace") {
        if (input.length > 0) {
            if (i > 0) {
                console.log(j.toString()+(i-1).toString());
                document.getElementById(j.toString()+(i-1).toString()).innerText = " ";
                i -= 1;
            } else if (i == 0) {
                console.log((j-1).toString()+(4).toString());
                document.getElementById((j-1).toString()+(4).toString()).innerText = " ";
                i = 4;
                j -= 1;
            }
            input = input.slice(0, -1);
        }
    }
});

document.addEventListener("keypress", function onEvent(event) {
    if (event.key == " ") {

    } else if (event.key == "Enter") {
        if (words.includes(input)) {
            if (input.length == 5) {
                inplist = [...inplist, input];
                console.log(inplist);
                if (input == word) {
                    window.location.replace("win.html");
                }
    
                for (let i = 0; i < 5; i++) {
                    if (word.includes(input[i])) {
                        document.getElementById((j-1).toString()+i.toString()).style.background = 'rgba(255,255,0,0.35)';
                    } else {
                        document.getElementById((j-1).toString()+i.toString()).style.background = 'rgba(0,0,0,0.35)';
                    }
                    if (input[i] == word[i]) {
                        document.getElementById((j-1).toString()+i.toString()).style.background = 'rgba(0,255,0,0.35)';
                    }
                }
    
                if (inplist.length == 6) {
                    window.location.replace("lost.html");
                }
    
                input = "";
            } else {
                console.log("hvad");
                document.getElementById("gamegrid").classList.add("animateDescriptor");
                document.getElementById("gamegrid").addEventListener( "animationend",  function() {
                    document.getElementById("gamegrid").classList.remove("animateDescriptor");
                });
            }
        } else {
            console.log("hvad");
            document.getElementById("gamegrid").classList.add("animateDescriptor");
            document.getElementById("gamegrid").addEventListener( "animationend",  function() {
                document.getElementById("gamegrid").classList.remove("animateDescriptor");
            });

        }
        console.log(input)
    } else if (input.length < 5) {
        console.log(event.key.toString() + j.toString() + i.toString());
        document.getElementById(j.toString()+i.toString()).innerText = event.key;

        if (j > 5) {
            j = 0;
        }
    
        if (i < 4) {
            i += 1;
            input = input + event.key;
        } else {
            input = input + event.key;
            j += 1;
            i = 0;
        }
    } 
});
