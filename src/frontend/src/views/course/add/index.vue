<template>
 <div class="main-container" style="max-width: 900px; margin: 0 auto">
    <TitleBar :title="title"></TitleBar>
	  <div class="create-section has-background-white">
      <AddCourse :options="options"></AddCourse>
    </div>
 </div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import AddCourse from "@/views/course/add/AddCourse.vue";
import TitleBar from "@/components/TitleBar.vue";
import {mapActions, mapMutations} from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import {ElNotification} from "element-plus";
import TopicItem from "@/types/course/TopicItem";

@Options({
  components: {
    TitleBar,
    AddCourse
  },
  data() {
    return {
      title: "Add New Course",
      options: [] as TopicItem[],
    }
  },
  methods: {
    ...mapActions("topic",[ActionTypes.FETCH_TOPICS]),
    ...mapMutations(["SET_LOADING"]),

    async fetchTopics() {
      let data: any = await this.FETCH_TOPICS();

      if (data) {
        this.options = data.results as TopicItem[]
      } else {
        ElNotification({
          title: 'Error',
          message: 'Loading data failed.',
          type: 'error',
        })
      }
    }
  },
  async created(){
    this.SET_LOADING(true)
    await this.fetchTopics()
    setTimeout(() => {
      this.SET_LOADING(false)
    }, 200)
  },
  mounted() {
    document.title = 'Add Course | E-Learning'
  }
})

export default class AddCoursePage extends Vue {}
</script>

<style lang="scss" scoped>
.main-container {
  .create-section {
    border-radius: 20px;
  }
}
</style>