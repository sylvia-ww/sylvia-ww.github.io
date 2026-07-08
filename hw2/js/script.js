document.querySelector("button").addEventListener("click", gradeQuiz);
displayQ4Choices();

// keep track of total attempts
let attempts = localStorage.getItem("total_attempts");

if (attempts === null) {
    attempts = 0;
} else {
    attempts = Number(attempts);
}





// for q4
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// display q4 choices in a random order
function displayQ4Choices() {
    let q4ChoicesArray = ["Maine", "Rhode Island", "Maryland", "Delaware"];
    shuffleArray(q4ChoicesArray);

    let choicesContainer = document.querySelector("#q4Choices");
    choicesContainer.textContent = "";

    for (let choice of q4ChoicesArray) {
        let input = document.createElement("input");
        input.type = "radio";
        input.name = "q4";
        input.id = choice;
        input.value = choice;

        let label = document.createElement("label");
        label.htmlFor = choice;
        label.textContent = choice;

        choicesContainer.appendChild(input);
        choicesContainer.appendChild(label);
        choicesContainer.appendChild(document.createTextNode(" "));
    }
}

// checks if question was answered
// return: true / false
function isFormValid() {
    let isValid = true;
    let q1Response = document.querySelector("#q1").value;
    let validationFdbk = document.querySelector('#validationFdbk');

    if (q1Response === "") {
        isValid = false;
        validationFdbk.textContent = "Question 1 was not answered";
        validationFdbk.style.setProperty("background-color", "var(--red)", "important");
        validationFdbk.style.setProperty("padding", "1rem 2rem");
    }

    return isValid;
}

function gradeQuiz() {
    console.log("Grading quiz...");

    //check if form valid
    let validationFdbk = document.querySelector("#validationFdbk");
    validationFdbk.textContent = "";
    validationFdbk.style.setProperty("background-color", "transparent", "important");
    validationFdbk.style.setProperty("padding", "0rem");
    if (!isFormValid()) {
        return;
    }

    // initialize score
    let score = 0;

    // helper functions---
    function setMarkImage(index, imageName, altText) {
        let markContainer = document.querySelector(`#markImg${index}`);
        markContainer.textContent = "";

        let img = document.createElement("img");
        img.src = `img/${imageName}`;
        img.alt = altText;
        markContainer.appendChild(img);
    }

    function rightAnswer(index) {
        let feedback = document.querySelector(`#q${index}Feedback`);
        feedback.textContent = "Correct!";
        feedback.className = "bg-success text-white";
        setMarkImage(index, "checkmark.png", "Checkmark");
        score += 10;
    }

    function wrongAnswer(index) {
        let feedback = document.querySelector(`#q${index}Feedback`);
        feedback.textContent = "Incorrect!";
        feedback.className = "bg-warning text-white";
        setMarkImage(index, "xmark.png", "X mark");
    }
    //end of helper functions------

    //queryselectors
    let q1Feedback = document.querySelector("#q1Feedback");
    let markImg1 = document.querySelector("#markImg1");

    //reset feedback div (in case prev answer was incorrect)
    q1Feedback.textContent = "";
    q1Feedback.className = "";
    markImg1.textContent = "";

    // --grading logic--
    // question 1
    let q1Response = document.querySelector("#q1").value.toLowerCase();
    if (q1Response === "sacramento") {
        rightAnswer(1);
    } else {
        wrongAnswer(1);
    }

    // question 2
    let q2Response = document.querySelector("#q2").value.toLowerCase();
    if (q2Response === "mo") {
        rightAnswer(2);
    } else {
        wrongAnswer(2);
    }

    // question 3
    if (document.querySelector("#Jefferson").checked &&
        document.querySelector("#Roosevelt").checked &&
        !document.querySelector("#Jackson").checked &&
        !document.querySelector("#Franklin").checked) {
        rightAnswer(3);
    } else {
        wrongAnswer(3);
    }

    // question 4
    let selectedQ4 = document.querySelector("input[name=q4]:checked");
    if (selectedQ4 !== null && selectedQ4.value === "Rhode Island") {
        rightAnswer(4);
    } else {
        wrongAnswer(4);
    }

    //question 5
    if (document.querySelector('#q5').value == 5) {
        rightAnswer(5);
    } else {
        wrongAnswer(5);
    }

    // question 6
    let q6Response = document.querySelector("#q6").value.toLowerCase();
    if (q6Response === "superior") {
        rightAnswer(6);
    } else {
        wrongAnswer(6);
    }

    // question 7
    if (document.querySelector("#q7").value === "1911-10-11") {
        rightAnswer(7)
    } else {
        wrongAnswer(7);
    }

    //question 8
    if (document.querySelector('#q8').value == 50) {
        rightAnswer(8)
    } else {
        wrongAnswer(8);
    }

    // question 9
    let selectedQ9 = document.querySelector("input[name=q9]:checked");
    if (selectedQ9 !== null && selectedQ9.value === "avo") {
        rightAnswer(9);
    } else {
        wrongAnswer(9);
    }

    // question 10
    let q10Response = document.querySelector("#q10").value.toLowerCase();
    if (q10Response === "wyoming") {
        rightAnswer(10);
    } else {
        wrongAnswer(10);
    }

    // display total score
    totalScore = document.querySelector("#totalScore");
    totalScore.textContent = `Total Score: ${score}`;
    // <80 -> make it red
    console.log(`Final score: ${score}`);
    //if score is low, make it red
    if (score < 80) {
        totalScore.style.setProperty("color", "var(--red)", "important");
    }
    // >80 -> congratulations message
    else {
        totalScore.style.setProperty("color", "");
        congrats_msg = document.querySelector('#congrats');
        congrats_msg.textContent = "Congratulations! Your score is pretty good."
        congrats_msg.style.setProperty("color", "var(--peach)", "important");
    }

    // update total attempts
    attempts++;
    document.querySelector("#totalAttempts").textContent = `Total Attempts: ${attempts}`;
    localStorage.setItem("total_attempts", attempts);

}

// helper functions
