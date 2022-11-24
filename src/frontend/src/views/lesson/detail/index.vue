<template>
  <div class="mt-5">
    <TitleBar :title="title"></TitleBar>
    <el-row :gutter="16">
      <el-col :xl="16" :md="24">
        <LessonSection
          :course="course"
          :lesson="lesson"
          :chapter="chapter"
          @videoLessonComplete="handleVideoLesson"
        >
        </LessonSection>
        <DescriptionSection
          :course_process="course.process_status"
          :content="lesson.content">
        </DescriptionSection>
      </el-col>
      <el-col :xl="8" :md="24">
        <NavigationSection
          :course="course"
          :chapter="chapter"
          :lesson="lesson"
          :previous-lesson="previousLesson"
          :next-lesson="nextLesson"
          @completedQuiz="updateLessonCompleted"
        ></NavigationSection>
      </el-col>
    </el-row>
    <CommentSection :course="course" :lesson="lesson"></CommentSection>
  </div>

</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapActions, mapMutations, mapGetters} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import CourseItem from "@/types/course/CourseItem";
import TitleBar from "@/components/TitleBar.vue";
import LessonSection from "@/views/lesson/detail/LessonSection.vue";
import DescriptionSection from "@/views/lesson/detail/DescriptionSection.vue";
import NavigationSection from "@/views/lesson/detail/NavigationSection.vue";
import CommentSection from './CommentSection.vue';
import {course} from '@/store/modules/course';
import {PROCESS_STATUS} from '@/const/process_status';
import {lesson} from '@/store/modules/lesson';
import {ElNotification} from "element-plus";

@Options({
  components: {
    NavigationSection,
    DescriptionSection,
    LessonSection,
    CommentSection,
    TitleBar,
  },
  data() {
    return {
      course: {
        title: ""
      },
      lesson: {
        title: "",
        content: "",
        attachment: {
          file_type: ""
        },
        quizzes: []
      },
      chapter: {},
      lesson_index: -1,
      chapter_index: -1,
      quiz_result: []
    }
  },
  methods: {
    ...mapActions('course', [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapActions('courseProcess', [ActionTypes.FETCH_COURSE_PROCESS_DETAIL]),
    ...mapActions('lessonProcess', [ActionTypes.UPDATE_LESSON_PROCESS]),
    ...mapMutations(["SET_LOADING"]),

    async verifyLessonProcess() {
      if (this.lesson.status == PROCESS_STATUS.OPEN) {
        if (this.lesson.attachment.file_type == 'Document') {
          this.lesson.status = PROCESS_STATUS.IN_PROGRESS
          await this.updateLessonCompleted()
        } else {
          const response: any = await this.UPDATE_LESSON_PROCESS({
            course_id: this.course.id,
            data: {
              status: PROCESS_STATUS.IN_PROGRESS,
              lesson_id: this.lesson.id
            }
          })
          if (response.status == 204)
            this.lesson.status = PROCESS_STATUS.IN_PROGRESS
          else {
            ElNotification({
              title: 'Error',
              message: 'An error occurred!',
              type: 'error',
            })
          }
        }
      }
    },

    async getCourseProcess() {
      this.SET_LOADING(true)

      let course_id = this.$route.query.course_id ? this.$route.query.course_id : this.course.id

      if (!course_id) {
        const course_data: any = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug)
        if (course_data) {
          course_id = course_data.id
        }
      } else this.$router.replace({query: null})

      let data = await this.FETCH_COURSE_PROCESS_DETAIL(course_id)
      if (data) {
        this.course = data
      }

      this.SET_LOADING(false)
    },

    async updateLessonCompleted() {
      if (this.lesson.status == PROCESS_STATUS.IN_PROGRESS
        && this.lesson.quizzes.length != 0) {

        const response: any = await this.UPDATE_LESSON_PROCESS({
          course_id: this.course.id,
          data: {
            status: PROCESS_STATUS.TESTING,
            lesson_id: this.lesson.id
          }
        })

        if (response.status == 204) {
          this.lesson.status = PROCESS_STATUS.TESTING
          ElNotification({
            title: 'Quiz is started',
            message: 'Complete the quiz below before you can continue on next lesson!',
            type: 'info',
          })
        } else {
          ElNotification({
            title: 'Error',
            message: 'An error occurred!',
            type: 'error',
          })
        }

        return
      }

      const response: any = await this.UPDATE_LESSON_PROCESS({
        course_id: this.course.id,
        data: {
          status: PROCESS_STATUS.COMPLETED,
          lesson_id: this.lesson.id
        }
      })

      if (response.status == 204) {
        this.lesson.status = PROCESS_STATUS.COMPLETED
        if (this.nextLesson)
          this.nextLesson.status = PROCESS_STATUS.OPEN
        else
          this.course.process_status = PROCESS_STATUS.COMPLETED
      } else {
        ElNotification({
          title: 'Error',
          message: 'An error occurred!',
          type: 'error',
        })
      }
    },

    async handleVideoLesson() {
      if (this.lesson.status != PROCESS_STATUS.IN_PROGRESS) return
      await this.updateLessonCompleted()
    }
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),

    title() {
      return "Course | " + this.course.title
    },

    previousChapter() {
      if (this.chapter_index == -1) return null
      return this.course.chapters[this.chapter_index - 1]
    },

    nextChapter() {
      if (this.chapter_index == -1 || this.chapter_index == this.course.chapters.length - 1) return null
      return this.course.chapters[this.chapter_index + 1]
    },

    previousLesson() {
      if (this.lesson_index == -1) return null

      if (this.lesson.previous_lesson) {
        return this.chapter.lessons[this.lesson_index - 1]
      } else if (this.previousChapter) {
        return this.previousChapter.lessons[this.previousChapter.lessons.length - 1]
      }

      return null
    },

    nextLesson() {
      if (this.lesson_index == -1) return null

      if (this.lesson_index < this.chapter.lessons.length - 1) {
        return this.chapter.lessons[this.lesson_index + 1]
      } else if (this.nextChapter && this.nextChapter.lessons.length != 0) {
        return this.nextChapter.lessons[0]
      }

      return null
    }
  },
  mounted() {
    document.title = 'Study Course | E-Learning'
    this.title = this.title + this.course.title
  },
  async created() {
    await this.getCourseProcess()
  },
  async beforeUpdate() {
    let chapters = this.course.chapters
    this.chapter_index = chapters.map((chapter: any) => chapter.slug).indexOf(this.$route.params.chapter_slug)
    this.chapter = chapters[this.chapter_index]

    let lessons = chapters[this.chapter_index].lessons
    this.lesson_index = lessons.map((lesson: any) => lesson.slug).indexOf(this.$route.params.lesson_slug)
    this.lesson = lessons[this.lesson_index]

    await this.verifyLessonProcess()
  }
})
export default class LessonDetail extends Vue {
}
</script>

<style lang="scss">
.lesson-container {
  &__section {
    background: #ffffff;
    border-radius: 10px;
    margin-bottom: 30px;
    padding: 20px;
  }
}
</style>
