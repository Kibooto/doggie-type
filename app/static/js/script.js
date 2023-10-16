textInput = document.querySelector('#hiddenInput');
wordsWraper = document.querySelectorAll('#wordsWraper');
body = document.querySelectorAll('body');
timer = document.getElementById('timer');

let wordList = [
    "need",
    "pride",
    "alive",
    "challenge",
    "requirement",
    "global",
    "ancestor",
    "battlefield",
    "hope",
    "date",
    "riot",
    "flatware",
    "deep",
    "minister",
    "fabricate",
    "action",
    "budget",
    "husband",
    "edition",
    "scratch"
];

let isTesting = false;
let currentWords = []
let currentWord = ""

let initialTimeInSeconds = 180;

window.onload = function () {
    textInput.focus();
    isTesting = true;
    textInput.value = "";
    pushToWordsWraper();
};

function pushToWordsWraper() {
    for (let i = 0; i < wordList.length; i++) {
        let word = wordList[i];
        let wordDiv = document.createElement('word');
        for (let j = 0; j < word.length; j++) {
            let letter = document.createElement('letter');
            letter.innerText = word[j];
            wordDiv.appendChild(letter);
        }

        wordsWraper[0].appendChild(wordsWraper[0].appendChild(wordDiv));
    }

    console.log(wordsWraper[0].children);
}

function updateTimer() {
    timer.innerText = initialTimeInSeconds;
    
    if (initialTimeInSeconds === 0) {
        timer.innerText = "Час вийшов";
    } else {
        initialTimeInSeconds--;
    }
}

setInterval(updateTimer, 1000);

let wordIdx = 0;
let letterIdx = 0
let prevInputlength = 0;
addEventListener("input", (event) => {
    if (isTesting) {
        currentWord = wordsWraper[0].children[wordIdx];

        if (textInput.value.length > currentWord.children.length) {
            let letter = document.createElement('letter');
            letter.innerText = textInput.value[textInput.value.length - 1];
            currentWord.appendChild(letter);
        }

        if (textInput.value[textInput.value.length - 1] === " ") {
            textInput.value = "";
            wordIdx++;
            letterIdx = 0;
            prevInputlength = 0;
            return;
        }


        if (textInput.value.length < prevInputlength) {
            if (textInput.value.length < wordList[wordIdx].length) {
                currentWord.children[textInput.value.length].style.color = "rgb(100, 102, 105)";
                prevInputlength = textInput.value.length;
                return;
            } else {
                currentWord.removeChild(currentWord.children[currentWord.children.length - 1])
            }
        }

        if (textInput.value.length <= wordList[wordIdx].length) {

            if (textInput.value[textInput.value.length - 1] === currentWord.children[textInput.value.length - 1].innerText) {
                currentWord.children[textInput.value.length - 1].style.transition = "color 0.2s";
                currentWord.children[textInput.value.length - 1].style.color = "white"
            } else {                
                currentWord.children[textInput.value.length - 1].style.transition = "color 0.2s";
                currentWord.children[textInput.value.length - 1].style.color = "red"
            }
        } else {
            currentWord.children[textInput.value.length - 1].style.transition = "color 0.2s";
            currentWord.children[textInput.value.length - 1].style.color = "red"
        }

        prevInputlength = textInput.value.length;
        console.log(textInput.value, textInput.value.length, currentWord.children.length, wordList[wordIdx].length);
        console.log(currentWord);
    }
});

let onDeleteKeyPressState = false;

function onDeleteKeyPress(event) {
    if (isTesting) {
        if (event.keyCode === 8) {
            if (textInput.value.length === 0 && wordIdx > 0) {
                onDeleteKeyPressState = true;
                wordIdx--;
                currentWord = wordsWraper[0].children[wordIdx];
                letterIdx = 0;
                for (let i = 0; i < currentWord.children.length; i++) {
                    textInput.value += currentWord.children[i].innerText;
                }
                if (currentWord.children.length > wordList[wordIdx].length) {
                    prevInputlength = textInput.value.length;
                } else {
                    prevInputlength = textInput.value.length;
                }
            }
        }
    }
}

document.addEventListener('keydown', onDeleteKeyPress);
