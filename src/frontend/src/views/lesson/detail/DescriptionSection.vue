<template>
  <div class="lesson-container__section">
    <div v-if="course_process == PROCESS_STATUS.COMPLETED" class="notification is-primary">
      <button class="delete"></button>
      <strong>Congratulations!</strong>
      You has completed this course! Get your <router-link :to="{name: 'certification', course_slug: $route.params.course_slug}">certificate</router-link> now.
    </div>
    <p class="title is-4">Description</p>
    <p class="mt-5" v-html="content"></p>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {PROCESS_STATUS} from "@/const/process_status";

@Options({
  props: {
    course_process: "",
    content: "",
  },
  data(){
    return {
      PROCESS_STATUS: PROCESS_STATUS
    }
  }
})
export default class DescriptionSection extends Vue {}
</script>

<style>

</style>