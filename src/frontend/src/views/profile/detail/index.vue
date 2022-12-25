<template>
  <title-bar :title="'My Profile'"></title-bar>
  <TopSection :user="user"></TopSection>
  <el-row :gutter="20">
    <el-col :md="8">
      <LeftSection :user="user"></LeftSection>
    </el-col>
    <el-col :md="16">
      <RightSection :user="user"></RightSection>
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { mapActions, mapMutations, mapGetters } from "vuex";
import { ActionTypes } from "@/types/store/ActionTypes";
import TopSection from "@/views/profile/detail/TopSection.vue";
import LeftSection from "@/views/profile/detail/LeftSection.vue";
import TitleBar from "@/components/TitleBar.vue";
import RightSection from "@/views/profile/detail/RightSection.vue";

@Options({
  components: {
    RightSection,
    TitleBar,
    TopSection,
    LeftSection
  },
  data() {
    return {
      user: {
        role: "" as String
      } as any
    }
  },
  methods: {
    ...mapActions('user', [ActionTypes.GET_USER_PROFILE]),
    ...mapMutations(["SET_LOADING"]),
    async getProfileDetail() {
      this.SET_LOADING(true)
      let user_id = this.tokenInfo.user_id
      if (this.$route.query.id) user_id = this.$route.query.id
      let response: any = await this.GET_USER_PROFILE(user_id)
      if (response.status == 200) {
        this.user = response.data
      }
      this.SET_LOADING(false)
    }
  },
  computed: {
    ...mapGetters("authentication", ["tokenInfo"])
  },
  async created() {
    await this.getProfileDetail()
  }
})

export default class ProfileDetail extends Vue {}
</script>

<style lang="scss" scoped>
.profile-section {
  background-color: white;
  border-radius: 20px;
  padding: 30px;
  margin-bottom: 30px;
}
</style>