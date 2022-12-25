<template>
  <div class="course-detail__section no-lr-top-border has-background-white p-3 columns">

    <div class="column is-half">
      <h1 class="is-size-5 is-capitalized">{{ course.title }}</h1>
      <el-row>
          <span v-for="index in 5"
                :key="index"
                style="color: #eee"
          >
            <font-awesome-icon icon="fa-solid fa-star" :class="{checked:course.avg_rating>=index}"/>
          </span>
        <p class="ml-4">{{ course.avg_rating }}/5 ({{ course.total_rating }} ratings)</p>
      </el-row>

      <p>
        <br>{{ course.summary }}
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
      <button
        v-if="course.process_status != PROCESS_STATUS.NOT_OPEN && course.status_rating == false"
        round size="large"
        class="button is-light is-rounded mt-3 ml-3"
        @click="visible = true">
        <font-awesome-icon icon="fa-solid fa-star" class="mr-2"/>
        Rating
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

    <el-dialog v-model="visible" class="p-5" width="420px" style="border-radius:20px;">
      <template #header>
        <div
          style="height: 46px; width:46px;background-color:#EEEEEE;border-radius: 50%; line-height: 46px; text-align: center">
          <font-awesome-icon icon="fa-solid fa-star" size="lg" style="color: #fb7413"/>
        </div>
      </template>

      <div class="mt-2">
        <h1 class="title is-3">Share your experience!</h1>
        <p class="subtitle is-6 mt-2" style="color:#797D8C;">
          All feedback is appreciated to help us improve our system!
        </p>

        <el-row>
          <el-button
            v-for="i in 5"
            :key="i"
            @click="starSelected(i)"
            class="number-star"
            :class="{active: numberStar >= i}"
          >
            <el-icon size="large">
              <star/>
            </el-icon>
          </el-button>
        </el-row>

        <el-input
          class="mt-5"
          v-model="title"
          autosize
          type="textarea"
          placeholder="Title"
        />
        <div style="margin: 10px 0"/>
        <el-input
          v-model="content"
          :autosize="{ minRows: 3, maxRows: 5 }"
          type="textarea"
          placeholder="Write your feedback"
        />

        <el-button
          size="large" color="#fb7413"
          round
          style="width:100%;color:white"
          class="mt-5"
          @click="sendRating">Submit
        </el-button>
      </div>
    </el-dialog>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {PROCESS_STATUS} from "@/const/process_status";
import {ElNotification} from "element-plus";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  props: {
    course: {} as any
  },
  data() {
    return {
      PROCESS_STATUS: PROCESS_STATUS,
      visible: false,
      title: '',
      content: '',
      numberStar: 0,
    }
  },
  computed: {
    last_learned_lesson() {
      let chapter_index = 0
      let lesson_index = 0
      this.course.chapters.forEach((chapter: any) => {
        chapter.lessons.forEach((lesson: any) => {
          if (lesson.status == PROCESS_STATUS.OPEN || lesson.status == PROCESS_STATUS.IN_PROGRESS) {
            return {
              chapter_index,
              lesson_index
            }
          }
          lesson_index++
        })
        if (chapter_index < this.course.chapters.length - 1) {
          chapter_index++
          lesson_index = 0
        }
      })
      lesson_index--
      return {
        chapter_index,
        lesson_index
      }
    }
  },
  methods: {
    ...mapActions('rating', [ActionTypes.CREATE_RATING]),

    enterCourse() {
      if (this.course.process_status == PROCESS_STATUS.NOT_OPEN) {
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
          chapter_slug: this.course.chapters[this.last_learned_lesson.chapter_index].slug,
          lesson_slug: this.course.chapters[this.last_learned_lesson.chapter_index].lessons[this.last_learned_lesson.lesson_index].slug,
        },
        query: {
          course_id: this.course.id
        }
      })
    },
    starSelected(star: number) {
      this.numberStar = star
    },
    async sendRating() {
      let response = await this.CREATE_RATING({
        id: this.course.id,
        data: {
          title: this.title,
          content: this.content,
          star_rating: this.numberStar
        }
      })
      if (response.status == 201) {
        this.$emit('add-rating', response.data)
        this.visible = false

        ElNotification({
          title: "Thank you!",
          message: "We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!",
          type: "success",
        });
      }
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

.rate {
  float: left;
  height: 46px;
}

.rate:not(:checked) > label {
  float: left;
  width: 1em;
  overflow: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: 30px;
  color: #ccc;
}

.rate:not(:checked) > label:before {
  content: '★';
}

.number-star {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 6px;
  cursor: pointer;
}

.number-star:focus {
  background: #fb7413;
  color: white;
}

.active {
  background: #fb7413;
  color: white;
}

.checked {
  color: orange;
}

</style>