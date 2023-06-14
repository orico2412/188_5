const calories = document.querySelector(".bmr-calculator .result .calories");
const calculateBtn = document.querySelector(".bmr-calculator .result .calculate-btn");
const age = document.querySelector(".bmr-calculator form #age");
const height = document.querySelector(".bmr-calculator form #height")
const weight = document.querySelector(".bmr-calculator form #weight");
const proteinIntake = document.getElementById("protein-intake");
const carbsIntake = document.getElementById("carbs-intake");
const fatIntake = document.getElementById("fat-intake");

const calculateBMR = (weight, height, age, gender) => {
  if (gender === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5;
  }
  return 10 * weight + 6.25 * height - 5 * age - 161;
};

calculateBtn.addEventListener("click", () => {
  let genderValue = document.querySelector(".bmr-calculator form input[name=gender]:checked").value;

  let BMR = calculateBMR(weight.value, height.value, age.value, genderValue);
  let proteinIntakeValue = (1.2 * weight.value).toFixed(2);
  let carbsIntakeValue = (9 * weight.value).toFixed(2);
  let fatIntakeValue = (0.5 * weight.value).toFixed(2);

  calories.innerHTML = BMR.toLocaleString("en-US");
  proteinIntake.textContent = proteinIntakeValue;
  carbsIntake.textContent = carbsIntakeValue;
  fatIntake.textContent = fatIntakeValue;
  
});
