<template>
  <el-row style="background-color:white;border-radius:10px;" class="p-5 m-3">
    <el-col :span="1"></el-col>
    <el-col :span="4" class="is-flex is-justify-content-right mr-6">
      <el-avatar :size="90">
        <img v-if="user.avatar" :src="user.avatar">
        <img v-else src="@/assets/vectors/default_avatar.svg"/>
      </el-avatar>
    </el-col>
    <el-col :span="10" class="mt-3">
        <p class="title is-4">{{ user.full_name }}</p>
        <p class="subtitle is-5">{{ user.role }}</p>
    </el-col>
  </el-row>
  <el-container class="mt-3 ml-3">
    <el-aside>
        <div style="background-color:white;border-radius:10px;" class="p-5 my-5">
            <p class="title is-4" style="color:#024547;">Introduction</p>
            <el-row class="subtitle is-6 mt-4">{{ user.bio }}</el-row>
        </div>
        <div style="background-color:white;border-radius:10px;" class="p-5 my-5">
            <p class="title is-4" style="color:#024547;">Certificate</p>
            <el-collapse accordion>
              <el-collapse-item title="Course 1" name="1">
                <router-link to="/#">
                  <div class="ml-3 mb-3">View</div>
                </router-link>
                <router-link to="/#">
                  <div class="ml-3">Download</div>
                </router-link>
              </el-collapse-item>
              <el-collapse-item title="Course 2" name="2">
                <router-link to="/#">
                  <div class="ml-3 mb-3">View</div>
                </router-link>
                <router-link to="/#">
                  <div class="ml-3">Download</div>
                </router-link>
              </el-collapse-item>
              <el-collapse-item title="Course 3" name="3">
                <router-link to="/#">
                  <div class="ml-3 mb-3">View</div>
                </router-link>
                <router-link to="/#">
                  <div class="ml-3">Download</div>
                </router-link>
              </el-collapse-item>
            </el-collapse>
        </div>
    </el-aside>
    <el-main class="ml-5">
      <p class="title is-4 py-5 pl-5" style="background-color:white;border-radius:10px;color:#024547;">Course Registered</p>
      <el-row
        v-for="index in 4"
        :key="index">
        <el-card class="p-4 my-3" style="width:100%;" shadow="hover">
          <el-row>
            <el-col :span="4" class="is-flex is-justify-content-right mr-6">
              <img
              src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png" style="width:100px;height:100px;"/>
            </el-col>
            <el-col :span="15">
                <p class="title is-5">Yummy hamburger</p>
                <p class="subtitle is-5">short description</p>
            </el-col>
          </el-row> 
        </el-card>
      </el-row>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import { mapActions, mapMutations, mapGetters } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

@Options({
  data() {
    return {
      user: {} as any
    }
  },
  methods: {
    ...mapActions('user', [ActionTypes.GET_USER_PROFILE]),
    ...mapMutations(["SET_LOADING"]),
    async getProfileDetail() {
      this.SET_LOADING(true)
      let response: any = await this.GET_USER_PROFILE(this.tokenInfo.user_id)
      if (response.status == 200){
        this.user = response.data
      }
      this.SET_LOADING(false)
    }
  },
  computed: {
    ...mapGetters("authentication",["tokenInfo"])
  },
  async created() {
    await this.getProfileDetail()
  }
})

export default class ProfileDetail extends Vue {}
</script>

<style>

</style>