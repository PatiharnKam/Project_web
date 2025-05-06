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
                <li>30 minutes of moderate cardio 3-4 times per week</li>
                <li>Choose from: walking, jogging, cycling, or swimming</li>
              </ul>
            </div>
            <div class="plan-card">
              <h4>Strength Training</h4>
              <ul>
                <li>2-3 strength training sessions per week</li>
                <li>Focus on compound exercises</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="result-section">
          <h3><i class="fas fa-utensils"></i> Suggested Meal Plan</h3>
          <div class="meal-grid">
            <div class="meal-box">
              <h4>Breakfast</h4>
              <ul>
                <li>Oatmeal with fruits</li>
                <li>Greek yogurt</li>
                <li>Nuts and seeds</li>
              </ul>
            </div>
            <div class="meal-box">
              <h4>Lunch</h4>
              <ul>
                <li>Grilled chicken breast</li>
                <li>Brown rice</li>
                <li>Steamed vegetables</li>
              </ul>
            </div>
            <div class="meal-box">
              <h4>Dinner</h4>
              <ul>
                <li>Salmon fillet</li>
                <li>Sweet potato</li>
                <li>Green salad</li>
              </ul>
            </div>
          </div>
        </div>

        <button class="download-btn" @click="downloadPDF">
          <i class="fas fa-download"></i> Download Summary
        </button>
      </div>
    </div>
  </div>
</template>

<script>
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
      },
    };
  },
  computed: {
    isLoggedIn() {
      return !!sessionStorage.getItem("token");
    },
  },
  created() {
    const saved = sessionStorage.getItem("result");
    if (saved) {
      this.result = JSON.parse(saved);
    }
  },
  methods: {
    downloadPDF() {
      window.print();
    },
    goToSignin() {
      this.$router.push("/signin");
    },
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.result-card:hover {
  transform: translateY(-5px);
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
  grid-template-columns: repeat(3, 1fr);  /* กำหนดให้มี 3 columns เท่าๆ กัน */
  gap: 2rem;
  width: 100%;
}

.macro-box,
.plan-card,
.meal-box {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
  height: 100%;
  width: 100%;
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
}

.macro-box:hover {
  transform: translateY(-5px);
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
  transition: transform 0.3s ease;
}

.meal-box:hover {
  transform: translateY(-5px);
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
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.download-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
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

    #app>*:not(.result-container) {
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

    @supports (-webkit-appearance:none) {
        html {
            background: white !important;
        }
    }
}

</style>
