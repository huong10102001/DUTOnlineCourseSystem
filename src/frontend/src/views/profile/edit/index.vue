<template>
  <el-row>
    <el-col :span="14">
      <AvatarSection 
        :user="user"
        @changeAvatar="user.avatar = $event"
      ></AvatarSection>
      <el-row
        style="background-color: white; border-radius: 10px"
        class="p-5 m-3"
      >
        <InfoSection :editForm="editForm"></InfoSection>
      </el-row>
    </el-col>
    <el-col
      :span="10"
      style="background-color: white; border-radius: 15px"
      class="p-5 my-3"
    >
      <CertificateSection></CertificateSection>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import AvatarSection from "./AvatarSection.vue";
import CertificateSection from "./CertificateSection.vue";
import InfoSection from "./InfoSection.vue";

@Options({
  components: {
    AvatarSection,
    CertificateSection,
    InfoSection,
  },
  data() {
    return {
      user: {} as any,
      editForm: {
        account: {
          email: "",
        },
      } as any,
      
    };
  },
  methods: {
    ...mapActions("user", [ActionTypes.GET_USER_PROFILE]),
    ...mapMutations(["SET_LOADING"]),
    async getProfileDetail() {
      this.SET_LOADING(true)
      let response: any = await this.GET_USER_PROFILE(this.tokenInfo.user_id);
      if (response.status == 200) {
        this.user = response.data;
        this.editForm = this.user;
      }
      this.SET_LOADING(false);
    },
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"]),
  },
  async created() {
    await this.getProfileDetail();
  },
})
export default class ProfileEdit extends Vue {}
</script>

<style>
</style>