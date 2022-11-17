<template>
  <div class="course-detail__section no-lr-top-border has-background-white p-3 columns">

      <div class="column is-half">
        <h1 class="is-size-5 is-capitalized">{{ course.title }}</h1>
        <p class="mt-3">
          {{ course.summary }}
        </p>
        <button
          v-if="course.process_status == PROCESS_STATUS.NOT_OPEN"
          class="button is-dark mt-3 is-rounded"
          @click="enterCourse">
          Enroll now
        </button>
        <button
          v-else-if="course.process_status == PROCESS_STATUS.COMPLETED"
          class="button is-info mt-3 is-rounded"
          @click="enterCourse">
          Review
        </button>
        <button
          v-else
          class="button is-primary mt-3 is-rounded"
          @click="enterCourse">
          Continue
        </button>
      </div>

      <div class="column">
        <h1 class="is-size-5 ml-3 mb-3">Lecturer</h1>
        <div class="columns">

          <div class="column is-one-third">
            <figure class="image is-128x128">
              <img v-if="course.user?.avatar" class="is-rounded" :src="course.user?.avatar" style="height: 100%;">
              <img v-else class="is-rounded" src="@/assets/vectors/default_avatar.svg">
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
import { Options, Vue } from 'vue-class-component';
import { PROCESS_STATUS } from "@/const/process_status";
import { ElNotification } from "element-plus";

@Options({
  props: {
    course: {} as any
  },
  data() {
    return {
      PROCESS_STATUS: PROCESS_STATUS
    }
  },
  methods: {
    enterCourse() {
      if (this.course.process_status == PROCESS_STATUS.NOT_OPEN){
        ElNotification({
          title: "Enroll course successfully",
          message: "You've course process is added to your My Course page.",
          type: "info",
        });
      }

      this.$router.push({
        name: 'lesson-detail',
        params: {
          course_slug: this.course.slug,
          chapter_slug: this.course.chapters[0].slug,
          lesson_slug: this.course.chapters[0].lessons[0].slug,
        },
        query: {
          course_id: this.course.id
        }
      })
    }
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