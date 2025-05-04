<template>
  <div class="signup-page">
    <div class="left-panel">
      <img src="../assets/run4.jpg" alt="Fitness" class="fitness-image" />
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
              <span class="agreement-text" @click="showTerms">I accept the Terms and Privacy Policy</span>
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

    <!-- Terms Modal -->
    <div class="modal" v-if="showTermsModal">
      <div class="modal-content">
        <div class="modal-header">
          <h3>Terms of Use and Privacy Policy</h3>
          <button class="close-btn" @click="showTermsModal = false">&times;</button>
        </div>
        <div class="modal-body">
          <div class="terms-section">
            <h4>Terms of Use</h4>
            
            <h5>1. Acceptance of Terms</h5>
            <p>By accessing our system (the website), you agree to all terms and conditions stated in this document. If you do not agree with any part of these terms, please discontinue using the service immediately.</p>

            <h5>2. Scope of Service</h5>
            <p>Our system is designed solely to help users monitor and manage their personal health information. It does not provide any medical diagnosis or treatment.</p>

            <h5>3. User Responsibilities</h5>
            <p>Users are responsible for providing accurate, current, and truthful information. You must not use the service for unlawful purposes or in a way that may cause harm.</p>

            <h5>4. Content Ownership</h5>
            <p>The data input into the system by users remains the property of the user. We will not use this data for commercial purposes without your explicit consent.</p>

            <h5>5. Modifications to Terms</h5>
            <p>We reserve the right to modify these Terms of Use at any time. Users will be notified through the system or via email before the changes take effect.</p>
          </div>

          <div class="privacy-section">
            <h4>Privacy Policy</h4>

            <h5>1. Information We Collect</h5>
            <ul>
              <li>Personal Information: Such as name, age, gender, and email address</li>
              <li>Health Information: Such as weight, height, exercise data, etc.</li>
            </ul>

            <h5>2. Purpose of Data Collection</h5>
            <ul>
              <li>To provide personalized health analysis</li>
              <li>To improve service quality and user experience</li>
              <li>To contact users when necessary</li>
            </ul>

            <h5>3. Data Storage and Security</h5>
            <p>All data will be securely stored using encrypted systems and in compliance with standard security protocols.</p>

            <h5>4. Data Sharing</h5>
            <p>We will not disclose your information to any third party unless:</p>
            <ul>
              <li>We have obtained your consent</li>
              <li>We are required to do so by law or government order</li>
            </ul>

            <h5>5. User Rights</h5>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request deletion, correction, or suspension of data usage</li>
              <li>Withdraw your consent at any time</li>
            </ul>

            <h5>6. Contact Us</h5>
            <p>If you have any questions about this policy, please contact us:</p>
            <p>Email: nene.nattamon@studenmahidol.edu</p>
            <p>Phone: 091-234-56789</p>
          </div>
        </div>
        <div class="modal-footer">
          <button class="accept-btn" @click="acceptTerms">Accept</button>
          <button class="decline-btn" @click="declineTerms">Decline</button>
        </div>
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
      showTermsModal: false
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
          alert("Account created successfully!");
          this.$router.push('/signin'); // Redirect to sign-in page
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    showTerms() {
      this.showTermsModal = true;
    },
    
    acceptTerms() {
      this.formData.acceptAgreement = true;
      this.showTermsModal = false;
    },
    
    declineTerms() {
      this.formData.acceptAgreement = false;
      this.showTermsModal = false;
    }
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

.modal {
position: fixed;
text-align: left;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0, 0, 0, 0.5);
display: flex;
justify-content: center;
align-items: center;
z-index: 1000;
}

.modal-content {
background: white;
width: 90%;
max-width: 800px;
max-height: 90vh;
border-radius: 12px;
box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
display: flex;
flex-direction: column;
}

.modal-header {
padding: 1.5rem;
border-bottom: 1px solid #eee;
display: flex;
justify-content: space-between;
align-items: center;
}

.modal-header h3 {
color: #095D7E;
margin: 0;
font-size: 1.5rem;
}

.close-btn {
background: none;
border: none;
font-size: 1.5rem;
color: #666;
cursor: pointer;
padding: 0.5rem;
transition: color 0.3s ease;
}

.close-btn:hover {
color: #095D7E;
}

.modal-body {
padding: 1.5rem;
overflow-y: auto;
max-height: calc(90vh - 140px);
}

.terms-section,
.privacy-section {
margin-bottom: 2rem;
}

.modal-body h4 {
color: #095D7E;
margin-bottom: 1rem;
font-size: 1.3rem;
}

.modal-body h5 {
color: #095D7E;
margin: 1.5rem 0 0.5rem;
font-size: 1.1rem;
}

.modal-body p,
.modal-body li {
color: #444;
line-height: 1.6;
margin-bottom: 0.5rem;
}

.modal-body ul {
list-style-type: disc;
margin-left: 1.5rem;
margin-bottom: 1rem;
}

.modal-footer {
padding: 1.5rem;
border-top: 1px solid #eee;
display: flex;
justify-content: flex-end;
gap: 1rem;
}

.accept-btn,
.decline-btn {
padding: 0.8rem 2rem;
border-radius: 8px;
font-weight: 600;
cursor: pointer;
transition: all 0.3s ease;
}

.accept-btn {
background-color: #095D7E;
color: white;
border: none;
}

.accept-btn:hover {
background-color: #074b65;
transform: translateY(-1px);
}

.decline-btn {
background-color: white;
color: #095D7E;
border: 2px solid #095D7E;
}

.decline-btn:hover {
background-color: #f8f9fa;
}

.agreement-text {
text-decoration: underline;
cursor: pointer;
}

.agreement-text:hover {
color: #074b65;
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

.modal-content {
  width: 95%;
  max-height: 95vh;
}

.modal-body {
  max-height: calc(95vh - 140px);
}

.modal-footer {
  flex-direction: column;
  gap: 0.5rem;
}

.accept-btn,
.decline-btn {
  width: 100%;
}
}
</style>