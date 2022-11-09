<template>
  <div class="lesson-container__section">
    <p class="title is-4">Description</p>
    <p class="mt-5" v-html="content"></p>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    content: String,
  },
})
export default class DescriptionSection extends Vue {}
</script>

<style>

</style>