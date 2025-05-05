<template>
  <div id="app">
    <!-- แสดง Navbar เฉพาะเมื่อไม่อยู่ในหน้าที่ซ่อน -->
    <Navbar v-if="showNavbar" @logout="logout" />
    <router-view />
  </div>
</template>

<script>
import { getAuth, signOut } from 'firebase/auth';
import Navbar from './components/Navbar.vue';
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();

    // ซ่อน Navbar ในหน้า signin หรือ register
    const hideNavbarRoutes = ['/signin', '/signup','/home'];
    const showNavbar = computed(() => !hideNavbarRoutes.includes(route.path));

    const logout = () => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          router.push('/signin');
        })
        .catch((error) => {
          alert(error.message);
          console.error(error);
        });
    };

    return {
      showNavbar,
      logout,
    };
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
}
</style>


