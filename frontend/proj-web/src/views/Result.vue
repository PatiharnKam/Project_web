<template>
  <div class="result-container">
    <br><br><h2 class="title">Your Nutrition Summary</h2>

    <div class="result-cards">
      <div class="result-card">
        <i class="fas fa-fire"></i>
        <div class="card-content">
          <label>BMR (Basal Metabolic Rate)</label>
          <div class="value-box">{{ result.BMR }} kcal</div>
        </div>
      </div>
  
      <div class="result-card">
        <i class="fas fa-running"></i>
        <div class="card-content">
          <label>TDEE (Total Daily Energy Expenditure)</label>
          <div class="value-box">{{ result.TDEE }} kcal</div>
        </div>
      </div>
    </div>

    <div class="result-section">
      <h3><i class="fas fa-chart-pie"></i> Daily Macro Nutrients</h3>
      <div class="macro-grid">
        <div class="macro-box">
          <i class="fas fa-drumstick-bite"></i>
          <p>Protein</p>
          <div class="macro-value">{{ result.Protein }} g</div>
        </div>
        <div class="macro-box">
          <i class="fas fa-cheese"></i>
          <p>Fat</p>
          <div class="macro-value">{{ result.Fat }} g</div>
        </div>
        <div class="macro-box">
          <i class="fas fa-bread-slice"></i>
          <p>Carbohydrate</p>
          <div class="macro-value">{{ result.Carbs }} g</div>
        </div>
      </div>
    </div>

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
</template>

<script>
export default {
  name: 'Result',
  data() {
    return {
      result: {
        BMR: null,
        TDEE: null,
        Calories_Perday: null,
        Protein: null,
        Carbs: null,
        Fat: null
      }
    };
  },
  created() {
      const saved = sessionStorage.getItem('result');
      if (saved) {
          this.result = JSON.parse(saved);
      }
  },
  methods: {
    downloadPDF() {
      window.print();
    }
  }
};
</script>

<style scoped>

.result-container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
  background: #E2FCD6;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
}

.result-cards, .result-section, .macro-grid, .fitness-plan, .meal-grid {
  width: 100%;
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
}

.title {
  text-align: center;
  color: #095D7E;
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
  background: #095D7E;
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
  color: #095D7E;
  margin-bottom: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.result-section h3 i {
  color: #095D7E;
}

.macro-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
}

.macro-box {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  text-align: center;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.macro-box:hover {
  transform: translateY(-5px);
}

.macro-box i {
  font-size: 2rem;
  color: #095D7E;
  margin-bottom: 1rem;
}

.macro-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #2c3e50;
  margin-top: 0.5rem;
}

.fitness-plan {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.plan-card {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
}

.plan-card h4 {
  color: #095D7E;
  margin-bottom: 1rem;
}

.plan-card ul {
  padding-left: 1.2rem;
}

.plan-card li {
  margin: 0.5rem 0;
  color: #2c3e50;
}

.meal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.meal-box {
  background: white;
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease;
}

.meal-box:hover {
  transform: translateY(-5px);
}

.meal-box h4 {
  color: #095D7E;
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
  background: #095D7E;
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

  .macro-grid, .meal-grid {
      grid-template-columns: 1fr;
  }
}
</style>
