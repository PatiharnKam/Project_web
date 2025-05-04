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
                    <input v-model="form.height" type="text" inputmode="decimal" placeholder="Enter your height" @input="limitToTwoDecimalPlaces($event, 'height')" />
                    <div v-if="errors.height" class="error">{{ errors.height }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Weight (kg)</label>
                <div style="flex: 1">
                    <input v-model="form.weight" type="text" inputmode="decimal" placeholder="Enter your weight" @input="limitToTwoDecimalPlaces($event, 'weight')" />
                    <div v-if="errors.weight" class="error">{{ errors.weight }}</div>
                </div>
            </div>

            <div class="form-group horizontal-group">
                <label class="horizontal-label">Gender</label>
                <div style="flex: 1">
                    <div class="gender-options">
                        <label><input type="radio" value="Male" v-model="form.gender" /> Male</label>
                        <label><input type="radio" value="Female" v-model="form.gender" /> Female</label>
                    </div>
                    <div v-if="errors.gender" class="error">{{ errors.gender }}</div>
                </div>
            </div>

            <div class="form-group">
                <label>Age</label>
                <div style="flex: 1">
                    <input v-model="form.age" type="text" inputmode="numeric" placeholder="Enter your age" @input="filterIntegerInput($event, 'age')" />
                    <div v-if="errors.age" class="error">{{ errors.age }}</div>
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
                    <select v-model="form.activity">
                        <option value="" disabled hidden>Select your activity level</option>
                        <option value="BMR">Basal Metabolic Rate (BMR)</option>
                        <option value="Sedentary">little or no exercise</option>
                        <option value="Light">exercise 1-3 times/week</option>
                        <option value="Moderate">exercise 4-5 times/week</option>
                        <option value="Active">daily exercise or intense exercise 3-4 times/week</option>
                        <option value="Very Active">intense exercise 6-7 times/week</option>
                        <option value="Extra Active">very intense exercise daily, or physical job</option>
                    </select>
                    <div v-if="errors.activity" class="error">{{ errors.activity }}</div>
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
                    <select v-model="form.goal">
                        <option value="" disabled hidden>Select your goal</option>
                        <option value="Fat Loss">Fat Loss</option>
                        <option value="Fat Loss & Muscle Gain">Fat Loss & Muscle Gain</option>
                        <option value="Muscle Gain & Weight Gain">Muscle Gain & Weight Gain</option>
                    </select>
                    <div v-if="errors.goal" class="error">{{ errors.goal }}</div>
                </div>
            </div>

            <button type="submit">Calculate</button>
        </form>
    </div>
</div>
</template>

<script>
import {
    reactive
} from 'vue';
import personImage from '../assets/person2.jpg';

export default {
    setup() {
        const form = reactive({
            height: '',
            weight: '',
            gender: '',
            age: '',
            formula: '',
            activity: '',
            bodyFat: '',
            goal: '',
        });

        const errors = reactive({});

        const isValidTwoDecimal = (val) => /^\d+(\.\d{1,2})?$/.test(val) && parseFloat(val) > 0;
        const isPositiveInteger = (val) => /^\d+$/.test(val) && parseInt(val) > 0;

        const limitToTwoDecimalPlaces = (event, field) => {
            let raw = event.target.value;
            const match = raw.match(/^\d*\.?\d{0,2}/);
            event.target.value = match ? match[0] : '';
            form[field] = event.target.value;
        };

        const filterIntegerInput = (event, field) => {
            let raw = event.target.value.replace(/\D/g, ''); // ลบทุกอย่างที่ไม่ใช่ตัวเลข
            if (raw !== '' && parseInt(raw) === 0) raw = ''; // ป้องกันค่า 0
            event.target.value = raw;
            form[field] = raw;
        };

        const calculate = () => {
            const errors = [];

            if (!isValidTwoDecimal(form.height)) {
                errors.push('Please enter your height.');
            }
            if (!isValidTwoDecimal(form.weight)) {
                errors.push('Please enter your weight.');
            }
            if (!form.gender) {
                errors.push('Please select your gender.');
            }
            if (!form.age || !isPositiveInteger(form.age)) {
                errors.push('Please enter your age.');
            }
            if (!form.formula) {
                errors.push('Please choose a BMR calculation formula.');
            }
            if (!form.activity) {
                errors.push('Please select your activity level.');
            }
            if (!form.goal) {
                errors.push('Please select your goal.');
            }

            if (errors.length > 0) {
                alert(errors.join('\n'));
                return;
            }

        };

        return {
            form,
            calculate,
            personImage,
            errors,
            limitToTwoDecimalPlaces,
            filterIntegerInput
        };
    },
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
