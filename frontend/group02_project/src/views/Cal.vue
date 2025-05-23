<template>
<div class="health-container">
    <div class="calculator-content">
        <div class="calculator-header">
            <h1>Calculate Your Nutrition Needs</h1>
            <p class="subtitle">Fill in your details for a personalized nutrition plan</p>
        </div>

        <form class="form" @submit.prevent="calculate">
            <div class="form-sections">
                <!-- Basic Information Section -->
                <div class="form-section" :class="{'section-active': activeSection === 'basic'}">
                    <h2>Basic Information</h2>
                    <div class="form-group">
                        <label for="height">Height (cm)</label>
                        <div class="input-container">
                            <input id="height" v-model="form.height" type="text" inputmode="decimal" placeholder="Enter your height" @input="limitToTwoDecimalPlaces($event, 'height')" @focus="activeSection = 'basic'" />
                            <div v-if="errors.height" class="error">{{ errors.height }}</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="weight">Weight (kg)</label>
                        <div class="input-container">
                            <input id="weight" v-model="form.weight" type="text" inputmode="decimal" placeholder="Enter your weight" @input="limitToTwoDecimalPlaces($event, 'weight')" @focus="activeSection = 'basic'" />
                            <div v-if="errors.weight" class="error">{{ errors.weight }}</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label>Gender</label>
                        <div class="input-container">
                            <div class="gender-options">
                                <label class="radio-label" :class="{'selected': form.gender === 'Male'}">
                                    <input type="radio" value="Male" v-model="form.gender" @focus="activeSection = 'basic'" />
                                    <span class="radio-text">Male</span>
                                </label>
                                <label class="radio-label" :class="{'selected': form.gender === 'Female'}">
                                    <input type="radio" value="Female" v-model="form.gender" @focus="activeSection = 'basic'" />
                                    <span class="radio-text">Female</span>
                                </label>
                            </div>
                            <div v-if="errors.gender" class="error">{{ errors.gender }}</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="age">Age</label>
                        <div class="input-container">
                            <input id="age" v-model="form.age" type="text" inputmode="numeric" placeholder="Enter your age" @input="filterIntegerInput($event, 'age')" @focus="activeSection = 'basic'" />
                            <div v-if="errors.age" class="error">{{ errors.age }}</div>
                        </div>
                    </div>
                </div>

                <!-- Fitness Details Section -->
                <div class="form-section" :class="{'section-active': activeSection === 'fitness'}">
                    <h2>Fitness Details</h2>
                    <div class="form-group">
                        <label for="formula">BMR Formula</label>
                        <div class="input-container">
                            <select id="formula" v-model="form.formula" @focus="activeSection = 'fitness'">
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
                            <select id="activity" v-model="form.activity" @focus="activeSection = 'fitness'">
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
                        <label for="bodyFat">Body Fat %</label>
                        <div class="input-container">
                            <input 
                                id="bodyFat" 
                                v-model="form.bodyFat" 
                                type="text" 
                                inputmode="decimal" 
                                :placeholder="
                                    form.formula === 'Katch-McArdle' 
                                        ? 'Enter your body fat percentage' 
                                        : form.formula 
                                            ? 'Enter your body fat percentage (optional)'
                                            : 'Enter your body fat percentage'
                                " 
                                @input="limitToTwoDecimalPlaces($event, 'bodyFat')" 
                                @focus="activeSection = 'fitness'" 
                            />
                            <div v-if="errors.bodyFat" class="error">{{ errors.bodyFat }}</div>
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="goal">Goal</label>
                        <div class="input-container">
                            <select id="goal" v-model="form.goal" @focus="activeSection = 'fitness'">
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

            <button type="submit" class="submit-button" :class="{'pulse': formComplete}">
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
                fat: null,
                goal: null
            },
            activeSection: null
        };
    },// get user data from the server
    created() {
      this.fetchUserData();
    },
    mounted() {
        // animate the calculator content on mount
        requestAnimationFrame(() => {
            this.activeSection = 'basic';
            document.querySelector('.calculator-content').classList.add('show');
        });
    },
    methods: {
        //check if the input is a valid number with two decimal places
        isValidTwoDecimal(val) {
            return /^\d+(\.\d{1,2})?$/.test(val) && parseFloat(val) > 0;
        },
        //check if the input is a positive integer
        isPositiveInteger(val) {
            return /^\d+$/.test(val) && parseInt(val) > 0;
        },
        //limit the input to two decimal places
        limitToTwoDecimalPlaces(event, field) {
            let raw = event.target.value;
            const match = raw.match(/^\d*\.?\d{0,2}/);
            event.target.value = match ? match[0] : '';
            this.form[field] = event.target.value;
        },
        //filter the input to allow only integers
        filterIntegerInput(event, field) {
            let raw = event.target.value.replace(/\D/g, '');
            if (raw !== '' && parseInt(raw) === 0) raw = '';
            event.target.value = raw;
            this.form[field] = raw;
        },
        // check if the form is valid
        validateForm() {
            this.errors = {};

            if (!this.isValidTwoDecimal(this.form.height)) {
                this.errors.height = 'Please enter a valid height.';
            } else {
                // Check if height is within the range of 100-300 cm
                const height = parseFloat(this.form.height);
                if (height < 100 || height > 300) {
                    this.errors.height = 'Height must be between 100-300 cm.';
                }
            }

            if (!this.isValidTwoDecimal(this.form.weight)) {
                this.errors.weight = 'Please enter a valid weight.';
            } else {
                // Check if weight is within the range of 20-600 kg
                const weight = parseFloat(this.form.weight);
                if (weight < 20 || weight > 600) {
                    this.errors.weight = 'Weight must be between 20-600 kg.';
                }
            }

            if (!this.form.gender) this.errors.gender = 'Please select your gender.';

            if (!this.isPositiveInteger(this.form.age)) {
                // Check if age is a positive integer
                this.errors.age = 'Please enter a valid age.';
            } else {
                // Check if age is within the range of 10-120 years
                const age = parseInt(this.form.age);
                if (age < 10 || age > 120) {
                    this.errors.age = 'Age must be between 10-120 years.';
                }
            }
            // Check if the formula is not selected
            if (!this.form.formula) this.errors.formula = 'Please choose a BMR formula.';
            // Check if the activity level is not selected
            if (!this.form.activity) this.errors.activity = 'Please select your activity level.';
            // Check if the goal is not selected
            if (!this.form.goal) this.errors.goal = 'Please select your goal.';
            // Check if the body fat percentage is valid
            if (this.form.bodyFat !== '') {
                if (!this.isValidTwoDecimal(this.form.bodyFat)) {
                    this.errors.bodyFat = 'Please enter a valid body fat percentage.';
                } else if (parseFloat(this.form.bodyFat) > 90) {
                    this.errors.bodyFat = 'Body fat % cannot exceed 90%.';
                }
            } else if (this.form.formula === 'Katch-McArdle') {
                this.errors.bodyFat = 'Please enter your Body fat %.';
            }
            // if errors exist, shake the error fields
            if (Object.keys(this.errors).length > 0) {
                this.shakeErrorFields();
            }

            return Object.keys(this.errors).length === 0;
        },
        // shake the error fields
        shakeErrorFields() {
            setTimeout(() => {
                const errorFields = document.querySelectorAll('.error');
                errorFields.forEach(field => {
                    const input = field.previousElementSibling;
                    if (input) {
                        input.classList.add('shake');
                        setTimeout(() => {
                            input.classList.remove('shake');
                        }, 500);
                    }
                });
            }, 100);
        },
        // get user data from the server
        async fetchUserData() {
        try {
            const userId = sessionStorage.getItem('userid');
            const res = await axios.get(`http://localhost:3000/users/${userId}`, {
                headers: {
                    Authorization: `Bearer ${sessionStorage.getItem('token')}`
                }
            });
            const data = res.data;

            this.form = {
                height: data.Height || '',
                weight: data.Weight || '',
                gender: data.Gender || '',
                age: data.Age || '',
                formula: data.formula || '',
                activity: data.Activity || '',
                bodyFat: data.bodyFat || '',
                goal: data.Goal || ''
            };
        } catch (error) {
            // Handle error server response
            console.error('Error fetching user data:', error);
        }
        },
        // calculate the BMR and TDEE
        async calculate() {
            if (!this.validateForm()) return;

            const button = document.querySelector('.submit-button');
            button.classList.add('loading');
            button.innerHTML = 'Calculating...';

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
                this.result.goal = this.form.goal;
                // if logged in, save the user data
                const token = sessionStorage.getItem('token');
                if (token) {
                  await this.saveUserData();
                }
                // navigate to the results page
                this.navigateToResults();
            } catch (error) {
                console.error('Calculation error:', error);
                alert('Error calculating nutrition needs: ' + (error.response && error.response.data ? error.response.data.message : error.message));

                button.classList.remove('loading');
                button.innerHTML = 'Calculate <i class="fas fa-calculator"></i>';
            }
        },
        // save the user data to the server
        async saveUserData() {
            try {
                const userId = sessionStorage.getItem('userid');
                if (!userId) {
                  console.warn('No userId found in sessionStorage');
                  return;
              }
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
                    Calories_Perday: this.result.caloriesPerDay,
                };
                const token = sessionStorage.getItem("token");
                // Check if token is available
                await axios.post(`http://localhost:3000/users/${userId}`, userData,{
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                this.navigateToResults();
            } catch (error) {
                console.error('Save user data error:', error);
                alert('Error saving your data: ' + (error.response && error.response.data ? error.response.data.message : error.message));
            }
        },
        // navigate to the results page
        navigateToResults() {
            try {
                document.querySelector('.calculator-content').classList.add('slide-out');
                setTimeout(() => {
                    sessionStorage.setItem('result', JSON.stringify(this.result));
                    this.$router.push('/result');
                }, 500);
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
    background-image: linear-gradient(120deg, #e2fcd6 0%, #c1f0d9 100%);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5rem;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    opacity: 1;
    transition: opacity 0.3s ease;
}

.calculator-content {
    width: 100%;
    max-width: 1000px;
    border-radius: 20px;
    padding: 2.5rem;
    background-color: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
    opacity: 0;
    transform: translateY(10px);
    transition: opacity 0.3s ease-out, transform 0.3s ease-out;
}

.calculator-content.show {
    opacity: 1;
    transform: translateY(0);
}

.calculator-content:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(76, 175, 80, 0.1) 100%);
    opacity: 0;
    transition: opacity 0.5s ease;
    z-index: -1;
    border-radius: 20px;
}

.calculator-content:hover:before {
    opacity: 1;
}

.calculator-content:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

@keyframes slideIn {
    0% {
        opacity: 0;
        transform: translateY(20px);
    }

    100% {
        opacity: 1;
        transform: translateY(0);
    }
}

.slide-out {
    transform: translateY(-20px);
    opacity: 0;
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
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    position: relative;
    display: inline-block;
    transition: transform 0.3s ease;
}

.calculator-content:hover .calculator-header h1 {
    transform: scale(1.02);
}

.calculator-header h1:after {
    content: '';
    position: absolute;
    width: 70%;
    height: 3px;
    background: linear-gradient(90deg, transparent, #14967F, transparent);
    bottom: -10px;
    left: 15%;
    border-radius: 2px;
}

.subtitle {
    color: #666;
    font-size: 1.1rem;
    margin-top: 1rem;
    transition: color 0.3s ease;
}

.calculator-content:hover .subtitle {
    color: #14967F;
}

.form-sections {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 5rem;
    margin-bottom: 2rem;
    align-items: stretch;
}

.form-section {
    display: flex;
    flex-direction: column;
    min-height: 100%;
    background: rgba(255, 255, 255, 0.8);
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    border: 2px solid #14967F;
    position: relative;
    overflow: hidden;
}

.form-section:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 20px rgba(20, 150, 127, 0.15);
}

.form-section:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #14967F, #4CAF50);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s ease;
}

