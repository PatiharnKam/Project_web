<template>
  <div class="result-container">
    <br /><br />
    <h2 class="title">Your Nutrition Summary</h2>

    <div class="result-cards">
      <div class="result-card">
        <i class="fas fa-fire"></i>
        <div class="card-content">
          <label>BMR (Basal Metabolic Rate)</label>
          <div class="value-box">{{ result.bmr }} kcal</div>
        </div>
      </div>

      <div class="result-card">
        <i class="fas fa-running"></i>
        <div class="card-content">
          <label>TDEE (Total Daily Energy Expenditure)</label>
          <div class="value-box">{{ result.tdee }} kcal</div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h3><i class="fas fa-chart-pie"></i> Daily Macro Nutrients</h3>
      <div class="macro-grid">
        <div class="macro-box">
          <i class="fas fa-drumstick-bite"></i>
          <p>Protein</p>
          <div class="macro-value">{{ result.protein }} g</div>
        </div>
        <div class="macro-box">
          <i class="fas fa-cheese"></i>
          <p>Fat</p>
          <div class="macro-value">{{ result.fat }} g</div>
        </div>
        <div class="macro-box">
          <i class="fas fa-bread-slice"></i>
          <p>Carbohydrate</p>
          <div class="macro-value">{{ result.carbs }} g</div>
        </div>
      </div>
    </div>
    <div class="protected-wrapper">
      <div v-if="!isLoggedIn" class="overlay-box">
        <p>Please sign in to see this section</p>
        <button @click="goToSignin">Go to Signin</button>
      </div>
      <div class="protected-content" :class="{ blurred: !isLoggedIn }">
        <div class="result-section">
          <h3><i class="fas fa-dumbbell"></i> Recommended Fitness Plan</h3>
          <div class="fitness-plan">
            <div class="plan-card">
              <h4>Cardio</h4>
              <ul>
                <template v-if="result.goal === 'lose-fat'">
                  <li>Do 30 minutes of moderate to high-intensity cardio 3–5 times per week to boost fat burning.</li>
                  <li>Choose from: walking, jogging, cycling, or swimming</li>
                </template>
                <template v-else-if="result.goal === 'gain-muscle'">
                  <li>Do 30 minutes of moderate-intensity cardio 2–3 times per week to support heart health without interfering with muscle growth.</li>
                  <li>Choose from: walking, jogging, cycling, or swimming</li>
                </template>
                <template v-else>
                  <li>Do 30 minutes of low-intensity cardio 3–4 times per week to maintain overall fitness and endurance.</li>
                  <li>Choose from: walking, jogging, cycling, or swimming</li>
                </template>
              </ul>
            </div>
            <div class="plan-card">
              <h4>Weight Training</h4>
              <ul>
                <template v-if="result.goal === 'lose-fat'">
                  <li>Train 3-5 days per week to support fat loss and maintain muscle mass.</li>
                  <li>Focus on compound exercises to burn more calories and engage multiple muscle groups.</li>
                </template>
                <template v-else-if="result.goal === 'gain-muscle'">
                  <li>Train 5-6 days per week to maximize muscle hypertrophy and recovery.</li>
                  <li>Focus on compound exercises to build overall strength and stimulate muscle growth.</li>
                </template>
                <template v-else>
                  <li>Train 2-3 days per week to maintain your current physique and health.</li>
                  <li>Focus on compound exercises for efficient full-body stimulation.</li>
                </template>
              </ul>
            </div>
            <div class="plan-card">
              <h4>Meal Plan</h4>
              <ul>
                <template v-if="result.goal === 'lose-fat'">
                  Eat less than TDEE but more than BMR to lose Fat.
                </template>
                <template v-else-if="result.goal === 'gain-muscle'">
                  Eat more than your TDEE to build muscle.
                </template>
                <template v-else>
                  Focus on maintaining your current weight and balance macros.
                </template>
                <li>
                  Recommend Calories Per day for your goal is:
                  {{ result.caloriesPerDay }} kcal
                </li>
              </ul>
            </div>
          </div>

          <div class="result-section">
            <h3 class="menu-header">
              <i class="fas fa-utensils"></i>
                Suggested Menu Plan
              <button class="refresh-btn" @click="fetchRecommendedMeals" title="Refresh Menu">
                <i class="fas fa-sync-alt"></i>
              </button>
            </h3>
            <div class="meal-grid">
              <div
                class="meal-box"
                v-for="(meal, index) in result.selectedMeals"
                :key="index"
              >
                <h4>{{ meal.MealName }}</h4>
                <ul>
                  <li>Protein: {{ meal.Protein }}g</li>
                  <li>Carbohydrate: {{ meal.Carbohydrate }}g</li>
                  <li>Fat: {{ meal.Fat }}g</li>
                  <li>Calories: {{ meal.Calories }} kcal</li>
                </ul>
                <img :src="meal.ImageLink" :alt="meal.MealName" />
              </div>

              <div class="total-calories-box">
                <i class="fas fa-calculator"></i>
                <h4>Total Daily Calories</h4>
                <div class="calories-value">
                  {{ result.totalCalories }} kcal
                </div>
              </div>
            </div>
          </div>
          <button class="recalculate-button" @click="recalculateMetrics">
            <i class="fas fa-redo"></i>
            Recalculate
          </button>
          <button class="download-btn" @click="downloadPDF">
            <i class="fas fa-download"></i> Download Summary
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Result",
  data() {
    return {
      result: {
        bmr: null,
        tdee: null,
        caloriesPerDay: null,
        protein: null,
        carbs: null,
        fat: null,
        goal: null,
        selectedMeals: [], // เพิ่ม field นี้สำหรับเมนูอาหารที่แนะนำ
        totalCalories: 0,
      },
    };
  },
  computed: {
    isLoggedIn() {
      return !!sessionStorage.getItem("token");
    },
  },
  async created() {
    const saved = sessionStorage.getItem("result");
    if (saved) {
      this.result = JSON.parse(saved);
      await this.fetchRecommendedMeals();
    }
    // try {
    //   const res = await axios.post(
    //     "http://localhost:3000/meals/recommendation",
    //     {
    //       minCalories: this.result.bmr,
    //       maxCalories: this.result.tdee,
    //       proteinLimit: this.result.protein,
    //       carbsLimit: this.result.carbs,
    //       fatLimit: this.result.fat,
    //     }
    //   );
    //   this.result.selectedMeals = res.data.selectedMeals;
    //   this.result.totalCalories = res.data.total.calories;
    // } catch (error) {
    //   console.error("Error fetching recommended meals:", error);
    // }
  },
  methods: {
    downloadPDF() {
      window.print();
    },
    goToSignin() {
      this.$router.push("/signin");
    },
    recalculateMetrics() {
      this.$router.push("/cal");
    },
    async fetchRecommendedMeals() {
      try {
        const res = await axios.post("http://localhost:3000/meals/recommendation", {
          minCalories: this.result.bmr,
          maxCalories: this.result.tdee,
          proteinLimit: this.result.protein,
          carbsLimit: this.result.carbs,
          fatLimit: this.result.fat
        },
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        });
        this.result.selectedMeals = res.data.selectedMeals;
        this.result.totalCalories = res.data.total.calories;
      } catch (error) {
        console.error("Error fetching recommended meals:", error);
      }
    }
  },
};
</script>

