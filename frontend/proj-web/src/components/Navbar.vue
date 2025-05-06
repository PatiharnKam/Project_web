<template>
  <div class="navbar">
    <div class="logo">
      <i class="fas fa-dumbbell dumbbell-icon"></i>
      <span class="logo-text" @click="goToHome">Healthy</span>
    </div>
    <div class="right-section">
      <i class="fa fa-user user-icon" @click="goToProfile"></i>
      <i class="fa fa-sign-out-alt logout-icon" @click="logout"></i>
    </div>
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
export default {
  name: 'Navbar',
  methods: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('userid');
          location.reload();
          this.$router.push('/home').then(() => {
          location.reload();
      });
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    goToHome() {
      this.$router.push('/home');
    },
    goToProfile() {
      const userId = sessionStorage.getItem('userid');
      if (userId) {
        this.$router.push(`/profile/${userId}`);
      } else {
        alert("User ID not found. Please login again.");
      }
    }
  }
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #14967F;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  color: white;
  z-index: 1000;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  animation: fadeSlideDown 0.5s ease-in-out;
}

.logo-text {
  font-size: 1.8rem;
  font-weight: 700;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  background: linear-gradient(to right, #ffffff, rgba(255, 255, 255, 0.85));
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  position: relative;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.logo-text::after {
  content: '';
  position: absolute;
  bottom: 2px;
  left: 0;
  width: 0;
  height: 2px;
  background: #fff;
  transition: width 0.3s ease;
}

.logo-text:hover {
  transform: scale(1.05) translateY(-2px);
}

.logo-text:hover::after {
  width: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.dumbbell-icon {
  font-size: 1.8rem;
  color: white;
  transition: transform 0.3s ease;
}

.logo:hover .dumbbell-icon {
  animation: swingDumbbell 0.6s ease-in-out infinite;
}

@keyframes swingDumbbell {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-20deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(20deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.right-section {
  display: flex;
  align-items: center;
  gap: 24px;
  font-size: 1.4rem;
}

.nav-link {
  color: white;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  opacity: 0.8;
}

.user-icon,
.logout-icon {
  font-size: 1.6rem;
  cursor: pointer;
  transition: transform 0.2s, opacity 0.3s;
}

.user-icon:hover,
.logout-icon:hover {
  transform: scale(1.15);
  opacity: 0.8;
}

#app {
  margin-top: 60px;
}
</style>