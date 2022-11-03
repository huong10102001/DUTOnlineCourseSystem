<template>
  <div class="course-detail__section no-lr-top-border has-background-white p-3 columns">

      <div class="column is-half">
        <h1 class="is-size-5 is-capitalized">{{ course.title }}</h1>
        <p class="mt-3">
          {{ course.summary }}
        </p>
        <button class="button is-dark mt-3 is-rounded">Enroll now</button>
      </div>

      <div class="column">
        <h1 class="is-size-5 ml-3">Lecturer</h1>
        <div class="columns">

          <div class="column is-one-third">
            <figure class="image is-128x128">
              <img class="is-rounded" src="@/assets/vectors/default_avatar.svg">
            </figure>
          </div>

          <div class="column">
            <h3 class="is-capitalized">{{ course.user?.full_name }}</h3>
            <p class="mt-1">{{ course.user?.bio }}</p>
          </div>

        </div>
      </div>

    </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    course: {} as any
  }
})

export default class InfoSection extends Vue {
  course!: any
}
</script>

<style scoped lang="scss">
.no-lr-top-border {
  border-radius: 0 0 20px 20px !important;
}
</style>