<template>
  <div class="main-container">
    <TitleBar :title="title"></TitleBar>
    <EditLesson
      :course="course"
      :chapter="chapter"
      :lesson="lesson"
    ></EditLesson>
    <QuizSection
      :lesson-id="lesson.id"
      :quiz="quiz"
      :hasQuizBefore="hasQuizBefore"
      @quizUpdated="quiz = $event"
    ></QuizSection>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import TitleBar from "@/components/TitleBar.vue";
import {mapActions, mapMutations} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import CourseItem from "@/types/course/CourseItem";
import EditLesson from "@/views/lesson/edit/EditLesson.vue";
import QuizSection from "@/views/lesson/edit/QuizSection.vue";
import {ElNotification} from "element-plus";

@Options({
  components: {
    QuizSection,
    EditLesson,
    TitleBar,
  },
  data() {
    return {
      title: "Edit Lesson | ",
      course: {} as CourseItem,
      lesson: {
        id: "",
        title: "",
        content: "",
        attachment: {
          file_type: "Video"
        },
        quizzes: []
      },
      chapter: {},
      quiz: {
        title: "",
        lesson_id: "",
        description: "",
        threshold: 50,
        questions: []
      },
      hasQuizBefore: false
    }
  },
  methods: {
    ...mapActions('course', [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapMutations(["SET_LOADING"]),
    async getCourseDetail() {
      this.SET_LOADING(true)
      let data = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug)
      if (data) {
        this.course = data
      } else {
        ElNotification({
          title: "Error",
          message: "An error occurred",
          type: "error",
        });
        return
      }

      this.title = this.title + this.course.title

      let chapters = this.course.chapters
      let chapter_index = chapters.map((chapter: any) => chapter.slug).indexOf(this.$route.params.chapter_slug)
      this.chapter = this.course.chapters[chapter_index]

      let lessons = chapters[chapter_index].lessons
      let lesson_index = lessons.map((lesson: any) => lesson.slug).indexOf(this.$route.params.lesson_slug)
      this.lesson = lessons[lesson_index]

      if (this.lesson.quizzes.length > 0) {
        this.quiz = this.lesson.quizzes[0]
        this.hasQuizBefore = true
      } else {
        this.quiz.lesson_id = this.lesson.id
      }

      this.SET_LOADING(false)
    }
  },
  mounted() {
    document.title = 'Edit Lesson | E-Learning'
  },
  async created() {
    await this.getCourseDetail()
  }
})
export default class EditLessonPage extends Vue {
}
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 900px;
  margin: 0 auto;

  .edit-section {
    border-radius: 20px;
    background: white;
    margin-bottom: 40px;
  }
}
</style>
