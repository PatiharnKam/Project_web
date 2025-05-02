<script>
import{ getAuth ,signOut } from 'firebase/auth';
export default {
  name: 'App',
  method: {
    logout() {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.$router.push('/signin');
      }).catch((error) => {
        alert(error.message);
        console.error(error);
      });
    }
  }
}
</script>

<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
#app {
  margin: 0;
  padding: 0;
  width: 100vw;
  min-height: 100vh;
}
</style>
