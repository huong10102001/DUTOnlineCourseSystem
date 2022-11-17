<template>
  <div class="certificate-section">
    <info-section :course_process="course_process"></info-section>
  </div>

  <div class="certificate-section" style="border-radius: 20px">
    <div class="mb-4" style="max-width: 800px; margin: 0 auto">
      <certification-section :certificate="course_process.certificate"></certification-section>
    </div>
    <p class="is-flex is-justify-content-center mb-4">
      <a :href="course_process.certificate" download>
        <el-button class="mt-4" type="primary" size="large" round>
          <el-icon class="mr-3">
            <Download/>
          </el-icon>
          Download
        </el-button>
      </a>
    </p>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import CertificationSection from "./CertificationSection.vue";
import InfoSection from "./InfoSection.vue";
import CertificationService from "@/services/certification/CertificationService";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  components: {
    CertificationSection,
    InfoSection,
  },
  data() {
    return {
      course_process: {}
    };
  },
  methods: {
    ...mapActions("course", [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapActions("courseProcess", [ActionTypes.FETCH_COURSES_PROCESS])
  },
  computed: {},
  async created() {
    const res: any = await CertificationService.get(this.$route.params.course_slug)
    this.course_process = res.data
  },
  beforeUpdate() {
  },
})
export default class CertificationPage extends Vue {
}
</script>

<style lang="scss" scoped>
.certificate-section {
  background-color: #fff;
  border-radius: 20px;
  margin-bottom: 30px;
  padding: 20px;
}
</style>
