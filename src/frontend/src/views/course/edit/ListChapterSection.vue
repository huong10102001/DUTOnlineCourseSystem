<template>
  <el-scrollbar max-height="800px" style="width: 100%">
    <el-collapse
      style="width: 100%"
      v-for="(chapter, index) in chapters"
      size="large"
      :key="chapter.id"
    >
      <el-collapse-item 
      :name="chapter.id">
        <template #title>
          <div class="collapse-chapter-header">
            <span>Chapter {{ index+1 }}: {{ chapter.title }}</span>
          </div>
          <el-icon
            v-if="userInfo.role != ROLES.User"
            class="mx-3"
            style="font-size: 18px; color: #024547"
            @click="abc">
            <Plus />
          </el-icon>
          <el-icon
            v-if="userInfo.role != ROLES.User"
            class="mx-1"
            style="font-size: 18px; color: #024547"
            @click="editChapter(chapter.id, chapter.title)"
            ><Edit
          /></el-icon>
          <el-icon
            v-if="userInfo.role != ROLES.User"
            class="mx-3"
            style="font-size: 18px; color: #024547"
            @click="deleteChapter(chapter.id, chapter.title)"
            ><Delete /></el-icon>
        </template>
        <div class="mt-4 ml-4" v-for="lesson in chapter.lessons" :key="lesson">
          <el-button
            size="large"
            text
            @click="open = true; detail_lesson = lesson; chapter_title = chapter.title"
            class="is-flex is-justify-content-left"
            >{{ lesson.title }}</el-button
          >
        </div>
      </el-collapse-item>
    </el-collapse>
  </el-scrollbar>
  <el-drawer v-model="open" size="80%">
    <PreviewSection :lesson="detail_lesson" :course_title="course_title" :chapter_title="chapter_title"></PreviewSection>
  </el-drawer>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import Chapter from "@/types/chapter/ChapterItem";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import PreviewSection from "@/views/course/edit/PreviewSection.vue";
import { ROLES } from "@/const/roles";
import { course } from "@/store/modules/course";
@Options({
  props: {
    chapters: [],
    course_id: String,
    course_title: String
  },
  components: {
    PreviewSection,
  },
  data() {
    return {
      open: false,
      detail_lesson: "",
      chapter_title: "",
    };
  },
  methods: {
    ...mapActions("chapter", [
      ActionTypes.REMOVE_CHAPTER,
      ActionTypes.UPDATE_CHAPTER,
    ]),
    ...mapMutations(["SET_LOADING"]),
    async updateChapter(id: string, title: string) {
      let response: any = await this.UPDATE_CHAPTER({
        course_id: this.course_id,
        id: id,
        chapter: { title: title },
      });
      console.log(response.status);
      if (response.status == 200) {
        ElNotification({
          title: "Update successfully",
          message: "You've just updated a chapter.",
          type: "success",
        });

        this.$emit("updateChapter", response.data);
      } else {
        ElNotification({
          title: "Error",
          message: "Information is incorrect. Please check again",
          type: "error",
        });
      }
    },

    async removeChapter(id: string) {
      let response: any = await this.REMOVE_CHAPTER({
        course_id: this.course_id,
        id: id,
      });
      console.log(response.status);
      if (response.status == 200) {
        ElNotification({
          title: "Delete successfully",
          message: "You've just removed a chapter.",
          type: "success",
        });
      } else {
        ElNotification({
          title: "Error",
          message: "Information is incorrect. Please check again",
          type: "error",
        });
      }
    },

    editChapter(id: string, title: string) {
      ElMessageBox.prompt("Title", "Edit Chapter", {
        confirmButtonText: "Update",
        cancelButtonText: "Cancel",
        inputPlaceholder: "Please fill title",
        inputValue: title,
      }).then(({ value }) => {
        if (value != null) {
          this.updateChapter(id, value);
        } else {
          ElMessage({
            type: "error",
            message: `Please fill title for chapter`,
          });
        }
      });
    },
    deleteChapter(id: string, title: string) {
      ElMessageBox.confirm(
        "You want to delete " + title + ". Continue?",
        "Confirm information",
        {
          type: "error",
          confirmButtonText: "Delete",
          cancelButtonText: "Cancel",
          confirmButtonClass: "el-button--danger",
        }
      ).then(async ({}) => {
        await this.removeChapter(id);
        this.$emit("deleteChapter", id);
      });
    },
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),
    ...mapGetters("user", ["userInfo"]),
  },
  created() {
    this.ROLES = ROLES;
  },
})
export default class ListChapterSection extends Vue {
  chapters!: Chapter;
}
</script>

<style>
.el-collapse {
  --el-collapse-header-bg-color:#EEEEEE !important;
  --el-collapse-header-font-size: 16px !important;
  margin-bottom: 10px;
  border-radius: 10px;
}
.el-collapse-item__header{
  border-radius: 10px;
}
.el-button{
  width: 95%; 
  height: 45px !important;
  margin-left: 35px;
  background-color: #EEEEEE !important;
  border-radius: 10px !important;
}
.collapse-chapter-header{
  font-size: 16px; 
  color: #024547; 
  width: 100%; 
  margin-left: 30px;
}

</style>