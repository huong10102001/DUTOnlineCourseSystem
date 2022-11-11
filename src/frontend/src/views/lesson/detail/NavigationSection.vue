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

      <button
        :disabled="isNextDisabled"
        @click="handleNextLesson"
        class="button is-light"
      >
        Next
        <font-awesome-icon icon="fa-solid fa-chevron-right" class="ml-2"/>
      </button>
    </div>

    <div class="mt-5">
      <ChapterCollapse
        :chapters="course.chapters"
        :course_id="course.id"
        :course_title="course.title"
      ></ChapterCollapse>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import ChapterCollapse from "@/components/ChapterCollapse.vue";
import {PROCESS_STATUS} from '@/const/process_status';
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {lesson} from '@/store/modules/lesson';

@Options({
  components: {
    ChapterCollapse
  },
  props: {
    course: {} as any,
    chapter: {} as any,
    lesson: {} as any,
    previousLesson: null,
    nextLesson: null,
  },
  data() {
    return {
      isPrevDisabled: false,
      isNextDisabled: false,
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
        meta: {
          reload: true
        }
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
        meta: {
          reload: true
        }
      })
    },

    checkNavigation() {
      if (!this.previousLesson) {
        this.isPrevDisabled = true
      } else {
        this.isPrevDisabled = false
      }

      if (this.nextLesson) {
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
  beforeUpdate() {
    this.checkNavigation()
  }
})
export default class NavigationSection extends Vue {
}
</script>
