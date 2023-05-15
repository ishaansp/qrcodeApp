<template>
  <nav>
    <div class="header" v-if="isLoggedIn">
      <router-link class="link" to="/" @click="logout()">logout</router-link>
      <span class="version"> 1.0.0 v</span>
    </div>
  </nav>
  <router-view />
</template>
<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";

const isLoggedIn = ref(false);
const route = useRoute();

const logout = () => {
  // localStorage.clear();
  localStorage.removeItem("user");
  localStorage.removeItem("role");
};
onMounted(() => {
  isLoggedIn.value = localStorage.getItem("user") ? true : false;
});
watch(
  () => route.fullPath,
  () => {
    isLoggedIn.value = localStorage.getItem("user") ? true : false;
  }
);
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin-top: 10px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.link {
  margin-right: 10px;
}
.link:hover {
  opacity: 75%;
}
.header {
  display: flex;
  justify-content: flex-end;
}
.version {
  font-size: 15px;
  margin-right: 20px;
}
</style>
