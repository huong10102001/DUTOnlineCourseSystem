<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column" v-html="description"></div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    description: ""
  }
})

export default class DescriptionSection extends Vue {
  description!: string
}
</script>

<style lang="scss" scoped>
h1 {
  font-size: 2rem;
}
</style>