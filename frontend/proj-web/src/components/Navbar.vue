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
  background-color: #1aa179;
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
  gap: 24px; /* เพิ่มช่องว่างระหว่างไอคอนให้มากขึ้น */
  font-size: 1.4rem;
  cursor: pointer;
}

.user-icon,
.logout-icon {
  font-size: 1.6rem;
}

.user-icon:hover,
.logout-icon:hover {
  opacity: 0.7;
}

/* เพิ่ม margin-top ให้กับเนื้อหาหลัก */
#app {
  margin-top: 60px;
}
</style>
