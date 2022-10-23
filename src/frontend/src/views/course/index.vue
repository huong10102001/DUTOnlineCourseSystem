<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import CourseDetail from "@/views/course/detail/index.vue";

@Options({
  components: {
    CourseDetail
  }
})

export default class CourseBasePage extends Vue {
}
</script>

<style lang="scss" scoped>

</style>