<template>
  <div class="health-container">
    <div class="left">
      <img :src="personImage" alt="Person" class="person-image" />
    </div>

    <div class="right">
      <div class="form">
        <div class="form-group">
          <label>Username</label>
          <p>{{ form.username }}</p>
        </div>

        <div class="form-group">
          <label>Height (cm)</label>
          <p>{{ form.height }}</p>
        </div>

        <div class="form-group">
          <label>Weight (kg)</label>
          <p>{{ form.weight }}</p>
        </div>

        <div class="form-group">
          <label>Gender</label>
          <p>{{ form.gender }}</p>
        </div>

        <div class="form-group">
          <label>Age</label>
          <p>{{ form.age }}</p>
        </div>

        <div class="form-group">
          <label>BMR Formula</label>
          <p>{{ form.formula }}</p>
        </div>

        <div class="form-group">
          <label>Activity level</label>
          <p>{{ form.activity }}</p>
        </div>

        <div class="form-group">
          <label>Body Fat %</label>
          <p>{{ form.bodyFat || '-' }}</p>
        </div>

        <div class="form-group">
          <label>Goal</label>
          <p>{{ form.goal }}</p>
        </div>

        <div class="form-button">
          <button class="edit-button">
            <i class="fas fa-edit"></i>Edit
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import personImage from '../assets/person6.jpg';

export default {
  data() {
    return {
      personImage,
      form: {
        username: '',
        height: '',
        weight: '',
        gender: '',
        age: '',
        formula: '',
        activity: '',
        bodyFat: '',
        goal: '',
      },
    };
  },
  mounted() {
    const userId = this.$route.params.userId;
    axios
      .get(`http://localhost:3000/users/${userId}`)
      .then((res) => {
        const data = res.data;
        this.form.username = data.Username;
        this.form.height = data.Height;
        this.form.weight = data.Weight;
        this.form.gender = data.Gender;
        this.form.age = data.Age;
        this.form.activity = data.Activity;
        this.form.bodyFat = data.Fat_Percent;
        this.form.goal = data.Goal;
        this.form.formula = data.Formula || '-';
      })
      .catch((err) => {
        console.error('Error fetching user data:', err);
      });
  },
};
</script>

<style scoped>
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
  background-color: #e2fcd6;
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
  align-items: stretch;
}

.person-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0;
  margin: 0;
  display: block;
  box-shadow: none;
}

.right {
  flex: 1 1 50%;
  padding: 2rem;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
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
}

.form-group label {
  font-weight: bold;
  color: rgb(16, 91, 60);
  font-size: 0.95rem;
  width: 140px;
  text-align: right;
}

.form-group p {
  flex: 1;
  width: 100%;
  box-sizing: border-box;
  padding: 0.7rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  font-size: 0.95rem;
  margin: 0;
  min-height: 40px;
}

.form-button {
  max-width: 500px;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 0rem;
}

.edit-button {
  margin-top: 0rem;
  padding: 0.5rem 1.5rem;
  background-color: rgb(60, 154, 230);
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  transition: background 0.3s ease;
}

.edit-button:hover {
  background-color: rgb(37, 131, 208);
}

.edit-button i {
  font-size: 1.2rem;
}

@media (max-width: 768px) {
  .left,
  .right {
    flex: 1 1 100%;
    padding: 1.5rem;
  }
}
</style>