.form-section:hover:after {
    transform: scaleX(1);
}

.section-active {
    border-color: #14967F;
    box-shadow: 0 8px 20px rgba(20, 150, 127, 0.15);
}

.form-group {
    margin-bottom: 1.5rem;
}

.form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: #333;
    transition: color 0.3s ease;
}

.form-section:hover .form-group label {
    color: #0A5F4B;
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
    transition: all 0.3s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    background-color: white;
}

.input-container select,
.input-container select option[disabled] {
    color: #666;
}

.input-container select option,
.input-container select:focus {
    color: #000;
}

.input-container select:has(option:checked:not([disabled])) {
    color: #000;
}

.input-container input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px white inset !important;
    -webkit-text-fill-color: #000 !important;
}

.input-container input:hover,
.input-container select:hover {
    border-color: #4CAF50;
    box-shadow: 0 0 0 2px rgba(76, 175, 80, 0.1);
}

.input-container input:focus,
.input-container select:focus {
    outline: none;
    border-color: #4CAF50;
    box-shadow: 0 0 0 3px rgba(76, 175, 80, 0.2);
    transform: translateY(-2px);
}

.shake {
    animation: shake 0.5s cubic-bezier(.36, .07, .19, .97) both;
    border-color: #ff6b6b !important;
}

