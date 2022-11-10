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
        class="button is-light">
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
import CourseItem from "@/types/course/CourseItem";
import ChapterCollapse from "@/components/ChapterCollapse.vue";

@Options({
  components: {
    ChapterCollapse
  },
  props: {
    course: {} as CourseItem,
    lesson: {} as any,
    lesson_index: Number,
    chapter_index: Number
  },
  data() {
    return {
      isPrevDisabled: false,
      isNextDisabled: false
    }
  },
  methods: {
    handlePrevLesson() {
      if(this.lesson.previous_lesson) {
        this.$router.push({
          name: 'lesson-detail',
          params: {
            course_slug: this.course.slug,
            chapter_slug: this.course.chapters[this.chapter_index].slug,
            lesson_slug: this.course.chapters[this.chapter_index].lessons[this.lesson_index-1].slug
          }
        })
      }
      else if(this.course.chapters[this.chapter_index-1]){
        let prev_chapter = this.course.chapters[this.chapter_index-1]
        this.$router.push({
          name: 'lesson-detail',
          params: {
            course_slug: this.course.slug,
            chapter_slug: prev_chapter.slug,
            lesson_slug: prev_chapter.lessons[prev_chapter.lessons.length-1].slug
          }
        })
      }
    },
    handleNextLesson(){
      if (this.course.chapters[this.chapter_index].lessons[this.lesson_index+1]) {
        this.$router.push({
          name: 'lesson-detail',
          params: {
            course_slug: this.course.slug,
            chapter_slug: this.course.chapters[this.chapter_index].slug,
            lesson_slug: this.course.chapters[this.chapter_index].lessons[this.lesson_index+1].slug
          }
        })
      }
      else if (this.course.chapters[this.chapter_index+1]){
        this.$router.push({
          name: 'lesson-detail',
          params: {
            course_slug: this.course.slug,
            chapter_slug: this.course.chapters[this.chapter_index+1].slug,
            lesson_slug: this.course.chapters[this.chapter_index+1].lessons[0].slug
          }
        })
      }
    },
    checkNavigation(){
      let currentChapter: any = this.course.chapters[this.chapter_index]

      if (this.lesson_index == 0 && this.chapter_index == 0){
        this.isPrevDisabled = true
      } else {
        this.isPrevDisabled = false
      }

      if (this.lesson_index == currentChapter?.lessons.length - 1
        && (this.chapter_index == this.course.chapters.length - 1
          || this.course.chapters[this.chapter_index+1].lessons.length == 0)){
        this.isNextDisabled = true
      } else {
        this.isNextDisabled = false
      }
    }
  },
  updated() {
    this.checkNavigation()
  },
})
export default class NavigationSection extends Vue {}
</script>
