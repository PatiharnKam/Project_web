<template>
  <div class="health-container">
    <div class="calculator-content">
      <div class="calculator-header">
        <h1>Calculate Your Nutrition Needs</h1>
        <p class="subtitle">Fill in your details for a personalized nutrition plan</p>
      </div>

      <form class="form" @submit.prevent="calculate">
        <div class="form-sections">
          <div class="form-section">
            <h2>Basic Information</h2>
            <div class="form-group">
              <label for="height">Height (cm)</label>
              <div class="input-container">
                <input 
                  id="height"
                  v-model="form.height" 
                  type="text" 
                  inputmode="decimal" 
                  placeholder="Enter your height" 
                  @input="limitToTwoDecimalPlaces($event, 'height')" 
                />
                <div v-if="errors.height" class="error">{{ errors.height }}</div>
              </div>
            </div>

            <div class="form-group">
              <label for="weight">Weight (kg)</label>
              <div class="input-container">
                <input 
                  id="weight"
                  v-model="form.weight" 
                  type="text" 
                  inputmode="decimal" 
                  placeholder="Enter your weight" 
                  @input="limitToTwoDecimalPlaces($event, 'weight')" 
                />
                <div v-if="errors.weight" class="error">{{ errors.weight }}</div>
              </div>
            </div>

            <div class="form-group">
              <label>Gender</label>
              <div class="input-container">
                <div class="gender-options">
                  <label class="radio-label">
                    <input type="radio" value="Male" v-model="form.gender" />
                    <span class="radio-text">Male</span>
                  </label>
                  <label class="radio-label">
                    <input type="radio" value="Female" v-model="form.gender" />
                    <span class="radio-text">Female</span>
                  </label>
                </div>
                <div v-if="errors.gender" class="error">{{ errors.gender }}</div>
              </div>
            </div>

            <div class="form-group">
              <label for="age">Age</label>
              <div class="input-container">
                <input 
                  id="age"
                  v-model="form.age" 
                  type="text" 
                  inputmode="numeric" 
                  placeholder="Enter your age" 
                  @input="filterIntegerInput($event, 'age')" 
                />
                <div v-if="errors.age" class="error">{{ errors.age }}</div>
              </div>
            </div>
          </div>

          <div class="form-section">
            <h2>Fitness Details</h2>
            <div class="form-group">
              <label for="formula">BMR Formula</label>
              <div class="input-container">
                <select id="formula" v-model="form.formula" required>
                  <option value="" disabled hidden>Select a formula</option>
                  <option value="Mifflin-St Jeor">Mifflin-St Jeor</option>
                  <option value="Revised Harris-Benedict">Revised Harris-Benedict</option>
                  <option value="Katch-McArdle">Katch-McArdle</option>
                </select>
                <div v-if="errors.formula" class="error">{{ errors.formula }}</div>
              </div>
            </div>

            <div class="form-group">
              <label for="activity">Activity Level</label>
              <div class="input-container">
                <select id="activity" v-model="form.activity" required>
                  <option value="" disabled hidden>Select your activity level</option>
                  <option value="Sedentary">Sedentary (little or no exercise)</option>
                  <option value="Light">Light (exercise 1-3 times/week)</option>
                  <option value="Moderate">Moderate (exercise 4-5 times/week)</option>
                  <option value="Very-Active">Very Active (intense exercise 6-7 times/week)</option>
                  <option value="Extra-Active">Extra Active (very intense exercise daily)</option>
                </select>
                <div v-if="errors.activity" class="error">{{ errors.activity }}</div>
              </div>
            </div>

            <div class="form-group">
              <label for="bodyFat">Body Fat % <span class="optional">(optional)</span></label>
              <div class="input-container">
                <input 
                  id="bodyFat"
                  v-model="form.bodyFat" 
                  type="text" 
                  inputmode="decimal" 
                  placeholder="Enter your body fat percentage" 
                  @input="limitToTwoDecimalPlaces($event, 'bodyFat')" 
                />
                <div v-if="errors.bodyFat" class="error">{{ errors.bodyFat }}</div>
              </div>
            </div>

            <div class="form-group">
              <label for="goal">Goal</label>
              <div class="input-container">
                <select id="goal" v-model="form.goal" required>
                  <option value="" disabled hidden>Select your goal</option>
                  <option value="maintain-weight">Maintain Weight</option>
                  <option value="lose-fat">Lose Fat</option>
                  <option value="gain-muscle">Gain Muscle</option>
                </select>
                <div v-if="errors.goal" class="error">{{ errors.goal }}</div>
              </div>
            </div>
          </div>
        </div>

        <button type="submit" class="submit-button">
          Calculate
          <i class="fas fa-calculator"></i>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HealthCalculator',
  data() {
    return {
      form: {
        height: '',
        weight: '',
        gender: '',
        age: '',
        formula: '',
        activity: '',
        bodyFat: '',
        goal: ''
      },
      errors: {},
      result: {
        bmr: null,
        tdee: null,
        caloriesPerDay: null,
        protein: null,
        carbs: null,
        fat: null
      }
    };
  },
  methods: {
    isValidTwoDecimal(val) {
      return /^\d+(\.\d{1,2})?$/.test(val) && parseFloat(val) > 0;
    },
    isPositiveInteger(val) {
      return /^\d+$/.test(val) && parseInt(val) > 0;
    },
    limitToTwoDecimalPlaces(event, field) {
      let raw = event.target.value;
      const match = raw.match(/^\d*\.?\d{0,2}/);
      event.target.value = match ? match[0] : '';
      this.form[field] = event.target.value;
    },
    filterIntegerInput(event, field) {
      let raw = event.target.value.replace(/\D/g, '');
      if (raw !== '' && parseInt(raw) === 0) raw = '';
      event.target.value = raw;
      this.form[field] = raw;
    },
    validateForm() {
      this.errors = {};

      if (!this.isValidTwoDecimal(this.form.height)) this.errors.height = 'Please enter a valid height.';
      if (!this.isValidTwoDecimal(this.form.weight)) this.errors.weight = 'Please enter a valid weight.';
      if (!this.form.gender) this.errors.gender = 'Please select your gender.';
      if (!this.isPositiveInteger(this.form.age)) this.errors.age = 'Please enter a valid age.';
      if (!this.form.formula) this.errors.formula = 'Please choose a BMR formula.';
      if (!this.form.activity) this.errors.activity = 'Please select your activity level.';
      if (!this.form.goal) this.errors.goal = 'Please select your goal.';
      if (this.form.bodyFat && !this.isValidTwoDecimal(this.form.bodyFat)) this.errors.bodyFat = 'Please enter a valid body fat percentage.';

      return Object.keys(this.errors).length === 0;
    },
    async calculate() {
      if (!this.validateForm()) return;

      try {
        const formData = {
          Height: this.form.height,
          Weight: this.form.weight,
          Gender: this.form.gender,
          Age: this.form.age,
          formula: this.form.formula,
          Activity: this.form.activity,
          bodyFat: this.form.bodyFat,
          Goal: this.form.goal
        };

        const res = await axios.post('http://localhost:3000/users/cal', formData);

        this.result.bmr = res.data.bmr;
        this.result.tdee = res.data.tdee;
        this.result.caloriesPerDay = res.data.calories_per_day;
        this.result.protein = res.data.protein;
        this.result.carbs = res.data.carbs;
        this.result.fat = res.data.fat;

        await this.saveUserData();
      } catch (error) {
        console.error('Calculation error:', error);
        alert('Error calculating nutrition needs: ' + (error.response?.data?.message || error.message));
      }
    },
    async saveUserData() {
      try {
        const userData = {
          Height: this.form.height,
          Weight: this.form.weight,
          Gender: this.form.gender,
          Age: this.form.age,
          formula: this.form.formula,
          Activity: this.form.activity,
          bodyFat: this.form.bodyFat,
          Goal: this.form.goal,
          BMR: this.result.bmr,
          TDEE: this.result.tdee,
          Calories_Perday: this.result.caloriesPerDay
        };

        await axios.post('http://localhost:3000/users/', userData);
        this.navigateToResults();
      } catch (error) {
        console.error('Save user data error:', error);
        alert('Error saving your data: ' + (error.response?.data?.message || error.message));
      }
    },
    navigateToResults() {
      try {
        sessionStorage.setItem('result', JSON.stringify(this.result));
        this.$router.push('/result');
      } catch (error) {
        console.error('Navigation error:', error);
        alert('Error navigating to results: ' + error.message);
      }
    }
  }
};
</script>

