<template>
  <form class="login" @submit.prevent="login">
    <label for="username"
      >Username:
      <input id="username" type="text" required v-model.trim="username"
    /></label>
    <label for="password"
      >Password:
      <input id="password" type="password" required v-model="password" />
    </label>
    <button type="submit" class="btn btn-success">Login</button>
    <div v-if="error" class="alert alert-danger" role="alert">{{ error }}</div>
  </form>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const username = ref("");
const password = ref("");
const error = ref("");
const credentials = [
  {
    user: "Admin",
    password: "123456789",
    role: "Admin",
  },
  {
    user: "Planner",
    password: "123456789",
    role: "Planner",
  },
  {
    user: "Emp1",
    password: "123456789",
    role: "Emp",
  },
  {
    user: "Emp2",
    password: "123456789",
    role: "testStation",
  },
];
const router = useRouter();

const login = () => {
  const findUser = credentials.find(
    (it) => it.user === username.value && it.password === password.value
  );
  if (findUser) {
    localStorage.setItem("user", username.value);
    localStorage.setItem("role", findUser.role);
    error.value = "";
    return router.push(`${findUser.role}`);
  }
  error.value = "invalid credentials";
};
</script>
<style scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
</style>