let randomCountryElement = document.querySelector('#random-country-display');     // The element to display the country's name in
let userAnswerElement = document.querySelector('#user-answer-entry');    // The input element the user enters their answer in  
let submitButton = document.querySelector('#submit-user-answer');    // The button the user clicks to submit their answer 
let resultTextElement = document.querySelector('#game-result');   // The element that displays if the user is correct or not
let playAgainButton = document.createElement('button');  // Creating a Play Again button

// Add the Play Again button to the HTML
playAgainButton.textContent = 'Play Again';
playAgainButton.classList.add('btn', 'btn-outline-secondary', 'mt-3');
document.body.appendChild(playAgainButton);
playAgainButton.style.display = 'none';  // Initially hide the button

// Function to select a random country and update the display
function selectRandomCountry() {
    let randomIndex = Math.floor(Math.random() * countriesAndCodes.length);
    let randomCountry = countriesAndCodes[randomIndex];
    randomCountryElement.textContent = randomCountry.name;
    randomCountryElement.dataset.code = randomCountry.twoLetterCode;  // Store the country's code for later use
}

// Function to handle user answer submission
function checkUserAnswer() {
    let userAnswer = userAnswerElement.value.trim().toLowerCase();
    let countryCode = randomCountryElement.dataset.code;
    let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            let capitalCity = data[1][0].capitalCity.trim().toLowerCase();
            if (userAnswer === capitalCity) {
                resultTextElement.textContent = `Correct! The capital of ${randomCountryElement.textContent} is ${capitalCity.charAt(0).toUpperCase() + capitalCity.slice(1)}.`;
            } else {
                resultTextElement.textContent = `Wrong - the capital of ${randomCountryElement.textContent} is not ${userAnswer}, it is ${capitalCity.charAt(0).toUpperCase() + capitalCity.slice(1)}.`;
            }
            playAgainButton.style.display = 'block';  // Show the Play Again button
        })
        .catch(error => {
            alert('Error fetching data from World Bank API.');
            console.error('Error:', error);
        });
}

// Function to reset the game
function resetGame() {
    userAnswerElement.value = '';
    resultTextElement.textContent = 'Replace with result';
    playAgainButton.style.display = 'none';  // Hide the Play Again button
    selectRandomCountry();
}

// Add event listeners
submitButton.addEventListener('click', checkUserAnswer);
playAgainButton.addEventListener('click', resetGame);

// Initialize the game
selectRandomCountry();