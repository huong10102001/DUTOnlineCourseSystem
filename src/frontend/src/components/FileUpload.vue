<template>
  <el-form-item>
      <span class="title is-5 mt-3" style="width: 100%">Attachment</span>
      <el-upload
        class="upload-demo"
        drag
        :accept="fileType"
        ref="upload"
        action=""
        :limit="1"
        :on-change="changeFile"
        :before-upload="beforeUpload"
        :file-list="fileList"
        :on-remove="handleRemove"
        :auto-upload="false"
        :on-exceed="handleExceed"

      >
        <el-icon class="el-icon--upload">
          <upload-filled/>
        </el-icon>
        <div class="el-upload__text">
          Drop file here or <em>click to upload</em>
        </div>
        <template #tip>
          <div class="el-upload__tip">
            mp4/pdf only approved
          </div>
        </template>
      </el-upload>
    </el-form-item>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import {ElNotification} from "element-plus";

@Options({
  props: {
    type: ""
  },
  data() {
    return {
      fileList: []
    }
  },
  methods: {
    changeFile(file: any, fileList: any) {
      this.$emit('change-file', file)
      this.fileList = fileList
    },
    handleRemove(file: any, fileList: any) {
      this.fileList = [];
    },
    beforeUpload(file: any) {
      const isMP4 = file.type === "video/mp4";
      const isPDF = file.type === "application/pdf";

      if (!isMP4 && this.type == "Video") {
        ElNotification({
          title: 'Notice',
          message: 'File type must be MP4 format!',
          type: 'info',
        })
      }

      if (!isPDF && this.type == "Document") {
        ElNotification({
          title: 'Notice',
          message: 'File type must be PDF format!',
          type: 'info',
        })
      }

      return (isMP4 && this.type == "Video") || (isPDF && this.type == "Document")
    },
    handleExceed(file: any, fileList: any) {
      this.fileList = [file[0]];
      this.$emit('change-file', file[0])
    },
  },
  computed: {
    fileType() {
      switch (this.type) {
        case "Video": return ".mp4"; break;
        case "Document": return ".pdf"; break
      }
    }
  }
})

export default class FileUpload extends Vue {
  type !: string
}
</script>