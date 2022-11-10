<template>
  <div class="mt-5">
    <TitleBar :title="title"></TitleBar>
    <el-row :gutter="16">
      <el-col :xl="16" :md="24">
        <LessonSection
          :course="course"
          :lesson="lesson"
          :chapter="chapter">
        </LessonSection>
        <DescriptionSection :content="lesson.content"></DescriptionSection>
      </el-col>
      <el-col :xl="8" :md="24">
        <NavigationSection
          :course="course"
          :lesson="lesson"
          :lesson_index="lesson_index"
          :chapter_index="chapter_index"
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
      title: "Course | ",
      course: {} as CourseItem,
      lesson: {
        title: "",
        content: "",
        attachment: {},
      },
      type: "",
      chapter: {},
      lesson_index: null,
      chapter_index: null
    }
  },
  methods: {
    ...mapActions('course', [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapMutations(["SET_LOADING"]),
    async getCourseDetail() {
      this.SET_LOADING(true)
      let data = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug)
      if (data){
        this.course = data
      }
      this.SET_LOADING(false)
    },
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),
    currentChapter() {
      let index = this.course.chapters.map((chapter: any) => chapter.slug).indexOf(this.$route.params.chapter_slug)
      return this.course.chapters[index]
    }
  },
  mounted() {
    document.title = 'Study Course | E-Learning'
  },
  async created() {
    await this.getCourseDetail()
    this.title = this.title + this.course.title
  },
  beforeUpdate() {
    let chapters = this.course.chapters
    this.chapter_index = chapters.map((chapter: any) => chapter.slug).indexOf(this.$route.params.chapter_slug)
    this.chapter= chapters[this.chapter_index]
    let lessons = chapters[this.chapter_index].lessons
    this.lesson_index = lessons.map((lesson: any) => lesson.slug).indexOf(this.$route.params.lesson_slug)
    this.lesson = lessons[this.lesson_index]
    this.type = this.lesson.attachment.file_type
  }
})
export default class LessonDetail extends Vue {}
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