<style scoped>
.health-container {
  min-height: 100vh;
  width: inherit;
  background-color: #e2fcd6;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 5rem;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.calculator-content {
  width: 100%;
  max-width: 1000px;
  border-radius: 20px;
  padding: 2.5rem;
  animation: slideIn 0.5s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.calculator-header {
  text-align: center;
  margin-bottom: 2rem;
}

.calculator-header h1 {
  color: #0A5F4B;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.form-sections {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 5rem;
  margin-bottom: 2rem;
}

.form-section {
  background: rgba(255, 255, 255, 0.8);
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #333;
}

.input-container {
  position: relative;
}

.input-container input,

.input-container select {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: border-color 0.3s;
  color: #000;
}

.input-container select:invalid {
  color: #999;
}

.input-container select option:not([value=""]) {
  color: #000;
}

.input-container input:focus,
.input-container select:focus {
  outline: none;
  border-color: #4CAF50;
  box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.2);
}

.gender-options {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  justify-content: center;
}

.radio-label {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.radio-label input[type="radio"] {
  margin-right: 0.5rem;
  cursor: pointer;
  width: auto;
}

.optional {
  color: #999;
  font-size: 0.85rem;
  font-weight: normal;
}

.error {
  color: #d32f2f;
  font-size: 0.85rem;
  margin-top: 0.25rem;
}

.submit-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  padding: 1rem;
  background: #14967F;
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.2s;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.submit-button:hover {
  background:rgb(12, 126, 105);
  transform: translateY(-2px);
}

.submit-button:active {
  transform: translateY(0);
}

.submit-button i {
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .form-sections {
    grid-template-columns: 1fr;
  }
  
  .calculator-content {
    padding: 1.5rem;
  }
  
  .calculator-header h1 {
    font-size: 2rem;
  }
}
</style>