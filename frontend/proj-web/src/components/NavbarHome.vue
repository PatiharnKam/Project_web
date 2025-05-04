<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/signin" class="nav-link signin-btn">
        <i class="fas fa-user"></i>
        <span>Sign In</span>
      </router-link>
      <router-link to="/signup" class="nav-link signup-btn">
        <i class="fas fa-user-plus"></i>
        <span>Sign Up</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'NavbarHome'
}
</script>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  padding: 1.5rem 3rem;
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
  background: transparent;
}

.nav-links {
  display: flex;
  gap: 1.5rem;
  align-items: center;
  animation: fadeInDown 0.6s ease forwards;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
  text-decoration: none;
  font-weight: 600;
  font-size: 1rem;
  padding: 0.8rem 1.8rem;
  border-radius: 50px;
  transition: all 0.3s ease;
  border: 2px solid transparent;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.nav-link i {
  font-size: 1.1rem;
}

.nav-link:hover span {
  transform: translateX(3px);
}

.nav-link span {
  transition: transform 0.3s ease;
}

.nav-link:active {
  transform: translateY(1px);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.signin-btn {
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.signin-btn:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.8);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}

.signup-btn {
  background: #095D7E;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
}

.signup-btn:hover {
  background: #074b65;
  border-color: white;
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 6px 20px rgba(9, 93, 126, 0.3);
}

@media (max-width: 768px) {
  .navbar {
    padding: 1rem 1.5rem;
  }
  
  .nav-links {
    gap: 1rem;
  }
  
  .nav-link {
    font-size: 0.9rem;
    padding: 0.6rem 1.4rem;
  }
  
  .nav-link i {
    font-size: 1rem;
  }
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>