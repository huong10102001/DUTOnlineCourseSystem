<template>
  <TitleBar :title="course.title"></TitleBar>
  <div class="course-detail p-3">
    <InfoSection :course="course"></InfoSection>
    <DescriptionSection :description="course.description"></DescriptionSection>
    <CertificateSection></CertificateSection>
    <ChapterSection></ChapterSection>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import InfoSection from './InfoSection.vue'
import DescriptionSection from './DescriptionSection.vue'
import CertificateSection from "@/views/course/detail/CertificateSection.vue";
import ChapterSection from "@/views/course/detail/ChapterSection.vue";
import { mapActions, mapMutations } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import TitleBar from "@/components/TitleBar.vue";

@Options({
  components: {
    TitleBar,
    ChapterSection,
    CertificateSection,
    InfoSection,
    DescriptionSection
  },
  data() {
    return {
      course: {} as any
    }
  },
  methods: {
    ...mapActions('course', [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapMutations(["SET_LOADING"]),
    async getCourseDetail() {
      this.SET_LOADING(true)
      let data = await this.FETCH_COURSE_DETAIL(this.$route.params.slug)
      if (data){
        this.course = data
      }
      this.SET_LOADING(false)
    }
  },
  async created() {
    await this.getCourseDetail()
    document.title = this.course.title + ' | E-Learning'
  }
})

export default class CourseDetail extends Vue {}
</script>

<style lang="scss" scoped>
.course-detail{

  &__section {
    border-radius: 20px;
    font-size: 1rem;
    margin-bottom: 50px;
  }
}
</style>