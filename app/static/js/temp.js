textInput = document.querySelector('#hiddenInput')
wordsWraper = document.querySelectorAll('#wordsWraper')
body = document.querySelectorAll('body')
timer = document.getElementById('timer')

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
]

let inputWords = []

let testInputWords = []

let isTesting = false

let testName = "words" // main or training

let testType = "words" // timer or words

let wordsNumber = 20 // 20, 50 or 100

let initialTimeInSeconds = 30 // 15, 30, 60, 120, 180 or 300 seconds

let language = "en" // en or ukr

let totalTestTime = 0

let testDifficulty = 0

// statistics variables
let testWPM = 0
let testAccuracy = 0
let testCharacters = 0
let testWords = 0
let testCorrectWords = 0
let testIncorrectWords = 0
let testCorrectCharacters = 0
let testIncorrectCharacters = 0
let testConsistency = 0

window.onload = function () {
    textInput.focus()
    textInput.value = ""
    pushToWordsWraper()
}

function pushToWordsWraper() {
    for (let i = 0; i < wordList.length; i++) {
        let word = wordList[i];
        let wordDiv = document.createElement('word');
        for (let j = 0; j < word.length; j++) {
            let letter = document.createElement('letter');
            letter.innerText = word[j];
            wordDiv.appendChild(letter);
        }
        wordsWraper[0].appendChild(wordDiv);
        inputWords.push("");
    }
    console.log(inputWords)
}


function updateTimer() {
    timer.innerText = initialTimeInSeconds;
    if (isTesting) {
        if (testType == "words") {
            if (initialTimeInSeconds === 0) {
                timer.innerText = "Час вийшов";
            } else {
                initialTimeInSeconds--;
            }
        }

        totalTestTime++
    }
}

setInterval(updateTimer, 1000)

let wordIdx = 0;
let letterIdx = 0
let prevInputlength = 0;

addEventListener("input", (event) => {
    console.log(textInput.value, " ", wordList[wordIdx])
    isTesting = true
    currentWord = wordsWraper[0].children[wordIdx];

    if (textInput.value.length > currentWord.children.length) {
        let letter = document.createElement('letter');
        letter.innerText = textInput.value[textInput.value.length - 1];
        currentWord.appendChild(letter);

    }

    if (textInput.value.length <= prevInputlength) {
        if (wordList[wordIdx].length > textInput.value.length) {
            currentWord.children[textInput.value.length].style.color = "rgb(100, 102, 105)";
            prevInputlength = textInput.value.length;
            return;
        } else {
            currentWord.removeChild(currentWord.children[currentWord.children.length - 1])
        }
    }

    if (textInput.value[textInput.value.length - 1] === " ") {
        textInput.value = "";
        wordIdx++;
        letterIdx = 0;
        prevInputlength = 0;
        return;
    }

    if (textInput.value.length <= wordList[wordIdx].length) {
        if (textInput.value[textInput.value.length - 1] === currentWord.children[textInput.value.length - 1].innerText) {
            currentWord.children[textInput.value.length - 1].style.transition = "color 0.2s"
            currentWord.children[textInput.value.length - 1].style.color = "white"
        } else {                
            currentWord.children[textInput.value.length - 1].style.transition = "color 0.2s"
            currentWord.children[textInput.value.length - 1].style.color = "red"
        }
    } else {
        currentWord.children[textInput.value.length - 1].style.transition = "color 0.2s"
        currentWord.children[textInput.value.length - 1].style.color = "red"
    }
    prevInputlength = textInput.value.length;
    console.log(textInput.value, currentWord, wordList[wordIdx])
})

document.addEventListener("keydown", (event) => {
    if (isTesting) {
        if (event.keyCode === 8) {
            if (textInput.value.length === 0 && wordIdx > 0 && !onDeleteKeyPressState) {
                wordIdx--;
                currentWord = wordsWraper[0].children[wordIdx];
                letterIdx = 0;
                for (let i = 0; i < currentWord.children.length; i++) {
                    textInput.value += currentWord.children[i].innerText;
                }
                event.preventDefault(); // Заблокувати стандартну дію "Backspace"
                prevInputlength = textInput.value.length;
            }
        }
    }
})

let onDeleteKeyPressState = false;

document.addEventListener("keydown", (event) => {
    if (isTesting) {
        if (event.keyCode === 8) {
            if (textInput.value.length === 0 && wordIdx > 0 && !onDeleteKeyPressState) {
                onDeleteKeyPressState = true; // Встановити флаг в true тільки при натисканні Backspace
                wordIdx--;
                currentWord = wordsWraper[0].children[wordIdx];
                letterIdx = 0;
                for (let i = 0; i < currentWord.children.length; i++) {
                    textInput.value += currentWord.children[i].innerText;
                }
                event.preventDefault();
                prevInputlength = textInput.value.length;
            }
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 8) {
        onDeleteKeyPressState = false
    }
})

