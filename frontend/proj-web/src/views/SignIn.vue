<template>
    <div class="login-container">
      <div class="left-panel">
        <div class="content-wrapper">
          <h2>
            <span class="title">Health</span>
            <span class="sub-text">is not valued until<br>sickness comes</span>
          </h2>
          
          <div class="form-group">
            <input type="email" v-model="formData.email" class="form-input" placeholder="Username" />
          </div>

          <div class="form-group password-container">
            <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" class="form-input" placeholder="Password" />
            <button type="button" class="toggle-password" @click="togglePassword">
              <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
            </button>
          </div>
          
          <div class="options">
            <label class="remember-me">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" @click.prevent class="forgot-link">Forgot your password?</a>
          </div>
          
          <button class="login-button" @click="signIn">Log in</button>
    
          <p class="signup-text">
            Don't have an account? <router-link to="/signup">Sign up</router-link>
          </p>
    
          <button class="google-button">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png" alt="Google Logo" />
            Continue with Google
          </button>
        </div>
      </div>
    
      <div class="right-panel">
        <img src="../assets/food1.jpg" alt="Healthy Food" class="login-image" />
        <div class="overlay"></div>
      </div>
    </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

export default {
  name: 'SignIn',
  data() {
    return {
      formData: {
        email: '',
        password: ''
      },
      showPassword: false
    }
  },
  methods: {
    signIn() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.formData.email, this.formData.password)
        .then(() => {
          this.$router.push('/users');
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    togglePassword() {
      this.showPassword = !this.showPassword;
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.login-container {
  display: flex;
  height: 100vh;
  width: 100vw;
  font-family: 'Arial', sans-serif;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  background-color: #ffffff;
}

.left-panel {
  flex: 1;
  background-color: #ccecee;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
  padding: 2rem;
}

.content-wrapper {
  width: 80%;
  max-width: 400px;
}

.title {
  display: block;
  font-size: 5rem;
  font-weight: 700;
  color: #095D7E;
  margin-bottom: 0.5rem;
  text-align: left; 
}

.sub-text {
  display: block;
  font-size:3rem;
  color: #095D7E;
  opacity: 0.8;
  line-height: 1.4;
  margin-bottom: 3rem;
  text-align: left; 
}

.form-group {
  margin-bottom: 1.5rem;
  position: relative;
}

.form-input {
  width: 100%;
  padding: 1rem 1.2rem;
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

.password-container {
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
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.7;
  transition: opacity 0.3s ease;
}

.toggle-password:hover {
  opacity: 1;
}

.options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  font-size: 0.9rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #095D7E;
  cursor: pointer;
}

.remember-me input[type="checkbox"] {
  width: 16px;
  height: 16px;
  border-radius: 4px;
  border: 2px solid #095D7E;
  cursor: pointer;
}

.forgot-link {
  color: #095D7E;
  text-decoration: none;
  opacity: 0.8;
  transition: opacity 0.3s ease;
}

.forgot-link:hover {
  opacity: 1;
}

.login-button {
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
  margin-bottom: 1.5rem;
  box-shadow: 0 4px 6px rgba(9, 93, 126, 0.1);
}

.login-button:hover {
  background-color: #074b65;
  transform: translateY(-1px);
  box-shadow: 0 6px 8px rgba(9, 93, 126, 0.2);
}

.signup-text {
  text-align: center;
  margin-bottom: 2rem;
  color: #095D7E;
  font-size: 0.95rem;
}

.signup-text a {
  color: #095D7E;
  font-weight: 600;
  text-decoration: none;
  border-bottom: 2px solid transparent;
  transition: border-color 0.3s ease;
}

.signup-text a:hover {
  border-bottom-color: #095D7E;
}

.google-button {
  width: 100%;
  padding: 0.8rem;
  background-color: white;
  border: 2px solid rgba(9, 93, 126, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.google-button:hover {
  background-color: #f8f9fa;
  border-color: rgba(9, 93, 126, 0.2);
}

.google-button img {
  height: 24px;
  object-fit: contain;
}

.right-panel {
  flex: 1.2;
  position: relative;
  overflow: hidden;
}

.login-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}


@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
  }
  
  .left-panel {
    order: 2;
    min-width: 100%;
    padding: 2rem 1rem;
  }
  
  .right-panel {
    order: 1;
    height: 35vh;
  }
  
  .content-wrapper {
    width: 100%;
  }
  
  .title {
    font-size: 2rem;
  }
  
  .sub-text {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
  
}
</style>
