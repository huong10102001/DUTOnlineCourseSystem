<template>
  <div class="main-container p-2">
    <div class="course-container">
      <router-link to="/courses/management" class="button is-rounded btn-change">
        <font-awesome-icon icon="fa-solid fa-chalkboard" class="mr-2"/> |
        <font-awesome-icon icon="fa-solid fa-tags" class="ml-2 mr-2"/>
        Category Management
      </router-link>

      <div class="is-flex is-justify-content-space-between">
        <button
          class="button mb-4"
          size="large"
          @click="onClickAddButton">
          <font-awesome-icon icon="fa-solid fa-plus" class="mr-2"/>
          Add Category
        </button>

        <el-form-item>
          <el-input
            prefix-icon="Search"
            v-model="searchText"
            size="large"
            placeholder="Input here for searching..." />
        </el-form-item>
      </div>

      <el-table
        highlight-current-row
        :data="topics"
        v-loading="loading"
        stripe
        size="large"
        class="main-container__table">

        <el-table-column type="index" sortable label="#" align="center" width="80" />
        <el-table-column prop="title" sortable label="Title" width="200" />
        <el-table-column prop="description" label="Description" min-width="500">
          <template #default="scope">
            <div class="dont-break-out">
              {{ scope.row.description }}
            </div>
          </template>
        </el-table-column>

        <el-table-column
          fixed="right"
          label="Operations"
          width="120"
          align="center"
          prop="id"
        >
          <template #default="scope">
            <el-button text size="default" class="p-1" icon="Edit" @click="onClickEditIcon(scope.row)"></el-button>
            <el-button text size="default" class="p-1" icon="Delete" @click="handleDeleteTopic(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="is-flex is-justify-content-center mt-4">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="total"
          :current-page="+query.page"
          :page-size="+query.page_size"
          @current-change="changePages"
        />
      </div>
    </div>

    <el-dialog
      v-model="dialogVisible"
      :title="mode == 'add' ? 'Add Category' : 'Edit Category'"
      width="80%"
      style="border-radius: 20px"
      center>

      <TopicForm :topic="formContent" @updateTopic="formContent = $event"></TopicForm>

      <template #footer="scope">
        <span class="dialog-footer">
          <button class="button is-light is-rounded mr-3" @click="dialogVisible = false">Cancel</button>
          <button class="button is-dark is-rounded" @click="mode == 'add' ? handleAddTopic(): handleEditTopic()">
            {{ mode == 'add' ? 'Add':'OK' }}
          </button>
        </span>
      </template>

    </el-dialog>

  </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import TopicItem from "@/types/course/TopicItem";
import TopicForm from "@/views/topic/management/TopicForm.vue";
import { ElMessageBox, ElNotification } from "element-plus";

@Options({
  components: {
    TopicForm
  },
  data() {
    return {
      topics: [] as TopicItem[],
      total: 0,
      query: {
        page: 1,
        page_size: 10,
      },
      loading: false,
      searchText: "",
      formContent: {},
      mode: 'add',
      dialogVisible: false
    }
  },
  methods: {
    ...mapActions("topic", [
      ActionTypes.FETCH_TOPICS,
      ActionTypes.ADD_TOPIC,
      ActionTypes.UPDATE_TOPIC,
      ActionTypes.DELETE_TOPIC
    ]),
    async getListTopics() {
      this.loading = true
      let data = await this.FETCH_TOPICS(this.query)
      this.topics = data.results as TopicItem[]
      this.total = data.count
      this.loading = false
    },
    async handleAddTopic(){
      const res:any = await this.ADD_TOPIC(this.formContent)
      if (res.status == 201) {
        await this.getListTopics()

        ElNotification({
          title: 'Add category successfully',
          message: 'New category has been recently added to list!',
          type: 'success',
        })
      } else {
        ElNotification({
          title: 'Add category failed',
          message: 'An error occurred!',
          type: 'success',
        })
      }
      this.dialogVisible = false
    },
    async handleEditTopic(){
      const res:any = await this.UPDATE_TOPIC(this.formContent)
      if (res.status == 200) {
        await this.getListTopics()

        ElNotification({
          title: 'Edit category successfully',
          message: 'Category information has been recently updated!',
          type: 'success',
        })
      } else {
        ElNotification({
          title: 'Edit category failed',
          message: 'An error occurred!',
          type: 'success',
        })
      }
      this.dialogVisible = false
    },
    async handleDeleteTopic(topic: TopicItem){
      ElMessageBox.confirm('Are you sure to delete this category?')
      .then(async () => {
        const response: any = await this.DELETE_TOPIC(topic.id)
        if (response.status == 204){
          await this.getListTopics()

          ElNotification({
            title: 'Delete category successfully',
            message: `Category ${topic.title} has been deleted!`,
            type: 'success',
          })
        } else {
          ElNotification({
            title: 'Delete category failed',
            message: 'An error occurred!',
            type: 'success',
          })
        }
      })
      .catch(() => {

      })
    }
    ,
    onClickEditIcon(topic: TopicItem){
      this.mode = 'edit'
      this.formContent = topic
      this.dialogVisible = true
    },
    onClickAddButton(){
      this.formContent = {}
      this.mode = 'add'
      this.dialogVisible = true
    },
    changePages(newPage: number) {
      this.query.page = newPage
    },
  },
  watch: {
    query: {
      deep: true,
      handler: async function () {
        await this.getListTopics();
        this.$router.replace({ query: this.query }).catch((err: any) => err);
      },
    }
  },
  async created() {
    await this.getListTopics();
  },
  mounted() {
    document.title = 'Category Management | E-Learning'
  }
})

export default class TopicManagementPage extends Vue {}
</script>

<style scoped lang="scss">
.main-container {
  h1 {
    font-size: 1.22rem;
    margin-bottom: 20px;
    color: #666;
    font-weight: 500;
  }

  .btn-change{
    font-size: 0.95rem;
    font-weight: 450;
    margin-bottom: 25px;
  }

  &__table {
    width: 100%;
    font-size: 1rem;
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

    .dont-break-out {
      word-wrap: break-word !important;      /* IE 5.5-7 */
      white-space: -moz-pre-wrap !important; /* Firefox 1.0-2.0 */
      white-space: pre-wrap !important;      /* current browsers */
      overflow-wrap: break-word !important;
      word-break: break-word !important;
    }
  }
}
</style>

<style scoped>
/deep/.el-pagination.is-background .el-pager li:not(.is-disabled).is-active {
  background-color: #024547;
}
</style>
