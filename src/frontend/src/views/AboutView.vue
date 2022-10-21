<template>
  <div class="about">
    <h1>This is an about page</h1>
    <el-calendar v-model="value" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
const value = ref(new Date())
</script>
