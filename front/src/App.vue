<script setup>
import {onMounted, ref} from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();

const token = ref('');

onMounted(() => {
  token.value = localStorage.getItem('auth-jwt');
});

const logout = async () => {
  localStorage.removeItem('auth-jwt');
  location.reload();
}

</script>

<template>
  <nav style="display: flex; justify-content: space-between">
    <RouterLink to="/">Status</RouterLink>
    <div v-if="token === null || token === ''">
      {{token}}
      <RouterLink to="/register">Sign up</RouterLink>
      <RouterLink to="/login">Sign in</RouterLink>
    </div>
    <button v-else @click="logout">Log out</button>
  </nav>
  <main>
    <RouterView />
  </main>
</template>

<style scoped>
</style>
