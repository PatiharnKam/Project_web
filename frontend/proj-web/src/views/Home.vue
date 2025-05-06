<template>
  <div class="home-container">
    <section class="hero-section">
      <vueper-slides
        class="slider-container"
        :touchable="true"
        :infinite="true"
        :fade="true"
        fade-mode="out-in"
        :autoplay="true"
        :bullets="true"
        :bullets-outside="true"
        :duration="3000"
        :delay="5000"
        :parallel="true"
        :dragging-distance="70"
        :breakpoints="{ 
          768: {
            visibleSlides: 1,
            bullets: true,
            bulletsOutside: true
          }
        }"
        @autoplay-pause="handleAutoplayPause"
        @autoplay-resume="handleAutoplayResume"
        @before-slide="beforeSlide"
      >
        <vueper-slide
          v-for="(image, i) in images"
          :key="i"
          :image="image"
          :title="titles[i]"
          :style="{ cursor: 'grab' }"
        >
          <template v-slot:content>
            <div class="hero-text-overlay" :class="{ 'fade-in': true }">
              <div class="main-title">
                <span class="welcome-text">Welcome to</span>
                <span class="brand-name">HealthHelp</span>
              </div>
              <p class="tagline">Start your journey to a healthier lifestyle</p>
            </div>
          </template>
        </vueper-slide>

        <template v-slot:arrow-left>
          <i class="fas fa-chevron-left"></i>
        </template>

        <template v-slot:arrow-right>
          <i class="fas fa-chevron-right"></i>
        </template>

        <template v-slot:bullet-content="{ active }">
          <div :class="['bullet-custom', { active }]"></div>
        </template>
      </vueper-slides>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card">
          <div class="icon-wrapper">
            <i class="fas fa-calculator"></i>
          </div>
          <h3>Calorie Calculator</h3>
          <p>Calculate your daily caloric needs based on your personal metrics</p>
        </div>
        
        <div class="feature-card">
          <div class="icon-wrapper">
            <i class="fas fa-utensils"></i>
          </div>
          <h3>Meal Planning</h3>
          <p>Get personalized meal suggestions tailored to your goals</p>
        </div>
      </div>

      <!-- CTA Button -->
      <div class="cta-container">
        <router-link to="/cal" class="cta-button">
          Start Your Journey
          <i class="fas fa-arrow-right"></i>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

const currentSlide = ref(0)
const images = [
  new URL('../assets/run4.jpg', import.meta.url).href,
  new URL('../assets/food1.jpg', import.meta.url).href,
  new URL('../assets/run2.jpg', import.meta.url).href,
  new URL('../assets/run3.jpg', import.meta.url).href
]

const titles = [
  'Transform Your Life',
  'Healthy Eating Habits',
  'Track Your Progress',
  'Achieve Your Goals'
]

const handleAutoplayPause = () => {
  console.log('Autoplay paused')
}

const handleAutoplayResume = () => {
  console.log('Autoplay resumed')
}

const beforeSlide = (currentSlide) => {
  console.log(`Transitioning to slide ${currentSlide}`)
}
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
}

.slider-container {
  width: 100%;
  height: 100%;
}

/* Customize Vueper Slides */
:deep(.vueperslides) {
  height: 100vh !important;
}

/* Customize dots navigation */
:deep(.vueperslides__bullets) {
  bottom: 50px !important;
  z-index: 10 !important;
  padding: 12px;
  background: transparent;
  position: absolute !important;
  width: 100% !important;
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
}

:deep(.vueperslides__bullet) {
  width: 20px !important;
  height: 20px !important;
  margin: 0 8px !important;
  background-color: rgba(255, 255, 255, 0.4) !important;
  border: 2px solid rgba(255, 255, 255, 0.8) !important;
  transition: all 0.4s ease !important;
  opacity: 1 !important;
}

:deep(.vueperslides__bullet--active) {
  background-color: white !important;
  transform: scale(1.2) !important;
  border-color: white !important;
}

:deep(.vueperslides__track-inner) {
  height: 100vh !important;
}

