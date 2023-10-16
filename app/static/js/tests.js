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

let initialTimeInSeconds = 15 // 15, 30, 60, 120, 180 or 300 seconds

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
let testConsistency = 100
let testCompleted = false


const maxAdditionalCharacters = 5

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
                clearInterval(timeInterval)
                isTesting = false
                textInput.value = ""
                textInput.blur()
                calculateStatistics()
                timer.innerText = "Час вийшов";
            } else {
                initialTimeInSeconds--;
            }
        }

        totalTestTime++
    }
}

let timeInterval = setInterval(updateTimer, 1000)

let wordIdx = 0;
let letterIdx = 0
let prevInputlength = 0;

addEventListener("input", (event) => {
    isTesting = true
    currentWord = wordsWraper[0].children[wordIdx];

    if (textInput.value.length > (wordList[wordIdx].length + maxAdditionalCharacters) && textInput.value[textInput.value.length - 1] !== " ") {
        textInput.value = textInput.value.slice(0, -1)
        return;
    }

    inputWords[wordIdx] = textInput.value

    if (inputWords[wordIdx].length > wordList[wordIdx].length) {
        let letter = document.createElement('letter');
        letter.innerText = inputWords[wordIdx][inputWords[wordIdx].length - 1];
        currentWord.appendChild(letter);

    }

    if (inputWords[wordIdx].length < prevInputlength) {
        if (inputWords[wordIdx].length >= wordList[wordIdx].length) {
            while (currentWord.children.length > inputWords[wordIdx].length) {
                currentWord.removeChild(currentWord.lastChild);
            }
        } else {
            currentWord.children[inputWords[wordIdx].length].style.color = "rgb(100, 102, 105)";
        }
    }
    prevInputlength = inputWords[wordIdx].length;

    if (inputWords[wordIdx][inputWords[wordIdx].length - 1] === " ") {
        textInput.value = "";
        inputWords[wordIdx] = inputWords[wordIdx].slice(0, -1)
        wordIdx++;
        letterIdx = 0;
        prevInputlength = 0;
        return;
    }
    if(inputWords[wordIdx].length > 0) {
        if (inputWords[wordIdx].length <= wordList[wordIdx].length) {
            if (textInput.value[inputWords[wordIdx].length - 1] === currentWord.children[inputWords[wordIdx].length - 1].innerText) {
                currentWord.children[inputWords[wordIdx].length - 1].style.transition = "color 0.2s"
                currentWord.children[inputWords[wordIdx].length - 1].style.color = "white"
            } else {                
                currentWord.children[inputWords[wordIdx].length - 1].style.transition = "color 0.2s"
                currentWord.children[inputWords[wordIdx].length - 1].style.color = "red"
            }
        } else {
            currentWord.children[inputWords[wordIdx].length - 1].style.transition = "color 0.2s"
            currentWord.children[inputWords[wordIdx].length - 1].style.color = "red"
        }
    }
    prevInputlength = inputWords[wordIdx].length;
    console.log(textInput.value, currentWord, wordList[wordIdx])
})

let onDeleteKeyPressState = false;

document.addEventListener("keydown", (event) => {
    if (isTesting) {
        if (event.keyCode === 8) {
            if (inputWords[wordIdx].length === 0 && wordIdx > 0 && !onDeleteKeyPressState) {
                onDeleteKeyPressState = true;
                wordIdx--;
                currentWord = wordsWraper[0].children[wordIdx];
                letterIdx = 0;
                textInput.value = inputWords[wordIdx];
                console.log(textInput.value, " ", wordList[wordIdx])
                event.preventDefault();
                prevInputlength = inputWords[wordIdx].length;
            }
        }
    }
});

document.addEventListener("keyup", (event) => {
    if (event.keyCode === 8) {
        onDeleteKeyPressState = false
    }
})

function WPM() {
    return testCorrectWords / totalTestTime * 60
}

function calculateStatistics() {
    testCompleted = true

    for (let i = 0; i < inputWords.length; i++) {
        if (inputWords[i] !== "") {
            for (let j = 0; j < inputWords[i].length; j++) {
                if (inputWords[i][j] === wordList[i][j]) {
                    testCorrectCharacters++
                    console.log("correct", inputWords[i][j], wordList[i][j])
                } else {
                    testIncorrectCharacters++
                    console.log("incorrect", inputWords[i][j], wordList[i][j])
                }

                testCharacters++
            }
            console.log(testCorrectCharacters, testIncorrectCharacters, testCharacters)

            if (inputWords[i] === wordList[i]) {
                testCorrectWords++
            } else {
                testIncorrectWords++
            }

            testWords++
        }
    }

    testWPM = WPM()
    testAccuracy = testCorrectCharacters / testCharacters * 100

    const formData = new FormData();
    formData.append('test_name', testName);
    formData.append('test_type', testType);
    formData.append('test_difficulty', testDifficulty);
    formData.append('test_language', language);
    formData.append('test_time', totalTestTime);
    formData.append('test_wpm', testWPM);
    formData.append('test_accuracy', testAccuracy);
    formData.append('test_characters', testCharacters);
    formData.append('test_words', testWords);
    formData.append('test_correct_words', testCorrectWords);
    formData.append('test_incorrect_words', testIncorrectWords);
    formData.append('test_correct_characters', testCorrectCharacters);
    formData.append('test_incorrect_characters', testIncorrectCharacters);
    formData.append('test_consistency', testConsistency);
    formData.append('test_completed', testCompleted);

    fetch ('/api/add_test', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        if (response.status === 400) {
            throw new Error('Error creating test');
        }
        return response.text();
    }).then(function (text) {
        console.log(text);
    }).catch(function (error) {
        console.error(error);
    });
}