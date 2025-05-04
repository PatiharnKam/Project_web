<template>
    <div class="form-container">
      <h2>Calculate Your BMR</h2>
      <form @submit.prevent="calculate">
        <label>Height (cm)</label>
        <input v-model.number="Info.Height" type="number" placeholder="Enter height..." />
  
        <label>Weight (kg)</label>
        <input v-model.number="Info.Weight" type="number" placeholder="Enter weight..." />
  
        <label>Gender</label>
        <select v-model="Info.Gender">
          <option disabled value="">Select gender</option>
          <option>Male</option>
          <option>Female</option>
        </select>
  
        <label>Age</label>
        <input v-model.number="Info.Age" type="number" placeholder="Enter age..." />
  
        <label>Formula</label>
        <select v-model="Info.formula">
          <option disabled value="">Select formula</option>
          <option value="mifflin">Mifflin-St Jeor</option>
          <option value="harris">Harris-Benedict</option>
          <option value="revised_harris">Revised Harris-Benedict</option>
          <option value="katch_mcardle">Katch-McArdle</option>
        </select>
  
        <label>Activity Level</label>
        <select v-model="Info.Activity">
          <option disabled value="">Select activity level</option>
          <option value="sedentary">Sedentary</option>
          <option value="light">Lightly active</option>
          <option value="moderate">Moderately active</option>
          <option value="very-active">Very active</option>
          <option value="super-active">Super active</option>
        </select>
  
        <label>Body Fat (%)</label>
        <input v-model.number="Info.Fat_Percent" type="number" placeholder="Optional (for Katch-McArdle)" />
  
        <label>Goal</label>
        <select v-model="Info.Goal">
          <option value="maintain-weight">Maintain Weight</option>
          <option value="lose-fat">Lose Fat</option>
          <option value="gain-muscle">Gain Muscle</option>
        </select>
  
        <button type="submit">Calculate BMR</button>
      </form>
  
      <div v-if="BMR !== null" class="result">
        <h3>Your BMR is: {{ BMR }} kcal/day</h3>
        <h3>Your TDEE is: {{ TDEE }} kcal/day</h3>
      </div>
      <div v-if ="Calories_Perday !== null" class="result">
        <h3>Following Your Goal</h3><br>
        <h3>Calories Per Day: {{ Calories_Perday }} kcal/day</h3>
      </div>
      <div v-if ="Protein !== null && Carbs !== null && Fat !== null " class="result">
        <h3>Macros</h3><br>
        <h3>Protein: {{ Protein }} g/day</h3><br>
        <h3>Carbs: {{ Carbs }} g/day</h3><br>
        <h3>Fat: {{ Fat }} g/day</h3><br>
      </div>
    </div>
</template>
  
<script>
import axios from 'axios';
  
export default {
    name: 'Test',
    data() {
      return {
        Info: {
          Height: '',
          Weight: '',
          Gender: '',
          Age: '',
          formula: '',
          Activity: '',
          Fat_Percent: '',
          Goal: ''
        },
        BMR: null,
        TDEE: null,
        Calories_Perday: null,
        Protein: null,
        Carbs: null,
        Fat: null
      };
    },
    methods: {
      async calculate() {
        try {
          const res = await axios.post('http://localhost:3000/users/cal', {
            Gender: this.Info.Gender,
            Weight: this.Info.Weight,
            Height: this.Info.Height,
            Age: this.Info.Age,
            Activity: this.Info.Activity,
            Fat_Percent: this.Info.Fat_Percent,
            Goal: this.Info.Goal,
            formula: this.Info.formula
          });
          this.BMR = res.data.bmr;
          this.TDEE = res.data.tdee;
          this.Calories_Perday = res.data.calories_per_day;
          this.Protein = res.data.protein;
          this.Carbs = res.data.carbs;
          this.Fat = res.data.fat;
          await this.userModel();
        } catch (error) {
          alert('Error calculating BMR: ' + error.response?.data?.message || error.message);
        }
      },
      async userModel() {
        try {
            const res = await axios.post('http://localhost:3000/users/',{
            Gender: this.Info.Gender,
            Weight: this.Info.Weight,
            Height: this.Info.Height,
            Age: this.Info.Age,
            Activity: this.Info.Activity,
            Fat_Percent: this.Info.Fat_Percent,
            Goal: this.Info.Goal,  
            BMR: this.BMR,
            TDEE: this.TDEE,
            Calories_Perday: this.Calories_Perday
          });
        } catch (error) {
            alert('Error saving user model: ' + error.response?.data?.message || error.message);
        }
      }
    }
};
</script>
  
<style scoped>
.form-container {
    max-width: 600px;
    margin: 50px auto;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    font-family: 'Segoe UI', sans-serif;
}
  
form {
    display: flex;
    flex-direction: column;
    gap: 15px;
}
  
label {
    font-weight: bold;
    margin-bottom: 5px;
}
  
input, select {
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 6px;
}
  
button {
    margin-top: 10px;
    padding: 12px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
}
  
button:hover {
    background-color: #0056b3;
}
  
.result {
    margin-top: 20px;
    padding: 15px;
    background: #e0ffe0;
    border: 1px solid #a0dca0;
    border-radius: 6px;
    text-align: center;
}
</style>
  