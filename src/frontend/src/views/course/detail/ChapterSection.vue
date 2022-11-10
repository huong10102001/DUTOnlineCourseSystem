<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column">
      <h1 class="is-size-5 mb-5">There are {{ chapter_number }} chapters in this course</h1>
      <div v-for="(chapter, index) in chapters" class="mb-5">
        <div class="columns is-vcentered">
          <div class="column has-text-centered is-size-4 is-fullwidth is-one-third-desktop">
            <p class="">Chapter</p>
            <p class="has-text-weight-medium mt-2">{{ index+1 }}</p>
          </div>
          <div class="column has-text-centered">
            <h3 class="is-size-4">{{ chapter.title }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    chapters: null
  },
  data() {
    return {
      chapter_number: 0
    }
  },
  beforeUpdate() {
    this.chapter_number = this.chapters.length
  }
})

export default class ChapterSection extends Vue {
}
</script>
