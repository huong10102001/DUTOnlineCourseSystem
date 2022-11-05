<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import DetailLesson from "@/views/lesson/detail/index.vue";

@Options({
  
})

export default class LessonBasePage extends Vue {
}
</script>