@keyframes shake {

    10%,
    90% {
        transform: translateX(-1px);
    }

    20%,
    80% {
        transform: translateX(2px);
    }

    30%,
    50%,
    70% {
        transform: translateX(-4px);
    }

    40%,
    60% {
        transform: translateX(4px);
    }
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
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    transition: all 0.3s ease;
    background-color: rgba(255, 255, 255, 0.7);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.radio-label:hover {
    background-color: white;
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(20, 150, 127, 0.15);
}

.radio-label.selected {
    background-color: white;
    box-shadow: 0 2px 6px rgba(20, 150, 127, 0.2);
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
    animation: fadeIn 0.3s ease;
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
    transition: all 0.3s ease;
    box-shadow: 0 4px 10px rgba(20, 150, 127, 0.3);
    position: relative;
    overflow: hidden;
}

.submit-button:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
    transform: translateX(-100%);
}

.submit-button:hover {
    background: rgb(12, 126, 105);
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(20, 150, 127, 0.4);
}

.submit-button:hover:before {
    animation: shine 1.5s infinite;
}

@keyframes shine {
    100% {
        transform: translateX(100%);
    }
}

.submit-button:active {
    transform: translateY(0);
}

.submit-button i {
    margin-left: 0.5rem;
}

.pulse {
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0% {
        box-shadow: 0 0 0 0 rgba(20, 150, 127, 0.5);
    }

    70% {
        box-shadow: 0 0 0 10px rgba(20, 150, 127, 0);
    }

    100% {
        box-shadow: 0 0 0 0 rgba(20, 150, 127, 0);
    }
}

.loading {
    position: relative;
    cursor: wait;
}

@media (max-width: 768px) {
    .health-container {
        padding: 2rem;
    }

    .form-sections {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .calculator-content {
        padding: 1.5rem;
    }

    .calculator-header h1 {
        font-size: 2rem;
    }

    .radio-label {
        padding: 0.5rem 1rem;
    }
}
</style>