<style scoped>
.protected-wrapper {
  position: relative;
}

.protected-content.blurred {
  filter: blur(10px);
  pointer-events: none;
  user-select: none;
}

.overlay-box {
  position: absolute; /* จับกลางทั้งหน้าจอ */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 90%;
  max-width: 500px;
  background: rgba(0, 0, 0, 0.85);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 15px;
  text-align: center;
  padding: 2rem;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(6px);
}

.overlay-box button {
  margin-top: 1rem;
  padding: 0.8rem 1.6rem;
  background-color: #14967f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
}

.overlay-box button:hover {
  background-color: #0f7c6b;
}

.blurred-section {
  filter: blur(4px);
  pointer-events: none;
  position: relative;
}

.blurred-section::after {
  content: "Please log in to see this section";
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  background: rgba(0, 0, 0, 0.6);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-size: 1.2rem;
  z-index: 10;
}

.result-container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 2rem;
  font-family: "Segoe UI", sans-serif;
  background: #e2fcd6;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.result-cards,
.result-section,
.macro-grid,
.fitness-plan,
.meal-grid {
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.title {
  text-align: center;
  color: #095d7e;
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  font-weight: 600;
  text-shadow: 2px 2px 4px rgba(9, 93, 126, 0.1);
  position: relative;
  padding-bottom: 1rem;
  transition: all 0.3s ease;
}

.title::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 0;
  height: 3px;
  background: linear-gradient(to right, #095d7e, #14967f);
  transform: translateX(-50%);
  transition: width 0.5s ease;
}

.title:hover {
  transform: translateY(-2px);
  text-shadow: 3px 3px 6px rgba(9, 93, 126, 0.2);
}

.title:hover::after {
  width: 200px;
}

.result-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
}

.result-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 15px 40px rgba(9, 93, 126, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(9, 93, 126, 0.1);
}

.result-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(9, 93, 126, 0.15),
    0 20px 48px rgba(9, 93, 126, 0.12);
  border-color: rgba(9, 93, 126, 0.2);
}

.result-card i {
  font-size: 2rem;
  color: #3498db;
}

