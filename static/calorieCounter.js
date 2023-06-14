const wrappers = document.querySelectorAll('.wrapper-calorie');
wrappers.forEach((wrapper) => {
    const foodDropdown = wrapper.querySelector('.food-dropdown');
    const foodWeight = wrapper.querySelector('.food-weight');
    const proteinValue = wrapper.querySelector('#protein');
    const carbsValue = wrapper.querySelector('#carbs');
    const fatValue = wrapper.querySelector('#fat');
    const caloriesValue = wrapper.querySelector('#calories');
    const calculateBtn = wrapper.querySelector('.calculate-btn');

    // Define the food options and their nutrition information
    const foodOptions = {
        bread: { protein: 90, carbs: 490, fat: 32, calories: 2640 },
        pasta: { protein: 15, carbs: 25, fat: 8, calories: 200 },
        salad: { protein: 15, carbs: 25, fat: 8, calories: 200 },
        rice: { protein: 15, carbs: 25, fat: 8, calories: 200 },
        pizza: { protein: 15, carbs: 25, fat: 8, calories: 200 },

        // Add more food options here
    };

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
        }
    });
});