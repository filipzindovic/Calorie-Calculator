// Object holding all form values.
var allValues = {
    
    userGenderInput: {
        male: document.getElementById("male-id"),
        female: document.getElementById("female-id")
    },
    userAgeInput: document.getElementById("age"),
    userWeightInput: document.getElementById("weight"),
    userHeightInput: document.getElementById("height"),
    userExerciseInput: document.getElementById("exercise"),
    // exercise intensity values - to be added to total calorie equation
    exerciseValue: {
        "None": 50,
        "Light": 200,
        "Moderate": 400,
        "Intense": 600,
        "Very Intense": 900
    },
    walking: document.getElementById("walking"),
    // walking value coefficient - to be entered in walking calories burnt equation
    walkingCoefficient: {
        "0.8km / 0.5m": 1,
        "1.6km / 1.0m": 2,
        "2.4km / 1.5m": 3,
        "3.2km / 2.0m": 4,
        "4.0km / 2.5m": 5,
        "4.8km / 3.0m": 6,
        "5.6km / 3.5m": 7,
        "6.4km / 4.0m": 8,
        "7.2km / 4.5m": 9,
        "8.0km / 5.0m": 10
        
    },
    button: document.getElementById("button")
};

function checkIfAllFieldsEntered(){
    
    if ((((allValues.userGenderInput.male.value == false) || (allValues.userGenderInput.female.value == false)) == true) && (((allValues.userAgeInput.value == false) || (allValues.userWeightInput.value == false) || (allValues.userHeightInput.value == false) || (allValues.userExerciseInput.value == false) || (allValues.walking.value == false)) == false)) { 
        
        return true;
        
    } else {
        
        alert("Please complete all required fields!");
    };
};

// tests if age, weight, height, exercise intensity and walking distance fields have been entered within a pre-determined range
function checkRangeOfValues() {
        
    if ( (allValues.userAgeInput.value < parseInt(allValues.userAgeInput.min)) || (allValues.userAgeInput.value > parseInt(allValues.userAgeInput.max)) ) {

        alert("Please enter appropriate age!");

    } else if (( (allValues.userWeightInput.value < parseInt(allValues.userWeightInput.min)) || (allValues.userWeightInput.value > parseInt(allValues.userWeightInput.max)) )) {

        alert("Please enter appropriate weight!"); 

    } else if (( (allValues.userHeightInput.value < parseInt(allValues.userHeightInput.min)) || (allValues.userHeightInput.value > parseInt(allValues.userHeightInput.max)) )) {

        alert("Please enter appropriate height!");

    } else if (Object.getOwnPropertyNames(allValues.exerciseValue).indexOf(allValues.userExerciseInput.value) == -1) {

        alert("Please choose an appropriate exercise intensity!");

    } else if (Object.getOwnPropertyNames(allValues.walkingCoefficient).indexOf(allValues.walking.value) == -1) {

        alert("Please choose an appropriate walking distance!");

    } else {

        return true;
    }
};

function displayCalculatedValueToUser() {
    
    document.getElementById("calculated-calories").innerText = userCalorieCalculation().toFixed(0) + "Kcals";
};

//function returns the total amount of calories based on User's input.
function userCalorieCalculation() {
   
    // returns single value by adding BMR, users exercise input and walking distance equation
    return userBMR() + allValues.exerciseValue[allValues.userExerciseInput.value] + userWalkingCalculation()

};

// calculation of Basal Metabolic Rate 
function userBMR() {
        
    if (allValues.userGenderInput.female.value == 1) {
    //calculation of BMR if female radio button selected    
        return ((10 * allValues.userWeightInput.value) + (6.25 * allValues.userHeightInput.value) - (5 * allValues.userAgeInput.value) - 161);

    } else {
    //calculation of BMR if male radio button selected
        return ((10 * allValues.userWeightInput.value) + (6.25 * allValues.userHeightInput.value) - (5 * allValues.userAgeInput.value) + 5);
    }
};

//calculates users calories burnt walking using the walking coefficient.
function userWalkingCalculation() {

    return ( (4 * allValues.walkingCoefficient[allValues.walking.value]) * (weightRange() - 1) + (25 * allValues.walkingCoefficient[allValues.walking.value]) - (allValues.walkingCoefficient[allValues.walking.value] + weightRange()) )

};

// function gets the Users weight value and places the value into a range which is then designated a coefficient 
function weightRange() {
    
    for (var i = 0; i < 16; i++) {
        if ( (( allValues.userWeightInput.value > ((i*7) + 44) ) == true) && (( allValues.userWeightInput.value < ((i*7) + 52) ) == true)) { 
            
            return (i + 1);    
        }   
    } 
};

// click listener for female button - if clicked sets female value to true and male value to false
allValues.userGenderInput.female.addEventListener("click", function() {
        
    allValues.userGenderInput.female.value = 1;
    allValues.userGenderInput.male.value = 0;
        
});

// click listener for male button - if clicked sets male value to true and female value to false
allValues.userGenderInput.male.addEventListener("click", function() {
    
    allValues.userGenderInput.female.value = 0;
    allValues.userGenderInput.male.value = 1;
    
});

//click listener for calculate button - initiates first function.
allValues.button.addEventListener("click", function() {
    
    if (checkIfAllFieldsEntered() && checkRangeOfValues() === true) {
        displayCalculatedValueToUser();
    }
});