.card-content {
  flex: 1;
}

.value-box {
  background: #095d7e;
  color: white;
  padding: 0.7rem 1.2rem;
  border-radius: 8px;
  font-weight: bold;
  margin-top: 0.5rem;
  text-align: center;
  box-shadow: inset 0 2px 4px rgba(255, 255, 255, 0.1),
    0 2px 4px rgba(9, 93, 126, 0.1);
}

.result-section {
  margin: 3rem 0;
}

.result-section h3 {
  color: #095d7e;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.result-section h3 i {
  color: #095d7e;
}

.macro-grid,
.fitness-plan,
.meal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* กำหนดให้มี 3 columns เท่าๆ กัน */
  gap: 2rem;
  width: 100%;
}

.macro-box,
.plan-card,
.meal-box {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 15px 40px rgba(9, 93, 126, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(9, 93, 126, 0.1);
  height: 100%;
  width: 100%;
}

.plan-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 15px 40px rgba(9, 93, 126, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(9, 93, 126, 0.1);
}

.plan-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(9, 93, 126, 0.15),
    0 20px 48px rgba(9, 93, 126, 0.12);
  border-color: rgba(9, 93, 126, 0.2);
}

.meal-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  width: 100%;
  position: relative;
}

.meal-box {
  background: white;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 15px 40px rgba(9, 93, 126, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(9, 93, 126, 0.1);
  display: flex;
  flex-direction: column;
  height: 100%;
}

.meal-box h4 {
  color: #095d7e;
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.3rem;
}

.meal-box ul {
  padding-left: 1.5rem;
  margin: 1rem 0;
  flex-grow: 1;
}

.meal-box li {
  margin: 0.8rem 0;
  color: #2c3e50;
  font-size: 1.1rem;
  line-height: 1.4;
}

.meal-box img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  margin-top: auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.total-calories-box {
  grid-column: 1 / -1;
  background: #095d7e;
  padding: 2rem;
  border-radius: 15px;
  margin-top: 2rem;
  text-align: center;
  color: white;
  box-shadow: 0 8px 25px rgba(9, 93, 126, 0.15);
  transition: all 0.3s ease;
}

.total-calories-box i {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: white;
}

.total-calories-box h4 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: white;
}

.total-calories-box .calories-value {
  font-size: 2.5rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

@media (max-width: 1200px) {
  .macro-grid,
  .fitness-plan,
  .meal-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .macro-grid,
  .fitness-plan,
  .meal-grid {
    grid-template-columns: 1fr;
  }

  .meal-box {
    padding: 1.5rem;
  }

  .meal-box img {
    height: 180px;
  }

  .total-calories-box {
    padding: 1.5rem;
  }
}

.macro-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(9, 93, 126, 0.15),
    0 20px 48px rgba(9, 93, 126, 0.12);
  border-color: rgba(9, 93, 126, 0.2);
}

.macro-box i {
  font-size: 2rem;
  color: #095d7e;
  margin-bottom: 1rem;
}

.macro-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0.5rem;
}

.plan-card h4 {
  color: #095d7e;
  margin-bottom: 1rem;
}

.plan-card ul {
  padding-left: 1.2rem;
}

.plan-card li {
  margin: 0.5rem 0;
  color: #2c3e50;
}

.meal-box {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 15px 40px rgba(9, 93, 126, 0.08);
  border: 1px solid rgba(9, 93, 126, 0.1);
}

.meal-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(9, 93, 126, 0.15),
    0 20px 48px rgba(9, 93, 126, 0.12);
  border-color: rgba(9, 93, 126, 0.2);
}

.meal-box h4 {
  color: #095d7e;
  margin-bottom: 1rem;
  text-align: center;
}

.meal-box ul {
  padding-left: 1.2rem;
}

.meal-box li {
  margin: 0.5rem 0;
  color: #2c3e50;
}

.total-calories-box {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05), 0 15px 40px rgba(9, 93, 126, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid rgba(9, 93, 126, 0.1);
  text-align: center;
}

.total-calories-box:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 25px rgba(9, 93, 126, 0.15),
    0 20px 48px rgba(9, 93, 126, 0.12);
  border-color: rgba(9, 93, 126, 0.2);
}

.total-calories-box i {
  font-size: 2rem;
  color: #095d7e;
  margin-bottom: 1rem;
}

.total-calories-box h4 {
  color: #095d7e;
  margin-bottom: 1rem;
}

.total-calories-box .calories-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
}

.download-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin: 3rem auto 0;
  padding: 1rem 2rem;
  background: #095d7e;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(9, 93, 126, 0.15),
    0 8px 25px rgba(9, 93, 126, 0.1);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(9, 93, 126, 0.2),
    0 12px 30px rgba(9, 93, 126, 0.15);
  background: #074c66;
}

