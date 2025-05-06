<template>
  <div id="app">
    <!-- ถ้า login แล้ว → แสดง Navbar ปกติ ยกเว้น signin/signup -->
    <Navbar v-if="isLoggedIn && !isAuthPage" />

    <!-- ถ้าไม่ได้ login → แสดง NavbarHome ยกเว้น signin/signup -->
    <NavbarHome v-else-if="!isLoggedIn && !isAuthPage" />

    <router-view />
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import Navbar from './components/Navbar.vue';
import NavbarHome from './components/NavbarHome.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    NavbarHome
  },
  data() {
    return {
      isLoggedIn: false
    };
  },
  computed: {
    isAuthPage() {
      return this.$route.path === '/signin' || this.$route.path === '/signup';
    }
  },
  watch: {
    $route() {
      this.updateLoginState();
    }
  },
  mounted() {
    this.updateLoginState();
  },
  methods: {
    updateLoginState() {
      this.isLoggedIn = !!sessionStorage.getItem('token');
    },
  }
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
}
@media print {
  .navbar {
    display: none !important;
  }
}
</style>
