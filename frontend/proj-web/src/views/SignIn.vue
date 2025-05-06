<template>
  <div class="login-container">
    <div class="left-panel">
      <div class="login-content">
        <h2 class="title">Welcome Back</h2>
        <p class="subtitle">Continue your journey to better health</p>

        <form @submit.prevent="signIn" class="login-form">
          <div class="form-group">
            <label class="form-label">Email*</label>
            <input type="email" v-model="formData.email" class="form-input" placeholder="Enter your email" required />
          </div>

          <div class="form-group">
            <label class="form-label">Password*</label>
            <div class="password-field">
              <input :type="showPassword ? 'text' : 'password'" v-model="formData.password" class="form-input"
                placeholder="Enter your password" required />
              <button type="button" class="toggle-password" @click="togglePassword">
                <i :class="showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
              </button>
            </div>
          </div>

          <button type="submit" class="login-button">
            Sign In
            <i class="fas fa-arrow-right"></i>
          </button>

          <p class="signup-text">
            Don't have an account? <router-link to="/signup">Sign up</router-link>
          </p>

          <button type="button" class="google-button" @click="signInWithGoogle">
            <img src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png"
              alt="Google Logo" />
            Continue with Google
          </button>
        </form>
      </div>
    </div>
    <div class="right-panel">
      <img src="../assets/food1.jpg" alt="Healthy Food" class="login-image" />
      <div class="overlay"></div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useToastNotification } from '../composables/useToastNotification';

const router = useRouter();
const { showSuccess, showError } = useToastNotification();

const formData = ref({
  email: '',
  password: ''
});

const showPassword = ref(false);
const isLoading = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const signIn = async () => {
  isLoading.value = true;
  try {
    const auth = getAuth();
    const { user } = await signInWithEmailAndPassword(auth, formData.value.email, formData.value.password);
    sessionStorage.setItem('token', await user.getIdToken());
    sessionStorage.setItem('userid', user.uid);
    showSuccess('Successfully signed in!');
    router.push('/home');
  } catch (error) {
    showError('Sign in failed. Please check your credentials.');
  } finally {
    isLoading.value = false;
  }
};

const signInWithGoogle = async () => {
  try {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const { user } = await signInWithPopup(auth, provider);
    sessionStorage.setItem('token', await user.getIdToken());
    sessionStorage.setItem('userid', user.uid);
    showSuccess('Successfully signed in with Google!');
    router.push('/home');
  } catch (error) {
    showError('Google sign in failed. Please try again.');
  }
};
</script>

<style scoped>
.login-container {
  display: flex;
  min-height: 100vh;
  width: 100vw;
  font-family: 'Arial', sans-serif;
  overflow-x: hidden;
}

.left-panel {
  flex: 1;
  background-color: #ccecee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 2rem;
}

.left-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 100%);
  pointer-events: none;
}

.right-panel {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.login-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: transform 0.3s ease;
}

.overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
}

.login-content {
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
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
}

.login-button:hover {
  background-color: #074b65;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(9, 93, 126, 0.2);
}

.login-button:active {
  transform: translateY(0);
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
  position: relative;
}

.signup-text a::after {
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

.signup-text a:hover::after {
  transform: scaleX(1);
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

@media (max-width: 768px) {
  .login-container {
    flex-direction: column;
    height: auto;
    overflow-y: auto;
  }

  .left-panel {
    order: 2;
    width: 100%;
    min-height: 65vh;
    padding: 2rem 1rem;
  }

  .right-panel {
    order: 1;
    width: 100%;
    height: 35vh;
  }

  .title {
    font-size: 2rem;
  }

  .subtitle {
    font-size: 1rem;
  }

  .login-content {
    width: 100%;
  }
}
</style>