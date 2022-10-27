<template>
    <router-view></router-view>
  </template>
  
  <script lang="ts">
  import {Options, Vue} from 'vue-class-component';
  import DetailLesson from "@/views/lesson/detail/index.vue";
  
  @Options({
    components: {
      DetailLesson
    }
  })
  
  export default class LessonBasePage extends Vue {}
  </script>
  
  <style lang="scss" scoped>
  
  </style>