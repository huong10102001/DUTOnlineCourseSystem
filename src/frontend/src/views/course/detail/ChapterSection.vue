<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column">
      <h1 class="is-size-5 mb-5">There are 4 Chapter in this section</h1>
      <div v-for="i in 4">
        <div class="columns is-vcentered">
          <div class="column is-one-third has-text-centered is-size-4">
            <p>Chapter</p>
            <p class="has-text-weight-medium mt-2">{{ i }}</p>
          </div>
          <div class="column">
            <h3 class="is-size-4"> Chapter name {{ i }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
  }
})

export default class ChapterSection extends Vue {
}
</script>
