<template>
  <p class="title is-4 p-6 is-flex is-justify-content-center has-background-success has-text-white"
     style="border-radius: 10px">
    Congratulations!
  </p>
  <el-main class="py-5">
    <el-row>
      <el-col :span="24" class="is-flex is-justify-content-center  mt-4">
        <figure class="image is-128x128">
          <img v-if="course_process?.course?.user.avatar" :src="course_process?.course?.user.avatar" class="is-rounded" style="height: 100%"/>
          <img v-else src="@/assets/vectors/default_avatar.svg" class="is-rounded" style="height: 100%"/>
        </figure>
      </el-col>
      <el-col class="is-flex is-justify-content-center mb-4">
        <span class="title is-4 mt-5 is-capitalized">{{ course_process?.course?.user.full_name }}</span>
      </el-col>
      <el-col :span="24" class="is-flex is-justify-content-center mb-4">
        <span class="subtitle is-6">
          <p>Completed on {{ course_process.learn_completed_date }}</p>
          <p class="mb-3">Grade Achieved: 100%</p>
          <p>{{ course_process?.course?.user.full_name }}'s account is verified. Elearning certifies their successful completion of Introduction to Git and GitHub</p>
        </span>
      </el-col>
    </el-row>
  </el-main>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  props: {
    course_process: null
  }
})
export default class InfoSection extends Vue {
}
</script>