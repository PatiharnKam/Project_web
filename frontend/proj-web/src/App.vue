<script>
import{ getAuth ,signOut } from 'firebase/auth';
// Define the logout method
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
    <div id="nav">
      <router-link to="/users">Users</router-link>
      <button class="btn btn-success btn-block full-width" @click="logout">Log out</button>
    </div>
    <router-view />
  </div>
</template>

<style scoped>
</style>
