<template>
  <div class="main-container">
    <TitleBar :title="title"></TitleBar>
    <div class="create-section has-background-white">
      <AddLesson :course="course"></AddLesson>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import AddLesson from "@/views/lesson/add/AddLesson.vue";
import TitleBar from "@/components/TitleBar.vue";
import {mapActions, mapMutations} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import CourseItem from "@/types/course/CourseItem";

@Options({
  components: {
    TitleBar,
    AddLesson
  },
  data() {
    return {
      title: "Create New Lesson | ",
      course: {} as CourseItem
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
    }
  },
  mounted() {
    document.title = 'Add Lesson | E-Learning'
  },
  async created() {
    await this.getCourseDetail()
    this.title = this.title + this.course.title
  }
})
export default class AddLessonPage extends Vue {}
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 900px;
  margin: 0 auto;

  .create-section {
    border-radius: 20px;
  }
}
</style>
