<template>
  <router-view :key="$route.params.lesson_slug"></router-view>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({})

export default class LessonBasePage extends Vue {
}
</script>
