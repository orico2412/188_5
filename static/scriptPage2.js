const calories = document.querySelector(".bmr-calculator .result .calories");
const calculateBtn = document.querySelector(".bmr-calculator .result .calculate-btn");

calculateBtn.addEventListener("click", () => {
const age = document.querySelector(".bmr-calculator form #age");
const height = document.querySelector(".bmr-calculator form #height");
const weight = document.querySelector(".bmr-calculator form #weight");
const proteinIntake = document.getElementById("protein-intake");
const carbsIntake = document.getElementById("carbs-intake");
const fatIntake = document.getElementById("fat-intake");

let genderValue = document.querySelector(".bmr-calculator form input[name=gender]:checked").value;
let ageValue = parseInt(age.value);
let heightValue = parseInt(height.value);
let weightValue = parseInt(weight.value);

// Check if any of the input values are negative
if (ageValue < 0 || heightValue < 0 || weightValue < 0) {
  // Display an error message to the user
  alert("Please enter positive values for age, height, and weight.");
  return; // Stop further execution
}

const calculateBMR = (weight, height, age, gender) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

let BMR = calculateBMR(weightValue, heightValue, ageValue, genderValue);
let proteinIntakeValue = (1.2 * weightValue).toFixed(2);
let carbsIntakeValue = (9 * weightValue).toFixed(2);
let fatIntakeValue = (0.5 * weightValue).toFixed(2);

calories.innerHTML = BMR.toLocaleString("en-US");
proteinIntake.textContent = proteinIntakeValue;
carbsIntake.textContent = carbsIntakeValue;
fatIntake.textContent = fatIntakeValue;
});
