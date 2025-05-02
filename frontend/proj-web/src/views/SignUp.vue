<template>
    <div class="signup-page">
      <div class="left-panel">
        <img src="../assets/run3.jpg" alt="Fitness" class="fitness-image" />
        <div class="overlay"></div>
      </div>
      <div class="right-panel">
        <div class="signup-content">
          <h2 class="title">Create Account</h2>
          <p class="subtitle">Join us on your journey to better health</p>

          <form @submit.prevent="signUp" class="signup-form">
            <div class="form-group">
              <label class="form-label">Username*</label>
              <input type="text" v-model="formData.username" class="form-input" placeholder="Enter your username" required />
            </div>

            <div class="form-group">
              <label class="form-label">Email*</label>
              <input type="email" v-model="formData.email" class="form-input" placeholder="Enter your email" required />
            </div>

            <div class="form-group">
              <label class="form-label">Password*</label>
              <div class="password-field">
                <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" class="form-input" placeholder="Enter your password" required />
                <button type="button" class="toggle-password" @click="showPassword = !showPassword">
                  <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Confirm Password*</label>
              <div class="password-field">
                <input :type="showConfirmPassword ? 'text' : 'password'" v-model="formData.confirmPassword" class="form-input" placeholder="Confirm your password" required />
                <button type="button" class="toggle-password" @click="showConfirmPassword = !showConfirmPassword">
                  <i :class="showConfirmPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
            </div>

            <div class="agreement">
              <label class="checkbox-container">
                <input type="checkbox" v-model="formData.acceptAgreement" required />
                <span class="checkmark"></span>
                <span class="agreement-text">I accept the Terms and Privacy Policy</span>
              </label>
            </div>

            <button type="submit" class="signup-btn">
              Create Account
              <i class="fas fa-arrow-right"></i>
            </button>

            <p class="signin-link">
              Already have an account? <router-link to="/signin">Sign in</router-link>
            </p>
          </form>
        </div>
      </div>
    </div>
</template>

<script>
  import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
  
  export default {
    data() {
      return {
        formData: {
          username: '',
          email: '',
          password: '',
          confirmPassword: '',
          acceptAgreement: false,
        },
        showPassword: false,
        showConfirmPassword: false,
      };
    },
    methods: {
      signUp() {
        if (this.formData.password !== this.formData.confirmPassword) {
          alert("Passwords do not match.");
          return;
        }
  
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.formData.email, this.formData.password)
          .then(() => {
            alert("User created successfully!");
          })
          .catch((error) => {
            alert(error.message);
          });
      },
    },
  };
</script>

<style scoped>
.signup-page {
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
}

.left-panel {
  flex: 0.5;
  position: relative;
  overflow: hidden;
}

.fitness-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.right-panel {
  flex: 0.5;
  padding: 2rem;
  background-color: #ccecee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
}

.right-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.signup-content {
  width: 100%;
  max-width: 400px;
  position: relative;
  z-index: 1;
}

.title {
  font-size: 2.5rem;
  font-weight: 700;
  color: #095D7E;
  margin-bottom: 0.5rem;
  text-align: center;
}

.subtitle {
  font-size: 1.1rem;
  color: #095D7E;
  opacity: 0.8;
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 2rem;
}

.form-label {
  display: block;
  margin-bottom: 0.5rem;
  color: #095D7E;
  font-weight: 600;
  text-align: left;
  font-size: 1rem;
}

.form-input {
  width: 100%;
  padding: 1rem 5rem;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.9);
  border: 2px solid rgba(9, 93, 126, 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
}

.form-input:focus {
  outline: none;
  border-color: #095D7E;
  background: white;
  box-shadow: 0 0 0 4px rgba(9, 93, 126, 0.1);
}

.password-field {
  position: relative;
}

.toggle-password {
  position: absolute;
  right: 15px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  color: #095D7E;
  cursor: pointer;
  padding: 5px;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.toggle-password:hover {
  opacity: 1;
}

.agreement {
  margin: 1.5rem 0;
}

.checkbox-container {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  color: #095D7E;
}

.checkbox-container input[type="checkbox"] {
  width: 18px;
  height: 18px;
  border-radius: 4px;
  border: 2px solid #095D7E;
  cursor: pointer;
  position: relative;
  appearance: none;
  background: white;
  transition: all 0.3s ease;
}

.checkbox-container input[type="checkbox"]:checked {
  background: #095D7E;
}

.checkbox-container input[type="checkbox"]:checked::after {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 12px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.signup-btn {
  width: 100%;
  padding: 1rem;
  background-color: #095D7E;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.signup-btn:hover {
  background-color: #074b65;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(9, 93, 126, 0.2);
}

.signup-btn:active {
  transform: translateY(0);
}

.signup-btn i {
  transition: transform 0.3s ease;
}

.signup-btn:hover i {
  transform: translateX(4px);
}

.signin-link {
  text-align: center;
  color: #095D7E;
  font-size: 0.95rem;
}

.signin-link a {
  color: #095D7E;
  font-weight: 600;
  text-decoration: none;
  position: relative;
}

.signin-link a::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #095D7E;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.signin-link a:hover::after {
  transform: scaleX(1);
}

@media (max-width: 768px) {
  .signup-page {
    flex-direction: column;
  }

  .left-panel {
    flex: 0;
    height: 35vh;
  }

  .right-panel {
    flex: 1;
    padding: 2rem 1.5rem;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }
}
</style>
