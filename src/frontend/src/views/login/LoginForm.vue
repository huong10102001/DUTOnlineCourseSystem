<template>
  <el-form
    ref="loginFormRef"
    class="form p-6 is-half"
    :model="loginForm"
  >
    <div class="title" style="color: #024547; font-size: 2rem;">Welcome to E-Learning</div>
    <p class="subtitle">Get instant Access to 4500 Courses</p>
    <el-form-item
      prop="email"
      :rules="[
      {
        required: true,
        message: 'Please input email address',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur', 'change'],
      },
    ]">
      <el-input placeholder="Email" v-model="loginForm.email" size="large" :prefix-icon="email_icon"/>
    </el-form-item>
    <el-form-item prop="password"
      :rules="[
        {
          required: true,
          message: 'Please input password',
          trigger: 'blur',
        }
      ]">
      <el-input placeholder="Password" v-model="loginForm.password" size="large" type="password"
               :prefix-icon="password_icon" class="mt-1" />
    </el-form-item>
    <p :class="['subtitle', 'mt-2', 'is-flex', 'is-justify-content-right']" style="font-size: 1rem">Forgot
      password?</p>
    <div class="field">
      <p :class="['control', 'is-flex', 'is-justify-content-center']">
        <el-button class="button is-success is-fullwidth mt-2" @click="onLogin" size="large">Login</el-button>
      </p>
      <p class="subtitle mt-3 is-flex is-justify-content-center" style="font-size: 1rem">
        New to E-Learning?
        <router-link to="/register">Sign up</router-link>
      </p>
    </div>
  </el-form>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import { ref } from 'vue'
import type { FormInstance } from 'element-plus'
import { UserFilled, EditPen } from '@element-plus/icons-vue'
import LoginItem from "@/types/login/LoginItem";
import { mapActions } from "vuex";
import {ActionTypes} from "@/types/store/ActionTypes";

const loginFormRef = ref<FormInstance>()

@Options({
  data() {
    return {
      loginForm: {
        email: "",
        password: ""
      } as LoginItem,
      email_icon: UserFilled,
      password_icon: EditPen
    }
  },
  methods: {
    ...mapActions("authentication", [ActionTypes.LOGIN]),
    async onLogin(){
      await this.LOGIN(this.loginForm)
    }
  }
})

export default class LoginForm extends Vue {}
</script>

<script lang="ts" setup>

</script>