<template>
  <div class="lesson-container__section">
    <div class="is-flex is-justify-content-space-between">
      <button
        :disabled="isPrevDisabled"
        @click="handlePrevLesson"
        class="button is-light">
        <font-awesome-icon icon="fa-solid fa-chevron-left" class="mr-2"/>
        Prev
      </button>

      <div>
        <span v-if="needToDoQuiz">
          <button
            @click="openQuiz = true"
            class="button is-info mr-2"
          >
            <font-awesome-icon icon="fa-solid fa-feather" class="mr-2"/>Quiz
          </button>
        </span>
        <span v-if="hasQuizResult">
          <button
            @click="openQuizResult = true"
            class="button is-info mr-2"
          >
            <font-awesome-icon icon="fa-solid fa-feather" class="mr-2"/>Quiz Result
          </button>
        </span>
        <button
          :disabled="isNextDisabled"
          @click="handleNextLesson"
          class="button is-light"
        >
          Next
          <font-awesome-icon icon="fa-solid fa-chevron-right" class="ml-2"/>
        </button>
      </div>
    </div>

    <div class="mt-5">
      <ChapterCollapse
        :chapters="course.chapters"
        :chapter="chapter"
        :course_id="course.id"
        :course_title="course.title"
      ></ChapterCollapse>
    </div>
  </div>

  <div v-if="needToDoQuiz">
    <QuizSection
      v-show="lesson.quizzes.length != 0 && openQuiz"
      :quiz="lesson.quizzes[0]"
      :lesson="lesson"
      :open-quiz="openQuiz"
      @closeQuiz="openQuiz = false"
      @completedQuiz="$emit('completedQuiz')"
    ></QuizSection>
  </div>
  <div v-if="hasQuizResult">
    <QuizResultSection
      v-show="lesson.quizzes.length != 0 && openQuizResult"
      :quiz="lesson.quizzes[0]"
      :lesson="lesson"
      :openQuizResult="openQuizResult"
      @closeQuizResult="openQuizResult = false"
    ></QuizResultSection>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ChapterCollapse from "@/components/ChapterCollapse.vue";
import {PROCESS_STATUS} from '@/const/process_status';
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import QuizSection from "@/views/lesson/detail/QuizSection.vue";
import QuizResultSection from "@/views/lesson/detail/QuizResultSection.vue";

@Options({
  components: {
    ChapterCollapse,
    QuizSection,
    QuizResultSection
  },
  props: {
    course: {} as any,
    chapter: {} as any,
    lesson: {
      status: "",
      quizzes: [],
      quiz_result: []
    } as any,
    previousLesson: null,
    nextLesson: null,
  },
  data() {
    return {
      PROCESS_STATUS: PROCESS_STATUS,
      isPrevDisabled: false,
      isNextDisabled: false,
      openQuiz: false,
      openQuizResult: false
    }
  },
  methods: {
    ...mapActions('lessonProcess', [ActionTypes.UPDATE_LESSON_PROCESS]),

    handlePrevLesson() {
      let chapter_index = this.course.chapters.map((e: any) => e.id).indexOf(this.previousLesson.chapter_id)
      let chapter = this.course.chapters[chapter_index]

      this.$router.push({
        name: 'lesson-detail',
        params: {
          course_slug: this.course.slug,
          chapter_slug: chapter.slug,
          lesson_slug: this.previousLesson.slug
        },
        query: { course_id: this.course.id }
      })
    },

    handleNextLesson() {
      let chapter_index = this.course.chapters.map((e: any) => e.id).indexOf(this.nextLesson.chapter_id)
      let chapter = this.course.chapters[chapter_index]

      this.$router.push({
        name: 'lesson-detail',
        params: {
          course_slug: this.course.slug,
          chapter_slug: chapter.slug,
          lesson_slug: this.nextLesson.slug
        },
        query: { course_id: this.course.id }
      })
    },

    checkNavigation() {
      if (!this.previousLesson) {
        this.isPrevDisabled = true
      } else {
        this.isPrevDisabled = false
      }

      if (this.nextLesson && this.lesson.status != PROCESS_STATUS.TESTING) {
        if (this.nextLesson.status == PROCESS_STATUS.LOCK)
          this.isNextDisabled = true
        else this.isNextDisabled = false
      } else {
        this.isNextDisabled = true
      }
    }
  },
  watch: {
    lesson: {
      deep: true,
      handler() {
        this.checkNavigation()
      }
    }
  },
  computed: {
    needToDoQuiz() {
      return this.lesson.quizzes.length != 0
        && this.lesson.status == PROCESS_STATUS.TESTING
    },
    hasQuizResult() {
      if (!this.lesson.quiz_result) return false
      return this.lesson.quiz_result.length != 0
        && this.lesson.status == PROCESS_STATUS.COMPLETED
    }
  },
  beforeUpdate() {
    this.checkNavigation()
  }
})
export default class NavigationSection extends Vue {
}
</script>
