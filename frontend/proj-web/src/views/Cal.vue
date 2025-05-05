<template>
<div class="health-container">
    <div class="left">
        <img :src="personImage" alt="Person" class="person-image" />
    </div>
    <div class="right">
        <form class="form" @submit.prevent="calculate">
            <div class="form-group">
                <label>Height (cm)</label>
                <div style="flex: 1">
                    <input v-model="form.Height" type="text" inputmode="decimal" placeholder="Enter your height" @input="limitToTwoDecimalPlaces($event, 'height')" />
                    <div v-if="errors.Height" class="error">{{ errors.Height }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Weight (kg)</label>
                <div style="flex: 1">
                    <input v-model="form.Weight" type="text" inputmode="decimal" placeholder="Enter your weight" @input="limitToTwoDecimalPlaces($event, 'weight')" />
                    <div v-if="errors.Weight" class="error">{{ errors.Weight }}</div>
                </div>
            </div>

            <div class="form-group horizontal-group">
                <label class="horizontal-label">Gender</label>
                <div style="flex: 1">
                    <div class="gender-options">
                        <label><input type="radio" value="Male" v-model="form.Gender" /> Male</label>
                        <label><input type="radio" value="Female" v-model="form.Gender" /> Female</label>
                    </div>
                    <div v-if="errors.Gender" class="error">{{ errors.Gender }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Age</label>
                <div style="flex: 1">
                    <input v-model="form.Age" type="text" inputmode="numeric" placeholder="Enter your age" @input="filterIntegerInput($event, 'age')" />
                    <div v-if="errors.Age" class="error">{{ errors.Age }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>BMR Formula</label>
                <div style="flex: 1">
                    <select v-model="form.formula">
                        <option value="" disabled hidden>Select a formula</option>
                        <option value="Mifflin-St Jeor">Mifflin-St Jeor</option>
                        <option value="Revised Harris-Benedict">Revised Harris-Benedict</option>
                        <option value="Katch-McArdle">Katch-McArdle</option>
                    </select>
                    <div v-if="errors.formula" class="error">{{ errors.formula }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Activity level</label>
                <div style="flex: 1">
                    <select v-model="form.Activity">
                        <option value="" disabled hidden>Select your activity level</option>
                        <option value="Sedentary">Sedentary (little or no exercise)</option>
                        <option value="Light">Light (exercise 1-3 times/week)</option>
                        <option value="Moderate">Moderate (exercise 4-5 times/week)</option>
                        <option value="Very-Active">Very Active (intense exercise 6-7 times/week)</option>
                        <option value="Extra-Active">Extra Active (very intense exercise daily, or physical job)</option>
                    </select>
                    <div v-if="errors.Activity" class="error">{{ errors.Activity }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Body Fat % (optional)</label>
                <div style="flex: 1">
                    <input v-model="form.bodyFat" type="text" inputmode="decimal" placeholder="Enter your body fat" @input="limitToTwoDecimalPlaces($event, 'bodyFat')" />
                    <div v-if="errors.bodyFat" class="error">{{ errors.bodyFat }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Goal</label>
                <div style="flex: 1">
                    <select v-model="form.Goal">
                        <option value="" disabled hidden>Select your goal</option>
                        <option value="maintain-weight">Maintain Weight</option>
                        <option value="lose-fat">Lose Fat</option>
                        <option value="gain-muscle">Gain Muscle</option>
                    </select>
                    <div v-if="errors.Goal" class="error">{{ errors.Goal }}</div>
                </div>
            </div>

            <button type="submit">Calculate</button>
        </form>
    </div>
</div>
</template>

<script>
import axios from 'axios';
import personImage from '../assets/person2.jpg';

export default {
  name: 'Cal',
  data() {
    return {
        userId: null,
        personImage,
        form: {
        Height: '',
        Weight: '',
        Gender: '',
        Age: '',
        formula: '',
        Activity: '',
        bodyFat: '',
        Goal: ''
      },
      errors: {},
      result:{
        BMR: null,
        TDEE: null,
        Calories_Perday: null,
        Protein: null,
        Carbs: null,
        Fat: null
      }
    };
  },
  mounted() {
    this.userId = sessionStorage.getItem('userid');
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
    async calculate() {
      this.errors = {};

      if (!this.isValidTwoDecimal(this.form.Height)) this.errors.Height = 'Please enter a valid height.';
      if (!this.isValidTwoDecimal(this.form.Weight)) this.errors.Weight = 'Please enter a valid weight.';
      if (!this.form.Gender) this.errors.Gender = 'Please select your gender.';
      if (!this.isPositiveInteger(this.form.Age)) this.errors.Age = 'Please enter a valid age.';
      if (!this.form.formula) this.errors.formula = 'Please choose a BMR formula.';
      if (!this.form.Activity) this.errors.Activity = 'Please select your activity level.';
      if (!this.form.Goal) this.errors.Goal = 'Please select your goal.';

      if (Object.keys(this.errors).length > 0) return;

      try {
        const res = await axios.post('http://localhost:3000/users/cal', {
          Gender: this.form.Gender,
          Weight: this.form.Weight,
          Height: this.form.Height,
          Age: this.form.Age,
          Activity: this.form.Activity,
          bodyFat: this.form.bodyFat,
          Goal: this.form.Goal,
          formula: this.form.formula
        });

        this.result.BMR = res.data.bmr;
        this.result.TDEE = res.data.tdee;
        this.result.Calories_Perday = res.data.calories_per_day;
        this.result.Protein = res.data.protein;
        this.result.Carbs = res.data.carbs;
        this.result.Fat = res.data.fat;

        await this.collectInfo();
      } catch (error) {
        alert('Error calculating BMR: ' + (error.response?.data?.message || error.message));
      }
    },
    async collectInfo() {
      try {
        await axios.post(`http://localhost:3000/users/${this.userId}`, {
        // await axios.post('http://localhost:3000/users/', {
          Gender: this.form.Gender,
          Weight: this.form.Weight,
          Height: this.form.Height,
          Age: this.form.Age,
          Activity: this.form.Activity,
          bodyFat: this.form.bodyFat,
          Goal: this.form.Goal,
          BMR: this.result.BMR,
          TDEE: this.result.TDEE,
          Calories_Perday: this.result.Calories_Perday
        });
        console.log(this.userId)
        alert('User data saved successfully!');
        await this.pushResult();
      } catch (error) {
        alert('Error saving user data: ' + (error.response?.data?.message || error.message));
      }
    },
    async pushResult(){
      try {
        sessionStorage.setItem('result', JSON.stringify(this.result));
        await this.$router.push('/result');

        // await this.$router.push({
        //     name: 'Result',
        //     query: {
        //         result: JSON.stringify(this.result)
        //     }
        // });
      } catch (error) {
        alert('Error saving result data: ' + (error.response?.data?.message || error.message));
      }
    }
  }
};
</script>


<style scoped>
/* ให้ body และ html ครอบคลุมเต็มหน้าจอ */
html,
body {
    height: 100%;
    margin: 0;
}

.health-container {
    display: flex;
    flex-wrap: wrap;
    min-height: 100vh;
    width: inherit;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    background-color:#E2FCD6;
    /* พื้นหลังเขียวอ่อน */
    flex-direction: row;
    padding-top: 1rem;
}

.left {
    flex: 1 1 50%;
    padding: 0;
    box-sizing: border-box;
    height: 100vh;
    display: flex;
    justify-content: flex-start;
    /* เปลี่ยนจาก center → flex-start */
    align-items: stretch;
    /* ให้รูปเต็มความสูง */
}

.person-image {
    width: 100%;
    height: 100%;
    /* ให้สูงเต็มจอ */
    object-fit: cover;
    border-radius: 0;
    /* ไม่ต้องมีมุมโค้ง */
    margin: 0;
    display: block;
    box-shadow: none;
    /* ลบเงาถ้าต้องการความเรียบง่าย */
}

.right {
    flex: 1 1 50%;
    padding: 2rem;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

h1 {
    color: #E2FCD6;
    font-size: 2.8rem;
    text-align: center;
    margin-bottom: 2rem;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
}

.form-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
    gap: 2rem;
    margin: 0 auto;
    /* จัดกลาง */
}

.form-group label {
    font-weight: bold;
    color: rgb(16, 91, 60);
    font-size: 0.95rem;
    width: 140px;
    text-align: right;
}

.form-group input[type="text"],
.form-group input[type="number"],
.form-group select {
    flex: 1;
    min-width: 0;
    width: 100%;
    padding: 0.7rem 1rem;
    border: 1px solid #ccc;
    border-radius: 8px;
    background-color: white;
    font-size: 0.95rem;
}

/* เปลี่ยนสี placeholder ใน input เป็นสีดำ */
.form-group input::placeholder {
    color: #999;
    /* placeholder สีดำ */
}

/* เปลี่ยนสีตัวเลือกใน select เป็นสีดำ */
select {
    color: #000;
    /* สีตัวเลือกใน select */
}

/* เพิ่มกรณี select ที่ไม่ได้เลือก จะมี placeholder เป็นสีดำ */
select:has(option[value=""]:checked) {
    color: #999;
}

/* ปรับสีตัวเลือกใน select เมื่อเลือก */
option {
    color: #000;
    /* สีของตัวเลือกใน dropdown */
}

.horizontal-group {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    max-width: 500px;
    gap: 1rem;
    margin: 0 auto;
}

.horizontal-label {
    font-weight: 600;
    color: #333;
    font-size: 0.95rem;
    width: 140px;
    text-align: right;
}

.gender-options {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
}

button {
    margin-top: 1rem;
    padding: 1rem 2rem;
    background-color: #14967F;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    align-self: center;
    transition: background 0.3s ease;
}

button:hover {
    background-color: #E2FCD6;
}

/* Responsive */
@media (max-width: 768px) {

    .left,
    .right {
        flex: 1 1 100%;
        padding: 1.5rem;
    }

    h1 {
        font-size: 2rem;
    }
}
</style>
