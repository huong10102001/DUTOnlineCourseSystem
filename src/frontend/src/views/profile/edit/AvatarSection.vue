<template>
  <el-row style="background-color:white;border-radius:10px;" class="p-5 m-3">
    <el-col :span="1"></el-col>
    <el-col :span="4" class="is-flex is-justify-content-right mr-6">
      <el-tooltip
        class="box-item"
        effect="dark"
        content="Click here to change your avatar"
        placement="top"
      >
        <el-upload
          class="avatar-uploader"
          action=""
          :http-request="updateAvatar"
          :show-file-list="false"
          :on-change="changeFile"
          :before-upload="beforeImageUpload"
          :disabled="is_freeze"
        >
        <el-avatar :size="90">
          <img v-if="user.avatar" :src="user.avatar">
          <img v-else src="@/assets/vectors/default_avatar.svg"/>
        </el-avatar>
        </el-upload>
      </el-tooltip>
    </el-col>
    <el-col :span="10" class="mt-3">
        <p class="title is-4">{{ user.full_name }}</p>
        <p class="subtitle is-5">{{ user.role }}</p>
    </el-col>
  </el-row>   
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import { mapActions, mapGetters } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";
import { ElNotification } from 'element-plus'

@Options({
  props: {
    user: {} as any
  },
  data(){
    return {
      avatar: null,
      is_freeze: false,
    }
  },
  methods: {
    ...mapActions("user", [ActionTypes.UPDATE_USER_PROFILE]),
    
    changeFile(file: any, fileList: any) {
      this.avatar = file;
      this.$emit('change-avatar', URL.createObjectURL(file.raw))
    },

    beforeImageUpload(file: any) {
      const isJPG = file.type === "image/jpeg";
      const isPNG = file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG && !isPNG) {
        ElNotification({
          title: 'Notice',
          message: 'Avatar picture must be JPG or PNG format!',
          type: 'info',
        })
      }
      if (!isLt2M) {
        ElNotification({
          title: 'Notice',
          message: 'Avatar picture size can not exceed 2MB!',
          type: 'info',
        })
      }
      return (isJPG || isPNG) && isLt2M;
    },

    async updateAvatar(){
      let formData = new FormData();

      formData.append("avatar", this.avatar.raw);

      const response = await this.UPDATE_USER_PROFILE({
        user_id: this.user.id,
        data: formData
      })

      if(response.status == 200){
        ElNotification({
          title: 'Update successfully',
          message: "You've just updated your avatar.",
          type: 'success',
        })
      }
    }
  },
})

export default class AvatarSection extends Vue {
  user!: any
}
</script>

<style scoped>

.avatar-uploader .el-upload {
  border-radius: 20px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 100% !important; 
  aspect-ratio: 21/9;
  transition: var(--el-transition-duration-fast);
} 

.el-icon.avatar-uploader-icon {
  border-radius: 20px;
  background-color: #eee;
  font-size: 28px;
  color: #8c939d;
  width: 100%;
  height:100%;
  margin: 0 auto;
}

</style>
