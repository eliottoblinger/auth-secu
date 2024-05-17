<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref('');
const password = ref('');
const API_ENDPOINT = 'http://localhost:4000/api/login';

const login = async () => {
  const res = await fetch(API_ENDPOINT, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  });

  if(res.status === 400){
    return;
  }

  const token = await res.json();

  localStorage.setItem('auth-jwt', JSON.stringify(token));

  await router.push('/');
}
</script>

<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped>

</style>