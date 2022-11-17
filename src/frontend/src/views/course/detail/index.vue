<template>
  <div class="main-container">
    <TitleBar :title="course.title"></TitleBar>
    <div class="course-detail__background">
      <CoverImage :image="course.background" :is_freeze="true"></CoverImage>
    </div>
    <div class="course-detail p-3">
      <InfoSection :course="course"></InfoSection>
      <DescriptionSection :description="course.description"></DescriptionSection>
      <CertificateSection
        :certificate="course.certificate_frame"
      ></CertificateSection>
      <ChapterSection :chapters="course.chapters"></ChapterSection>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import InfoSection from './InfoSection.vue'
import DescriptionSection from './DescriptionSection.vue'
import CertificateSection from "@/views/course/detail/CertificateSection.vue";
import ChapterSection from "@/views/course/detail/ChapterSection.vue";
import { mapActions, mapMutations } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import TitleBar from "@/components/TitleBar.vue";
import CoverImage from "@/components/CoverImage.vue";

@Options({
  components: {
    TitleBar,
    ChapterSection,
    CertificateSection,
    InfoSection,
    DescriptionSection,
    CoverImage
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
      let data = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug)
      if (data){
        this.course = data
      }
      this.SET_LOADING(false)
    }
  },
  async created() {
    await this.getCourseDetail()
  },
  beforeUpdate() {
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

  &__background {
    background-color: white;
    border-radius: 20px 20px 0 0;
    padding-bottom: 5px;
  }
}

.main-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
