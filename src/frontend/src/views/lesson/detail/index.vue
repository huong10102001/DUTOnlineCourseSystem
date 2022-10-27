<template>
  <VideoSection></VideoSection>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import VideoSection from "@/views/lesson/detail/VideoSection.vue";

@Options({
  components: {
    VideoSection
  }
})
export default class LessonDetail extends Vue {}
</script>

<style>

</style>