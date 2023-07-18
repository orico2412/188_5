const wrappers = document.querySelectorAll('.wrapper-calorie');
const totalProteinValue = document.getElementById('total-protein');
const totalCarbsValue = document.getElementById('total-carbs');
const totalFatValue = document.getElementById('total-fat');
const totalCaloriesValue = document.getElementById('total-calories');

// Define the initial total values
let totalProtein = 0;
let totalCarbs = 0;
let totalFat = 0;
let totalCalories = 0;

let foodOptions = {};

const fetchFoodOptions = async () => {
try {
  const response = await fetch('/foodOptions');
  if (response.ok) {
    foodOptions = await response.json();
    populateFoodDropdowns();
  } else {
    console.log('Error fetching food options:', response.status);
  }
} catch (error) {
  console.log('Error fetching food options:', error);
}
};

const populateFoodDropdowns = () => {
const foodDropdowns = document.querySelectorAll('.food-dropdown');
foodDropdowns.forEach((dropdown) => {
  foodOptions.forEach((food) => {
    const option = document.createElement('option');
    option.value = food;
    option.textContent = food;
    dropdown.appendChild(option);
  });
});
};

const calculateNutrition = async (selectedFood, weight, proteinValue, carbsValue, fatValue, caloriesValue) => {
if (selectedFood && weight) {
  try {
    const response = await fetch(`/foodTable/${selectedFood}`);
    if (response.ok) {
      const nutritionInfo = await response.json();
      const protein = nutritionInfo.proteins * weight;
      const carbs = nutritionInfo.carbs * weight;
      const fat = nutritionInfo.fats * weight;
      const calories = nutritionInfo.calories * weight;

      proteinValue.textContent = protein.toFixed(2) + 'g';
      carbsValue.textContent = carbs.toFixed(2) + 'g';
      fatValue.textContent = fat.toFixed(2) + 'g';
      caloriesValue.textContent = calories.toFixed(2);

      // Update the total values
      totalProtein += protein;
      totalCarbs += carbs;
      totalFat += fat;
      totalCalories += calories;

      // Update the total nutrition values in the summary section
      totalProteinValue.textContent = totalProtein.toFixed(2) + 'g';
      totalCarbsValue.textContent = totalCarbs.toFixed(2) + 'g';
      totalFatValue.textContent = totalFat.toFixed(2) + 'g';
      totalCaloriesValue.textContent = totalCalories.toFixed(2);
    } else {
      console.log('Error fetching nutrition info:', response.status);
    }
  } catch (error) {
    console.log('Error fetching nutrition info:', error);
  }
}
};


wrappers.forEach((wrapper) => {
const foodDropdown = wrapper.querySelector('.food-dropdown');
const foodWeight = wrapper.querySelector('.food-weight');
const proteinValue = wrapper.querySelector('.nutrition-value#proteins');
const carbsValue = wrapper.querySelector('.nutrition-value#carbs');
const fatValue = wrapper.querySelector('.nutrition-value#fat');
const caloriesValue = wrapper.querySelector('.nutrition-value#calories');
const calculateBtn = wrapper.querySelector('.calculate-btn');

calculateBtn.addEventListener('click', () => {
  const selectedFood = foodDropdown.value;
  const weight = parseFloat(foodWeight.value);

  if (weight < 0) {
    alert('Please enter a positive value for food weight.');
    return; // Stop further execution
  }

  calculateNutrition(selectedFood, weight, proteinValue, carbsValue, fatValue, caloriesValue);
});
});
// Fetch the food options when the page loads
fetchFoodOptions();
