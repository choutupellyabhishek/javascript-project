
const searchBtn = document.getElementById('search-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

// Event listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);
recipeCloseBtn.addEventListener('click', () => {
  mealDetailsContent.parentElement.classList.remove('showRecipe');
});

// Fetch meals based on category
function getMealList() {
  let searchInputTxt = document.getElementById('search-input').value.trim();
  
  
  if (searchInputTxt.toLowerCase() === 'dessert') {
    fetch(`https://separated-polarized-drink.glitch.me
`)
      .then(response => response.json())
      .then(data => {
        let html = "";
        if (data.meals) {
          data.meals.forEach(meal => {
            html += `
              <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                  <img src="${meal.strMealThumb}" alt="Meal">
                </div>
                <div class="meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
              </div>
            `;
          });
          mealList.classList.remove('notFound');
        } else {
          html = "Sorry, we didn't find any desserts!";
          mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
      });
  } else {
    // Fetch meals based on ingredient
    fetch(`https://separated-polarized-drink.glitch.me${searchInputTxt}`)
      .then(response => response.json())
      .then(data => {
        let html = "";
        if (data.meals) {
          data.meals.forEach(meal => {
            html += `
              <div class="meal-item" data-id="${meal.idMeal}">
                <div class="meal-img">
                  <img src="${meal.strMealThumb}" alt="Meal">
                </div>
                <div class="meal-name">
                  <h3>${meal.strMeal}</h3>
                  <a href="#" class="recipe-btn">Get Recipe</a>
                </div>
              </div>
            `;
          });
          mealList.classList.remove('notFound');
        } else {
          html = "Sorry, we didn't find any meal!";
          mealList.classList.add('notFound');
        }
        mealList.innerHTML = html;
      });
  }
}

// Fetch full meal recipe by ID
function getMealRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains('recipe-btn')) {
    let mealItem = e.target.parentElement.parentElement;
    let mealId = mealItem.dataset.id;

    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => mealRecipeModal(data.meals[0]));
  }
}

// Show meal details in modal
function mealRecipeModal(meal) {
  let html = `
    <h2 class="recipe-title">${meal.strMeal}</h2>
    <p class="recipe-category">${meal.strCategory}</p>
    <div class="recipe-instruct">
      <h3>Instructions:</h3>
      <p>${meal.strInstructions}</p>
    </div>
    <div class="recipe-meal-img">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
    </div>
    <div class="recipe-link">
      <a href="${meal.strYoutube}" target="_blank">Watch Video</a>
    </div>
  `;
  mealDetailsContent.innerHTML = html;
  mealDetailsContent.parentElement.classList.add('showRecipe');
}
