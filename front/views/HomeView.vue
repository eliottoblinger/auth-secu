<script setup>
import { ref, onMounted } from 'vue';

const token = ref('');

onMounted(() => {
  token.value = localStorage.getItem('auth-jwt');
});
</script>

<template>
  <div v-if="token !== null && token !== ''">
    Connected
  </div>
  <div v-else>
    Disconnected
  </div>
</template>

<style scoped>

</style>