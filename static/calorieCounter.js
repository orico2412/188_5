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

const foodOptions = {
  bread: { protein: 90, carbs: 490, fat: 32, calories: 2640 },
  pasta: { protein: 50, carbs: 250, fat: 11, calories: 1310 },
  salad: { protein: 12.5, carbs: 32.2, fat: 0.7, calories: 160 },
  rice: { protein: 27, carbs: 280, fat: 3, calories: 1300 },
  pizza: { protein: 110, carbs: 330, fat: 100, calories: 2660 },
  // Add more food options here
};

wrappers.forEach((wrapper) => {
  const foodDropdown = wrapper.querySelector('.food-dropdown');
  const foodWeight = wrapper.querySelector('.food-weight');
  const proteinValue = wrapper.querySelector('.nutrition-value#protein');
  const carbsValue = wrapper.querySelector('.nutrition-value#carbs');
  const fatValue = wrapper.querySelector('.nutrition-value#fat');
  const caloriesValue = wrapper.querySelector('.nutrition-value#calories');
  const calculateBtn = wrapper.querySelector('.calculate-btn');

  calculateBtn.addEventListener('click', () => {
    const selectedFood = foodDropdown.value;
    const weight = parseFloat(foodWeight.value);

    if (selectedFood && weight) {
      const nutritionInfo = foodOptions[selectedFood];
      const protein = nutritionInfo.protein * weight;
      const carbs = nutritionInfo.carbs * weight;
      const fat = nutritionInfo.fat * weight;
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
    }
  });
});
