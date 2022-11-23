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

  <el-dialog v-model="visible" class="p-5" width="420px" style="border-radius:30px;">
    <template #header>
      <div class="rate" style="width:46px;background-color:#EEEEEE;border-radius: 50%;">
        <label title="text" style="color:#fb7413" class="ml-2">5 stars</label>
      </div>
    </template>
    
    <div class="mt-6">
      <h1 class="title is-3">How did we do?</h1>
      <p class="subtitle is-6 mt-2" style="color:#797D8C;">
        Please let us know how we did with your support request. All feedback is appreciated to help us improve our offering!
      </p>

      <el-row>
        <el-button 
        v-for="i in 5" 
        :key="i"
        @click="starSelected(i)" 
        class="number-star"
        :class="{active: numberStar === i}">{{ i }}</el-button>
      </el-row>

      <el-input
        class="mt-5"
        v-model="title"
        autosize
        type="textarea"
        placeholder="Title"
      />
      <div style="margin: 10px 0" />
      <el-input
        v-model="content"
        :autosize="{ minRows: 3, maxRows: 5 }"
        type="textarea"
        placeholder="Write your feedback"
      />

      <el-button size="large" color="#fb7413" 
      round 
      style="width:100%;color:white" 
      class="mt-5"
      @click="sendRating">Submit</el-button>
    </div>
  </el-dialog>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import CertificationSection from "./CertificationSection.vue";
import InfoSection from "./InfoSection.vue";
import CertificationService from "@/services/certification/CertificationService";
import {mapActions} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import { ElNotification } from "element-plus";

@Options({
  components: {
    CertificationSection,
    InfoSection,
  },
  data() {
    return {
      course_process: {},
      visible: false,
      title: '',
      content: '',
      numberStar: 0,
      course: {}
    };
  },
  methods: {
    ...mapActions("course", [ActionTypes.FETCH_COURSE_DETAIL]),
    ...mapActions("courseProcess", [ActionTypes.FETCH_COURSES_PROCESS]),
    ...mapActions('rating', [ActionTypes.CREATE_RATING]),

    async getCourseDetail() {
      let data = await this.FETCH_COURSE_DETAIL(this.$route.params.course_slug)
      if (data){
        this.course = data
        if(this.course.status_rating){
          this.visible = false
        }
        else {
          this.visible = true
        }
      }
    },

    starSelected(star: number){
      this.numberStar = star
    },
    async sendRating(){
      let response = await this.CREATE_RATING({
        id: this.course.id,
        data: {
          title: this.title,
          content: this.content,
          star_rating: this.numberStar
        }
      })
      if(response == 201){
        this.$emit('add-rating', response.data)
        this.visible = false
        ElNotification({
          title: "Thank you!",
          message: "We appreciate you taking the time to give a rating. If you ever need more support, don’t hesitate to get in touch!",
          type: "success",
        });
      }
    }
  },
  computed: {},
  async created() {
    const res: any = await CertificationService.get(this.$route.params.course_slug)
    this.course_process = res.data
    this.getCourseDetail()
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
.no-lr-top-border {
  border-radius: 0 0 20px 20px !important;
}

.rate {
  float: left;
  height: 46px;

}
.rate:not(:checked) > label {
  float:left;
  width:1em;
  overflow:hidden;
  white-space:nowrap;
  cursor:pointer;
  font-size:30px;
  color:#ccc;
}
.rate:not(:checked) > label:before {
  content: '★ ';
}
.number-star{
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 6px;
  cursor: pointer;
}
.number-star:focus {
  background: #fb7413; 
  color: white;
}
.active {
  background: #fb7413; 
  color: white;
}
.checked {
  color: orange;
}

</style>
