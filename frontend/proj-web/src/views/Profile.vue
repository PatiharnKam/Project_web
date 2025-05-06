<template>
  <div class="profile-container">
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <i class="fas fa-spinner fa-spin"></i>
        <span>Loading...</span>
      </div>
    </div>
    <div class="profile-content">
      <!-- Profile Header -->
       <br>
      <div class="profile-header">
        <div class="profile-avatar">
          <i class="fas fa-user-circle"></i>
        </div>
        <h1>{{ form.username || 'User Profile' }}</h1>
        <p class="subtitle">View and manage your health information</p>
      </div>

      <div class="profile-sections">
        <!-- Personal Information -->
        <div class="profile-section" data-aos="fade-up">
          <div class="section-header">
            <i class="fas fa-user"></i>
            <h2>Personal Information</h2>
          </div>
          <div class="info-grid">
            <div class="info-card">
              <span class="info-label">Username</span>
              <span class="info-value">{{ form.username || '-' }}</span>
            </div>
            <div class="info-card">
              <span class="info-label">Age</span>
              <span class="info-value">{{ form.age || '-' }} years</span>
            </div>
            <div class="info-card">
              <span class="info-label">Gender</span>
              <span class="info-value">{{ form.gender || '-' }}</span>
            </div>
          </div>
        </div>

        <!-- Physical Metrics -->
        <div class="profile-section" data-aos="fade-up" data-aos-delay="100">
          <div class="section-header">
            <i class="fas fa-ruler-combined"></i>
            <h2>Physical Metrics</h2>
          </div>
          <div class="metrics-grid">
            <div class="metric-card">
              <div class="metric-icon">
                <i class="fas fa-ruler-vertical"></i>
              </div>
              <div class="metric-info">
                <span class="metric-label">Height</span>
                <span class="metric-value">{{ form.height || '-' }}</span>
                <span class="metric-unit">cm</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon">
                <i class="fas fa-weight"></i>
              </div>
              <div class="metric-info">
                <span class="metric-label">Weight</span>
                <span class="metric-value">{{ form.weight || '-' }}</span>
                <span class="metric-unit">kg</span>
              </div>
            </div>

            <div class="metric-card">
              <div class="metric-icon">
                <i class="fas fa-percentage"></i>
              </div>
              <div class="metric-info">
                <span class="metric-label">Body Fat</span>
                <span class="metric-value">{{ form.bodyFat || '-' }}</span>
                <span class="metric-unit">%</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Fitness Goals -->
        <div class="profile-section" data-aos="fade-up" data-aos-delay="200">
          <div class="section-header">
            <i class="fas fa-bullseye"></i>
            <h2>Fitness Goals</h2>
          </div>
          <div class="goals-grid">
            <div class="goal-card">
              <div class="goal-icon">
                <i class="fas fa-running"></i>
              </div>
              <div class="goal-info">
                <span class="goal-label">Activity Level</span>
                <span class="goal-value">{{ form.activity || '-' }}</span>
              </div>
            </div>

            <div class="goal-card">
              <div class="goal-icon">
                <i class="fas fa-trophy"></i>
              </div>
              <div class="goal-info">
                <span class="goal-label">Goal</span>
                <span class="goal-value">{{ form.goal || '-' }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="profile-actions" data-aos="fade-up" data-aos-delay="300">
          <button class="recalculate-button" @click="recalculateMetrics" :disabled="loading">
            <i v-if="loading" class="fas fa-spinner fa-spin"></i>
            <i v-else class="fas fa-redo"></i>
            {{ loading ? 'Loading...' : 'Recalculate' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        username: '',
        height: '',
        weight: '',
        gender: '',
        age: '',
        activity: '',
        bodyFat: '',
        goal: '',
      },
      loading: false,
      error: null
    };
  },
  async mounted() {
    const userId = this.$route.params.userId;
    await this.fetchUserData(userId);
  },
  methods: {
    async fetchUserData(userId) {
      this.loading = true;
      this.error = null;
      try {
        const res = await axios.get(`http://localhost:3000/users/${userId}`);
        const data = res.data;
        
        // Update form data with user information
        this.form = {
          username: data.Username || '',
          height: data.Height || '',
          weight: data.Weight || '',
          gender: data.Gender || '',
          age: data.Age || '',
          activity: data.Activity || '',
          bodyFat: data.bodyFat || '',
          goal: data.Goal || ''
        };
      } catch (error) {
        this.error = error.response?.data?.message || 'Error fetching user data';
        console.error('Error fetching user data:', error);
      } finally {
        this.loading = false;
      }
    },
    async recalculateMetrics() {
      this.loading = true;
      try {
        await this.$router.push('/cal');
      } catch (error) {
        console.error('Navigation error:', error);
      } finally {
        this.loading = false;
      }
    }
  },
  watch: {
    '$route.params.userId': {
      async handler(newUserId) {
        if (newUserId) {
          await this.fetchUserData(newUserId);
        }
      },
      immediate: true
    }
  }
};
</script>

<style scoped>
.profile-container {
  min-height: 100vh;
  width: 100vw;
  margin: 0;
  background: linear-gradient(135deg, #E2FCD6 0%, #c9f5b6 100%);
  padding: 2rem;
  font-family: 'Segoe UI', sans-serif;
}

.profile-content {
  max-width: 1200px;
  margin: 0 auto;
  animation: fadeIn 0.6s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.profile-header {
  text-align: center;
  margin-bottom: 3rem;
  padding-top: 2rem;
}

.profile-avatar {
  width: 120px;
  height: 120px;
  margin: 0 auto 1.5rem;

  background: #095D7E;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-avatar i {
  font-size: 4rem;
  color: white;
}

.profile-header h1 {
  font-size: 2.5rem;
  font-weight: 700;
  color: #0A5F4B;
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  font-size: 1.2rem;
}

.profile-sections {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.profile-section {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-section:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
}

.section-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #E2FCD6;
}

.section-header i {
  font-size: 1.8rem;
  color: #095D7E;

}

.section-header h2 {
  color: #0A5F4B;
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
}

.info-grid, .metrics-grid, .goals-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.info-card, .metric-card, .goal-card {
  background: rgb(242, 242, 242);
  padding: 1.5rem;
  border-radius: 15px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.info-card:hover, .metric-card:hover, .goal-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-label, .metric-label, .goal-label {
  display: block;
  color: #666;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
}

.info-value, .metric-value, .goal-value {
  display: block;
  color: #0A5F4B;
  font-size: 1.2rem;
  font-weight: 600;
}

.metric-icon, .goal-icon {
  width: 50px;
  height: 50px;
  background: rgba(20, 150, 127, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 1rem;
}

.metric-icon i, .goal-icon i {
  font-size: 1.5rem;
  color: #095D7E;
}

.profile-actions {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

.recalculate-button {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
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

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #095D7E;
}

.loading-spinner i {
  font-size: 2rem;
}

@media (max-width: 768px) {
  .profile-container {
    padding: 1rem;
  }

  .profile-header {
    margin-bottom: 2rem;
  }

  .profile-header h1 {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .profile-section {
    padding: 1.5rem;
  }

  .section-header h2 {
    font-size: 1.4rem;
  }

  .info-grid, .metrics-grid, .goals-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .profile-actions {
    flex-direction: column;
  }

  .recalculate-button {
    width: 100%;
  }
}
</style>
