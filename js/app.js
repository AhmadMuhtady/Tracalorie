class CalorieTracker {
	#calorieLimit = 2000;
	#totalCalories = 0;
	#meals = [];
	#workouts = [];
	constructor() {
		this._displayCaloriesTotal();
		this._displayCaloriesLimit();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
	}

	// public Method Api
	addMeal(meal) {
		this.#meals.push(meal);
		this.#totalCalories += meal.calories;
		this._render();
	}

	addWorkout(workout) {
		this.#workouts.push(workout);
		this.#totalCalories -= workout.calories;
		this._render();
	}

	get caloriesLimit() {
		return this.#calorieLimit;
	}

	get totalCalories() {
		return this.#totalCalories;
	}

	get meals() {
		return this.#meals;
	}

	get workouts() {
		return this.#workouts;
	}

	// private method
	_displayCaloriesTotal() {
		const totalCaloriesEl = document.getElementById('calories-total');
		totalCaloriesEl.innerHTML = this.totalCalories;
	}

	_displayCaloriesLimit() {
		const caloriesLimitEl = document.getElementById('calories-limit');
		caloriesLimitEl.innerHTML = this.#calorieLimit;
	}

	_displayCaloriesConsumed() {
		const caloriesConsumedEl = document.getElementById('calories-consumed');

		const consumed = this.meals.reduce(
			(total, meal) => total + meal.calories,
			0
		);

		caloriesConsumedEl.innerHTML = consumed;
	}

	_displayCaloriesBurned() {
		const caloriesBurnedEl = document.getElementById('calories-burned');

		const burned = this.workouts.reduce(
			(total, workout) => total + workout.calories,
			0
		);

		caloriesBurnedEl.innerHTML = burned;
	}

	_displayCaloriesRemaining() {
		const caloriesRemainingEl = document.getElementById('calories-remaining');

		const remaining = this.caloriesLimit - this.totalCalories;

		caloriesRemainingEl.innerHTML = remaining;
	}

	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
	}
}

class Meal {
	constructor(name, calories) {
		this.id = Math.random().toString(16).slice(2); // get random ID and slice to remove the first (0.)
		this.name = name;
		this.calories = calories;
	}
}

class Workout {
	constructor(name, calories) {
		this.id = crypto.randomUUID(); // different way to get random ID
		this.name = name;
		this.calories = calories;
	}
}

const tracker = new CalorieTracker();

const breakfast = new Meal('Breakfast', 400);
tracker.addMeal(breakfast);

const lunch = new Meal('lunch', 450);
tracker.addMeal(lunch);

const run = new Workout('Morning Run', 400);
tracker.addWorkout(run);

console.log(tracker.meals);
console.log(tracker.workouts);
console.log(tracker.totalCalories);
