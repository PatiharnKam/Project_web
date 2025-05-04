<template>
  <div class="navbar">
    <div class="logo-text">Healthy</div>
    <div class="right-section">
      <i class="fa fa-user user-icon"></i>
      <i class="fa fa-sign-out-alt logout-icon"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Navbar',
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
}

.logo-text {
  font-size: 1.6rem;
  font-weight: bold;
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
}

.user-icon:hover,
.logout-icon:hover {
  opacity: 0.7;
}

#app {
  margin-top: 60px;
}
</style>