:deep(.vueperslides__parallax-wrapper) {
  padding-top: 0 !important;
  height: 100vh !important;
}

:deep(.vueperslide) {
  background-color: black;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(0,0,0,0.4), rgba(0,0,0,0.2));
    z-index: 1;
  }
}

:deep(.vueperslide__image) {
  opacity: 0.9;
}

/* Customize arrow navigation */
:deep(.vueperslides__arrow) {
  color: white !important;
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(4px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 50% !important;
  width: 50px !important;
  height: 50px !important;
  transition: all 0.3s ease !important;
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

:deep(.vueperslides__arrow:hover) {
  background: rgba(255, 255, 255, 0.5) !important;
  transform: scale(1.1) !important;
}

:deep(.vueperslides__arrow i) {
  font-size: 1.5rem !important;
}

.hero-text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 2;
  width: 100%;
  padding: 0 20px;
  opacity: 0;
  transition: opacity 0.5s ease;
}

.hero-text-overlay.fade-in {
  opacity: 1;
}

.main-title {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}

.welcome-text {
  font-size: 2.5rem;
  color: white;
  font-weight: 500;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: slideInDown 0.8s ease;
}

.brand-name {
  font-size: 4.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
  animation: slideInUp 0.8s ease 0.2s both;
}

.tagline {
  font-size: 1.5rem;
  color: white;
  margin-top: 1rem;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
  animation: fadeIn 0.8s ease 0.4s both;
}

.features-section {
  padding: 6rem 2rem;
  background: #E2FCD6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem;
}

.feature-card {
  background: white;
  padding: 3rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: default;
}

.feature-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
}

.icon-wrapper {
  width: 100px;
  height: 100px;
  background: #e6f7f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
}

.icon-wrapper i {
  font-size: 2.5rem;
  color: #095D7E;
}

.feature-card h3 {
  color: #095D7E;
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.feature-card p {
  color: #666;
  line-height: 1.8;
  font-size: 1.2rem;
}

.cta-container {
  text-align: center;
  margin-top: 4rem;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  background: #095D7E;
  color: white;
  padding: 1.25rem 3rem;
  border-radius: 50px;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
  box-shadow: 0 4px 6px rgba(9, 93, 126, 0.2);
}

.cta-button:hover {
  background: #074b65;
  transform: translateY(-2px);
  box-shadow: 0 6px 12px rgba(9, 93, 126, 0.3);
}

.cta-button i {
  transition: transform 0.3s ease;
}

.cta-button:hover i {
  transform: translateX(4px);
}

/* Custom bullet styling */
.bullet-custom {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.8);
  transition: all 0.4s ease;
}

.bullet-custom.active {
  background: white;
  transform: scale(1.2);
  border-color: white;
}

/* Improve slider touch interaction */
:deep(.vueperslides__track) {
  cursor: grab;
}

:deep(.vueperslides__track:active) {
  cursor: grabbing;
}

@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .hero-section {
    height: 90vh;
  }

  .welcome-text {
    font-size: 1.8rem;
  }

  .brand-name {
    font-size: 3rem;
  }

  .tagline {
    font-size: 1.2rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
    padding: 0 1.5rem;
  }

  .feature-card {
    padding: 2.5rem;
  }

  .icon-wrapper {
    width: 80px;
    height: 80px;
  }

  .icon-wrapper i {
    font-size: 2rem;
  }

  .feature-card h3 {
    font-size: 1.75rem;
  }

  :deep(.vueperslides__bullets) {
    bottom: 40px !important;
    padding: 8px;
  }

  :deep(.vueperslides__bullet) {
    width: 16px !important;
    height: 16px !important;
    margin: 0 6px !important;
  }

  :deep(.vueperslides__bullets) {
    padding: 6px 12px;
  }

  :deep(.vueperslides__bullet) {
    width: 8px !important;
    height: 8px !important;
    margin: 0 4px !important;
  }

  :deep(.vueperslides__arrow) {
    width: 40px !important;
    height: 40px !important;
  }
  
  :deep(.vueperslides__arrow i) {
    font-size: 1.2rem !important;
  }
}
</style>