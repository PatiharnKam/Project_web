<template>
    <div class="result-container">
      <h2>Nutrition Summary</h2>
  
      <div class="result-row">
        <label>BMR</label>
        <div class="value-box">{{ result.BMR }} kcal</div>
      </div>
  
      <div class="result-row">
        <label>TDEE</label>
        <div class="value-box">{{ result.TDEE }} kcal</div>
      </div>
  
      <div class="result-section">
        <h3>Increase your intake of (g/meal)</h3>
        <div class="macro-grid">
          <div class="macro-box">
            <p>Protein</p>
            <div>{{ result.Protein }} g</div>
          </div>
          <div class="macro-box">
            <p>Fat</p>
            <div>{{ result.Fat }} g</div>
          </div>
          <div class="macro-box">
            <p>Carbohydrate</p>
            <div>{{ result.Carbs }} g</div>
          </div>
        </div>
      </div>
  
      <div class="result-section">
        <h3>Fitness plan</h3>
        <div class="long-box">[Your Fitness Plan Here]</div>
      </div>
  
      <div class="result-section">
        <h3>Meal</h3>
        <div class="meal-grid">
          <div class="meal-box">Meal 1</div>
          <div class="meal-box">Meal 2</div>
          <div class="meal-box">Meal 3</div>
        </div>
      </div>
  
      <button @click="downloadPDF">Download as PDF</button>
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
    //   const queryResult = this.$route.query.result;
    //   if (queryResult) {
    //     this.result = JSON.parse(queryResult);
    //   }
    },
    methods: {
      downloadPDF() {
        window.print(); // หรือใช้ jsPDF/html2pdf ก็ได้
      }
    }
  };
</script>
  
<style scoped>
.result-container {
    max-width: 800px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: 'Segoe UI', sans-serif;
    background-color: #f7fff3;
    border-radius: 10px;
}
  
.result-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 1rem 0;
}
  
.value-box {
    background-color: #d8fdd1;
    padding: 0.7rem 1.2rem;
    border-radius: 8px;
    font-weight: bold;
}
  
.result-section {
    margin: 2rem 0;
}
  
.macro-grid {
    display: flex;
    gap: 1rem;
    justify-content: space-between;
}
  
.macro-box {
    background-color: #e6ffe1;
    padding: 1rem;
    border-radius: 8px;
    width: 30%;
    text-align: center;
    font-weight: bold;
}
  
.long-box {
    background-color: #dcfdd1;
    padding: 1.5rem;
    border-radius: 8px;
    text-align: center;
    font-weight: bold;
}
  
.meal-grid {
    display: flex;
    justify-content: space-between;
    gap: 1rem;
}
  
.meal-box {
    background-color: #d4fbd0;
    padding: 3rem 1rem;
    border-radius: 8px;
    width: 30%;
    text-align: center;
    font-weight: bold;
}
  
button {
    display: block;
    margin: 2rem auto 0;
    padding: 1rem 2rem;
    background-color: #159b83;
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 1.1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease;
}
  
button:hover {
    background-color: #117462;
}
</style>
  