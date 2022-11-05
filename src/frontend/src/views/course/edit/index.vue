<template>
  <div class="main-container" style="max-width: 900px; margin: 0 auto">
    <TitleBar :title="title"></TitleBar>
    <div class="main-container__section has-background-white">
      <CourseSection :course="course" :options="options"></CourseSection>
    </div>
    <div class="main-container__section has-background-white p-6">
      <ChapterSection
        v-if="course"
        :chapters="course.chapters"
        :course_id="course.id"
        :course_title="course.title"
      ></ChapterSection>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import TitleBar from "@/components/TitleBar.vue";
import { mapActions, mapMutations } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import { ElNotification } from "element-plus";
import TopicItem from "@/types/course/TopicItem";
import CourseSection from "@/views/course/edit/CourseSection.vue";
import ChapterSection from "@/views/course/edit/ChapterSection.vue";

@Options({
  components: {
    ChapterSection,
    CourseSection,
    TitleBar,
  },
  data() {
    return {
      title: "Edit Course",
      options: [] as TopicItem[],
      course: {},
    };
  },
  methods: {
    ...mapActions("topic", [ActionTypes.FETCH_TOPICS]),
    ...mapActions("course", [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapMutations(["SET_LOADING"]),

    async fetchCourse() {
      let topic: any = await this.FETCH_TOPICS();
      let course: any = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug);
      if (topic && course) {
        this.options = topic.results as TopicItem[];
        this.course = course;
        this.course.topics = this.course.topics.map(
          (topic: TopicItem) => topic.id
        );
      } else {
        ElNotification({
          title: "Error",
          message: "Loading data failed.",
          type: "error",
        });
      }
    },
  },
  async created() {
    this.SET_LOADING(true);
    await this.fetchCourse();
    setTimeout(() => {
      this.SET_LOADING(false);
    }, 200);
  },
  mounted() {
    document.title = "Edit Course | E-Learning";
  },
})
export default class EditCoursePage extends Vue {}
</script>

<style lang="scss" scoped>
.main-container {
  max-width: 900px;
  margin: 0 auto;

  &__section {
    border-radius: 20px;
    margin-bottom: 50px;
  }
}
</style>