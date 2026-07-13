document.addEventListener("DOMContentLoaded", loadStates);
document.querySelector("#zip").addEventListener("change", displayCity); // zip code entry box
document.querySelector("#state").addEventListener("change", loadCounties);
document.querySelector("#username").addEventListener("change", checkUsername);
document.querySelector("#signupForm").addEventListener("submit", validateForm);
document.querySelector("#password").addEventListener("click", displaySuggestedPw);

async function displayCity() {
  //   alert(document.querySelector("#zip").value);

  // use fetch api to retrieve info abt entered zip code
  try {
    let zipCode = document.querySelector("#zip").value;
    let url = `https://csumb.space/api/cityInfoAPI.php?zip=${zipCode}`;
    // await pauses function until remote data is ready instead of freezing whole browser
    let response = await fetch(url);  //gets raw data returned (as a json)
    let data = await response.json();  // reads it from the json

    //the API returns false when the zip code is not found, so we can check for that case before trying to access the city property
    if (data === false) {
      document.querySelector("#city").textContent = "Zip code not found";
      document.querySelector("#latitude").textContent = "";
      document.querySelector("#longitude").textContent = "";
      return;
    }

    // display city data
    // data.value -> value is the json key
    document.querySelector("#city").textContent = data.city;
    document.querySelector("#latitude").textContent = data.latitude;
    document.querySelector("#longitude").textContent = data.longitude;

  } catch (error) {
    document.querySelector("#city").textContent = "Unable to retrieve city";
    console.error(error);
  }
}

//populate counties dropdown menu
//called by 'change' eventlistener a state is selected 
async function loadCounties(event) {
  let countyMenu = document.querySelector("#county");
  countyMenu.textContent = ""; //resets data, incase it has counties from a previous state

  //create default option
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  countyMenu.appendChild(defaultOption);

  let state = event.target.value;

  try {
    //api
    let response = await fetch(`https://csumb.space/api/countyListAPI.php?state=${state}`);
    let data = await response.json();

    for (let item of data) {
      let option = document.createElement("option");
      option.textContent = item.county;
      countyMenu.appendChild(option);
    }
  }
  catch (error) {
    console.error(error);

    countyMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load counties";
    countyMenu.appendChild(errorOption);
  }
}

// populate states dropdown menu
async function loadStates() {
  let stateMenu = document.querySelector("#state"); //get dropdown manu

  stateMenu.textContent = "";

  // set first/default option to "select one"
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select One";
  stateMenu.appendChild(defaultOption);

  try {
    // get api 
    let url = "https://csumb.space/api/allStatesAPI.php";
    let response = await fetch(url);
    let data = await response.json();

    // for every item in api, make a dropdown option
    for (let item of data) {
      let option = document.createElement("option");
      option.value = item.usps;
      option.textContent = item.state;
      stateMenu.appendChild(option);
    }
  } catch (error) {
    // if error, create a dropdown option "unable to load states"
    console.error(error);

    stateMenu.textContent = "";

    let errorOption = document.createElement("option");
    errorOption.value = "";
    errorOption.textContent = "Unable to load states";
    stateMenu.appendChild(errorOption);
  }
}

//todo: load counties
//todo: display suggested password on click of password text box
function displaySuggestedPw() {
  //generate random string
  let suggested = '';
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcefghijklmnopqrstuvwxyz01234567890!@#$%^&*()';

  const availableChars = chars.length;
  for (let i = 0; i < 6; i++) {
    suggested += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  //display random string
  document.querySelector("#suggestedPassword").textContent = suggested;
  document.querySelector("#spw-label").textContent = "Suggested password: "
}

async function checkUsername() {
  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    return false;
  }

  let url = `https://csumb.space/api/usernamesAPI.php?username=${username}`;
  let response = await fetch(url);
  let data = await response.json();

  if (data.available) {
    usernameError.textContent = "Username available!";
    usernameError.style.color = "green";
    return true;
  } else {
    usernameError.textContent = "Username taken";
    usernameError.style.color = "red";
    return false;
  }
}

async function validateForm(event) {
  console.log("Validating form...");
  event.preventDefault();

  let isValid = true;

  let username = document.querySelector("#username").value;
  let usernameError = document.querySelector("#usernameError");

  usernameError.textContent = "";

  // check for blank username
  if (username.length === 0) {
    usernameError.textContent = "Username required";
    usernameError.style.color = "red";
    isValid = false;
  } else {
    usernameError.textContent = "";
    // if username not blank, check availability
    let usernameAvailable = await checkUsername(); //need await bc checkusername uses fetch (returns promise that eventually becomes true or false)

    if (usernameAvailable === false) {
      isValid = false;
    }
  }

  // check for valid password
  let pw = document.querySelector("#password").value;
  let pw_error = document.querySelector("#passwordError");
  // if password too short
  if (pw.length < 6) {
    isValid = false;
    pw_error.textContent = "Password must be 6 characters or longer"
    pw_error.style.color = "red";
  } else {
    //in case it passed prev check but fails other form submission checks
    pw_error.textContent = "";
    // if password doesn't match confirmation
    let pw_again = document.querySelector("#passwordAgain").value;
    if (pw != pw_again) {
      isValid = false;
      pw_error.textContent = "Password doesn't match password confirmation";
      pw_error.style.color = "red";
    }
  }

  //submit manually if everything ok
  if (isValid) {
    document.querySelector("#signupForm").submit();
  }
}