@media (max-width: 768px) {
  .result-container {
    padding: 1rem;
    width: 100vw;
    overflow-x: hidden;
  }

  .title {
    font-size: 2rem;
  }

  .result-cards {
    grid-template-columns: 1fr;
  }

  .macro-grid,
  .meal-grid {
    grid-template-columns: 1fr;
  }
}

@media print {
  @page {
    size: A4;
    margin: 20mm 0 0 0;
  }

  html,
  body {
    width: 210mm;
    height: 297mm;
    margin: 0 auto !important;
  }

  body * {
    visibility: hidden;
  }

  #app > *:not(.result-container) {
    display: none !important;
  }

  .result-container,
  .result-container * {
    visibility: visible !important;
  }

  .result-container {
    position: relative !important;
    width: 180mm !important;
    margin: 15mm auto !important;
    padding: 0 !important;
    background: white !important;
    box-shadow: none !important;
    float: none !important;
  }

  .result-cards {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10mm !important;
    margin-bottom: 15mm !important;
    width: 100% !important;
  }

  .macro-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 10mm !important;
    width: 100% !important;
    margin-bottom: 0 !important;
  }

  .protected-content {
    page-break-before: always !important;
    margin-top: 20mm !important;
  }

  .result-section {
    page-break-inside: avoid !important;
  }

  .result-card,
  .macro-box,
  .plan-card,
  .meal-box {
    background: white !important;
    border: 1px solid #095d7e !important;
    box-shadow: none !important;
    padding: 8mm !important;
    margin: 0 !important;
  }

  .value-box {
    background: white !important;
    color: #095d7e !important;
    border: 2px solid #095d7e !important;
    margin-top: 5mm !important;
  }

  .title {
    font-size: 28pt !important;
    margin-bottom: 15mm !important;
    color: #095d7e !important;
  }

  h3 {
    font-size: 20pt !important;
    color: #095d7e !important;
    margin-bottom: 10mm !important;
  }

  p,
  li {
    font-size: 12pt !important;
    line-height: 1.5 !important;
  }

  .download-btn {
    display: none !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  @supports (-webkit-appearance: none) {
    html {
      background: white !important;
    }
  }
}

@media print {
  @page {
    size: A4;
    margin: 20mm 0 0 0;
  }

  html,
  body {
    width: 210mm;
    height: 297mm;
    margin: 0 auto !important;
  }

  body * {
    visibility: hidden;
  }

  #app > *:not(.result-container) {
    display: none !important;
  }

  .result-container,
  .result-container * {
    visibility: visible !important;
  }

  .result-container {
    position: relative !important;
    width: 180mm !important;
    margin: 15mm auto !important;
    padding: 0 !important;
    background: white !important;
    box-shadow: none !important;
    float: none !important;
  }

  .result-cards {
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 10mm !important;
    margin-bottom: 15mm !important;
    width: 100% !important;
  }

  .macro-grid {
    grid-template-columns: repeat(3, 1fr) !important;
    gap: 10mm !important;
    width: 100% !important;
    margin-bottom: 0 !important;
  }

  .protected-content {
    page-break-before: always !important;
    margin-top: 20mm !important;
  }

  .result-section {
    page-break-inside: avoid !important;
  }

  .result-card,
  .macro-box,
  .plan-card,
  .meal-box {
    background: white !important;
    border: 1px solid #095d7e !important;
    box-shadow: none !important;
    padding: 8mm !important;
    margin: 0 !important;
  }

  .value-box {
    background: white !important;
    color: #095d7e !important;
    border: 2px solid #095d7e !important;
    margin-top: 5mm !important;
  }

  .title {
    font-size: 28pt !important;
    margin-bottom: 15mm !important;
    color: #095d7e !important;
  }

  h3 {
    font-size: 20pt !important;
    color: #095d7e !important;
    margin-bottom: 10mm !important;
  }

  p,
  li {
    font-size: 12pt !important;
    line-height: 1.5 !important;
  }

  .download-btn {
    display: none !important;
  }

  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  @supports (-webkit-appearance: none) {
    html {
      background: white !important;
    }
  }
}
.recalculate-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin: 3rem auto 0;
  padding: 1rem 2rem;
  border: none;
  border-radius: 50px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  background: #095D7E;
  color: white;
}

.recalculate-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(20, 150, 127, 0.2);
}

.recalculate-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.refresh-btn {
  background: none;
  border: none;
  margin-left: 1rem;
  cursor: pointer;
  color: #095d7e;
  font-size: 1.2rem;
  transition: transform 0.2s ease;
}

.refresh-btn:hover {
  transform: rotate(90deg);
  color: #14967f;
}
.menu-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
</style>
