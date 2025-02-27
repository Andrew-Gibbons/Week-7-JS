let randomCountryElement = document.querySelector('#random-country-display');     // The element to display the country's name in
let userAnswerElement = document.querySelector('#user-answer-entry');    // The input element the user enters their answer in  
let submitButton = document.querySelector('#submit-user-answer');    // The button the user clicks to submit their answer 
let resultTextElement = document.querySelector('#game-result');   // The element that displays if the user is correct or not
let playAgainButton = document.createElement('button');  // Creating a Play Again button

// Add the Play Again button to the HTML
// This sets the text content of the playAgainButton element to "Play Again".
playAgainButton.textContent = 'Play Again';
// playAgainButton.classList.add('btn', 'btn-outline-secondary', 'mt-3');
// This adds three CSS classes (btn, btn-outline-secondary, mt-3) to the playAgainButton element.
// These classes are typically from Bootstrap (a popular CSS framework) and style the button as follows:
// btn applies the basic button styling.
// btn-outline-secondary styles the button with an outline and a secondary color.
// mt-3 adds a margin-top of 3 units to space it out from other elements above it.
playAgainButton.classList.add('btn', 'btn-outline-secondary', 'mt-3');
// This appends the playAgainButton element to the body of the HTML document.
document.body.appendChild(playAgainButton);
// This sets the display style of the playAgainButton element to 'none', hiding it from view.
playAgainButton.style.display = 'none';  // Initially hide the button

// Function to select a random country and update the display
function selectRandomCountry() {
    // This generates a random index between 0 and the length of the countriesAndCodes array.
    // This index is used to select a random country from the array.
    let randomIndex = Math.floor(Math.random() * countriesAndCodes.length);
    let randomCountry = countriesAndCodes[randomIndex];
    // This sets the text content of the randomCountryElement to the name of the randomly selected country.
    randomCountryElement.textContent = randomCountry.name;
    // This sets the data-code attribute of the randomCountryElement to the two-letter code of the randomly selected country.
    randomCountryElement.dataset.code = randomCountry.twoLetterCode;  // Store the country's code for later use
}

// Function to handle user answer submission
function checkUserAnswer() {
    // This retrieves the user's answer from the userAnswerElement and converts it to lowercase.
    let userAnswer = userAnswerElement.value.trim().toLowerCase();
    // This retrieves the country code of the randomly selected country from the data-code attribute of the randomCountryElement.
    // Study the HTML file to see how this data-code attribute is set.
    let countryCode = randomCountryElement.dataset.code;
    // This constructs the URL for the World Bank API using the country code.
    let url = `https://api.worldbank.org/v2/country/${countryCode}?format=json`;
    // This fetches data from the World Bank API using the constructed URL.
    fetch(url)
        // This converts the response to JSON format.
        .then(response => response.json())
        // This processes the JSON data to extract the capital city of the country.
        .then(data => {
            // This retrieves the capital city of the country from the fetched data and converts it to lowercase.
            let capitalCity = data[1][0].capitalCity.trim().toLowerCase();
            // This checks if the user's answer matches the capital city of the country.
            if (userAnswer === capitalCity) {
                // This updates the resultTextElement with a correct message if the user's answer is correct.
                resultTextElement.textContent = `Correct! The capital of ${randomCountryElement.textContent} is ${capitalCity.charAt(0).toUpperCase() + capitalCity.slice(1)}.`;
            } else {
                // This updates the resultTextElement with an incorrect message if the user's answer is wrong.
                resultTextElement.textContent = `Wrong - the capital of ${randomCountryElement.textContent} is not ${userAnswer}, it is ${capitalCity.charAt(0).toUpperCase() + capitalCity.slice(1)}.`;
            }
            // This displays the Play Again button after the user has submitted an answer.
            playAgainButton.style.display = 'block';  // Show the Play Again button
        })

        .catch(error => {
            alert('Error fetching data from World Bank API.');
            console.error('Error:', error);
        });
}

// Function to reset the game
function resetGame() {
    // This clears the user's answer from the userAnswerElement.
    userAnswerElement.value = '';
    // This resets the resultTextElement to its initial state.
    resultTextElement.textContent = 'Replace with result';
    // This hides the Play Again button after the game is reset
    playAgainButton.style.display = 'none';  // Hide the Play Again button
    // This selects a new random country to start a new game.
    selectRandomCountry();
}

// Add event listeners
// This adds an event listener to the submitButton element that calls the checkUserAnswer function when clicked.
submitButton.addEventListener('click', checkUserAnswer);
// This adds an event listener to the playAgainButton element that calls the resetGame function when clicked.
playAgainButton.addEventListener('click', resetGame);

// Initialize the game
selectRandomCountry();