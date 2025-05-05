<template>
  <div class="home-container bg-[#ccecee]">
    <NavbarHome />
    <!-- Hero Section with Full Width Slider -->
    <section class="hero-section">
      <!-- Image Slider -->
      <div class="slider-container">
        <div class="slider-content">
          <button class="nav-button prev" @click="prevSlide">
            <i class="fas fa-chevron-left"></i>
          </button>
          
          <div class="image-container">
            <img 
              :src="images[currentIndex]" 
              :alt="'Slide ' + (currentIndex + 1)"
              class="slider-image"
            />
            <div class="image-overlay"></div>
          </div>
          
          <button class="nav-button next" @click="nextSlide">
            <i class="fas fa-chevron-right"></i>
          </button>

          <!-- Centered Text Over Slider -->
          <div class="hero-text-overlay">
            <h1 class="main-title">
              <span class="welcome-text">Welcome to</span>
              <span class="brand-name">HealthHelp</span>
            </h1>
            <p class="tagline">Your journey to a healthier lifestyle starts here</p>
          </div>

          <!-- Dots -->
          <div class="slider-dots">
            <button
              v-for="(_, index) in images"
              :key="index"
              @click="currentIndex = index"
              :class="['dot', { active: currentIndex === index }]"
            ></button>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section">
      <div class="features-grid">
        <div class="feature-card" @mouseenter="startHover" @mouseleave="endHover">
          <div class="icon-wrapper">
            <i class="fas fa-calculator"></i>
          </div>
          <h3>Calorie Calculator</h3>
          <p>Calculate your daily caloric needs based on your personal metrics</p>
        </div>
        
        <div class="feature-card" @mouseenter="startHover" @mouseleave="endHover">
          <div class="icon-wrapper">
            <i class="fas fa-utensils"></i>
          </div>
          <h3>Meal Planning</h3>
          <p>Get personalized meal suggestions tailored to your goals</p>
        </div>
        
        <div class="feature-card" @mouseenter="startHover" @mouseleave="endHover">
          <div class="icon-wrapper">
            <i class="fas fa-chart-line"></i>
          </div>
          <h3>Progress Tracking</h3>
          <p>Monitor your health journey with detailed analytics</p>
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
import { ref, onMounted, onBeforeUnmount } from 'vue';
import NavbarHome from '../components/NavbarHome.vue';

const images = [
  new URL('../assets/run4.jpg', import.meta.url).href,
  new URL('../assets/food1.jpg', import.meta.url).href,
  new URL('../assets/run2.jpg', import.meta.url).href,
  new URL('../assets/run3.jpg', import.meta.url).href,
];

const currentIndex = ref(0);
let intervalId = null;

const nextSlide = () => {
  currentIndex.value = (currentIndex.value + 1) % images.length;
};

const prevSlide = () => {
  currentIndex.value = (currentIndex.value - 1 + images.length) % images.length;
};

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000);
});

onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId);
});

const startHover = (event) => {
  const card = event.currentTarget;
  card.style.transform = 'translateY(-10px)';
};

const endHover = (event) => {
  const card = event.currentTarget;
  card.style.transform = 'translateY(0)';
};
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
  position: relative;
}

.slider-content {
  width: 100%;
  height: 100%;
  position: relative;
}

.image-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.slider-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.2) 100%);
}

.hero-text-overlay {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  z-index: 20;
  width: 100%;
  padding: 0 20px;
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
}

.brand-name {
  font-size: 4.5rem;
  font-weight: 800;
  color: white;
  letter-spacing: -1px;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.tagline {
  font-size: 1.5rem;
  color: white;
  margin-top: 1rem;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.3);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.9);
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 30;
}

.nav-button:hover {
  background: white;
  transform: translateY(-50%) scale(1.1);
}

.prev {
  left: 30px;
}

.next {
  right: 30px;
}

.slider-dots {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 6px;
  z-index: 30;
}

.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  padding: 0;
}

.dot.active {
  background: rgba(255, 255, 255, 0.9);
  transform: scale(1.2);
}

.features-section {
  padding: 6rem 2rem;
  background: #E2FCD6;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1400px;
  margin: 0 auto;
}

.feature-card {
  background: white;
  padding: 2.5rem;
  border-radius: 20px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  background: #e6f7f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.5rem;
}

.icon-wrapper i {
  font-size: 2rem;
  color: #095D7E;
}

.feature-card h3 {
  color: #095D7E;
  font-size: 1.75rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  font-size: 1.1rem;
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
    gap: 1.5rem;
    padding: 0 1rem;
  }

  .features-section {
    padding: 4rem 1rem;
  }

  .nav-button {
    width: 40px;
    height: 40px;
  }

  .prev {
    left: 15px;
  }

  .next {
    right: 15px;
  }

  .cta-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
  }
}
</style>
