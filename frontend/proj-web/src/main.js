import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'

import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
// import { getAnalytics } from "firebase/analytics";

let app
let auth

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

const firebaseConfig = {
    apiKey: "AIzaSyADcL311U0lRooxjHgSZ6hIuYXzQYwh8pI",
    authDomain: "egco427-c5768.firebaseapp.com",
    projectId: "egco427-c5768",
    storageBucket: "egco427-c5768.firebasestorage.app",
    messagingSenderId: "964963659315",
    appId: "1:964963659315:web:65b94dac468a1da9e3bd46",
    measurementId: "G-37EYW32M2S"
  };

initializeApp(firebaseConfig)
auth = getAuth()
onAuthStateChanged(auth, () => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})

createApp(App).use(router).mount('#app')


