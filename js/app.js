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
		this._displayCaloriesProgress();
	}

	// public Method Api
	addMeal(meal) {
		this.#meals.push(meal);
		this.#totalCalories += meal.calories;
		this._displayNewMeal(meal);
		this._render();
	}

	addWorkout(workout) {
		this.#workouts.push(workout);
		this.#totalCalories -= workout.calories;
		this._displayNewWorkout(workout);
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
		const progressEl = document.getElementById('calorie-progress');

		caloriesRemainingEl.innerHTML = remaining;

		if (remaining <= 0) {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				'bg-light'
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add(
				'bg-danger'
			);
			progressEl.classList.remove('bg-success');
			progressEl.classList.add('bg-danger');
		} else {
			caloriesRemainingEl.parentElement.parentElement.classList.remove(
				'bg-danger'
			);
			caloriesRemainingEl.parentElement.parentElement.classList.add('bg-light');
			progressEl.classList.remove('bg-danger');
			progressEl.classList.add('bg-success');
		}
	}

	_displayCaloriesProgress() {
		const progressEl = document.getElementById('calorie-progress');
		const percentage = (this.totalCalories / this.caloriesLimit) * 100;

		const width = Math.min(percentage, 100);
		progressEl.style.width = `${width}%`;
	}

	_displayNewMeal(meal) {
		const mealsEl = document.getElementById('meal-items');
		const mealEl = document.createElement('div');
		mealEl.classList.add('card', 'my-2');
		mealEl.setAttribute('data-id', meal.id);
		mealEl.innerHTML = `
		<div class="card-body">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="mx-1">${meal.name}</h4>
				<div
					class="fs-1 bg-primary text-white text-center rounded-2 px-2 px-sm-5"
				>
					${meal.calories}
				</div>
				<button class="delete btn btn-danger btn-sm mx-2">
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	`;

		mealsEl.appendChild(mealEl);
	}

	_displayNewWorkout(workout) {
		const workoutsEl = document.getElementById('workout-items');
		const workoutEl = document.createElement('div');
		workoutEl.classList.add('card', 'my-2');
		workoutEl.setAttribute('data-id', workout.id);
		workoutEl.innerHTML = `
		<div class="card-body">
			<div class="d-flex align-items-center justify-content-between">
				<h4 class="mx-1">${workout.name}</h4>
				<div
					class="fs-1 bg-secondary text-white text-center rounded-2 px-2 px-sm-5"
				>
					${workout.calories}
				</div>
				<button class="delete btn btn-danger btn-sm mx-2">
					<i class="fa-solid fa-xmark"></i>
				</button>
			</div>
		</div>
	`;

		workoutsEl.appendChild(workoutEl);
	}
	_render() {
		this._displayCaloriesTotal();
		this._displayCaloriesConsumed();
		this._displayCaloriesBurned();
		this._displayCaloriesRemaining();
		this._displayCaloriesProgress();
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

class App {
	constructor() {
		this._tracker = new CalorieTracker();
		document
			.getElementById('meal-form')
			.addEventListener('submit', this._newItem.bind(this, 'meal'));

		document
			.getElementById('workout-form')
			.addEventListener('submit', this._newItem.bind(this, 'workout'));
	}

	_newItem(type, e) {
		e.preventDefault();
		const name = document.getElementById(`${type}-name`);
		const calories = document.getElementById(`${type}-calories`);

		// validation
		if (name.value === '' || calories.value === '') {
			alert('Please Fill in all Fields');
			return;
		}

		if (type === 'meal') {
			const meal = new Meal(name.value, +calories.value);
			this._tracker.addMeal(meal);
		} else {
			const workout = new Workout(name.value, +calories.value);
			this._tracker.addWorkout(workout);
		}

		name.value = '';
		calories.value = '';

		const collapseItem = document.getElementById(`collapse-${type}`);
		const bsCollapse = new bootstrap.Collapse(collapseItem, { toggle: true });
	}
}

const app = new App();
