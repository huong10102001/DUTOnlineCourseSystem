<template>
  <el-row class="py-5">
    <el-row style="width: 100%">
      <el-col :span="12" class="mt-2">
        <p class="title is-5" style="color: #024547">
          Chapters - Total: {{ course_chapters?.length }}
        </p>
      </el-col>
      <el-col :span="12" class="mb-4 is-flex is-justify-content-right">
        <button
          class="button is-rounded"
          style="background-color: #024547; color: white"
          @click="addChapter"
        >
          <font-awesome-icon icon="fa-solid fa-plus" class="mr-2" /> Add Chapter
        </button>
      </el-col>
    </el-row>
    <ListChapterSection
      :chapters="course_chapters"
      :course_id="course_id"
      :course_title="course_title"
      @deleteChapter="handleDeleteChapter($event)"
      @updateChapter="handleUpdateChapter($event)"
    ></ListChapterSection>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import Chapter from "@/types/chapter/ChapterItem";
import { ElMessage, ElMessageBox, ElNotification } from "element-plus";
import ListChapterSection from "./ListChapterSection.vue";

@Options({
  props: {
    chapters: [],
    course_id: String,
    course_title: String
  },
  components: {
    ListChapterSection,
  },
  data() {
    return {
      course_chapters: [],
    };
  },
  methods: {
    ...mapActions("chapter", [ActionTypes.CREATE_CHAPTER]),
    ...mapMutations(["SET_LOADING"]),
    async createChapter(title: string) {
      let response: any = await this.CREATE_CHAPTER({
        course_id: this.course_id,
        chapter: { title: title },
      });
      if (response.status == 201) {
        ElNotification({
          title: "Create successfully",
          message: "You've just created a new chapter.",
          type: "success",
        });
        this.course_chapters.push(response.data.chapter);
      } else {
        ElNotification({
          title: "Error",
          message: "Information is incorrect. Please check again",
          type: "error",
        });
      }
    },
    async addChapter() {
      await ElMessageBox.prompt("Title", "Add Chapter", {
        confirmButtonText: "Add",
        cancelButtonText: "Cancel",
        inputPlaceholder: "Please fill title",
        confirmButtonClass: "el-button--success",
      }).then(async ({ value }) => {
        if (value != null) {
          await this.createChapter(value);
          await this.fetchChapters();
        } else {
          ElMessage({
            type: "error",
            message: `Please fill title for chapter`,
          });
        }
      });
    },
    handleDeleteChapter(id: string) {
      this.course_chapters.splice(
        this.course_chapters.map((chapter: Chapter) => chapter.id).indexOf(id),
        1
      );
    },
    handleUpdateChapter(chapter: Chapter) {
      let index = this.course_chapters
        .map((e: Chapter) => e.id)
        .indexOf(chapter.id);
      this.course_chapters[index] = chapter;
    },
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),
  },
  created() {
    this.unwatchChapters = this.$watch("chapters", (newVal: any) => {
      if (newVal) {
        this.course_chapters = newVal;
        this.unwatchChapters();
      }
    });
  },
})
export default class ChapterSection extends Vue {
  chapters!: Chapter;
}
</script>

<style lang="scss" scoped>
</style>
