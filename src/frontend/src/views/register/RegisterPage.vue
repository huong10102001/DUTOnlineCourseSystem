<template>
  <div class="common-layout">
    <el-container class="is-flex is-flex-direction-column">
      <el-header>
        <el-row>
          <el-col :span="3"></el-col>
          <el-col :span="12">
            <router-link to="/home">
              <div class="logo is-flex is-justify-content-left">
                <div class="logo__icon">e</div>
                <div class="logo__text">learning</div>
              </div>
            </router-link>
          </el-col>
        </el-row>
      </el-header>
      <hr>
      <el-main class="columns is-centered">
        <el-form
          ref="loginFormRef"
          class="form p-6 is-half"
          :model="loginForm"
          style="min-height: 680px"
        >
          <div class="title" style="color: #024547; font-size: 2rem;">Become a member</div>
          <p class="subtitle">Get instant Access to 4500 Courses</p>
          <el-form-item prop="fullname">
            <el-input placeholder="Password" v-model="loginForm.password" size="large" :prefix-icon="EditPen"/>
          </el-form-item>
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
            <el-input placeholder="Email" v-model="loginForm.email" size="large" :prefix-icon="UserFilled"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="Password" v-model="loginForm.password" size="large" type="password"
                      :prefix-icon="EditPen"/>
          </el-form-item>
          <el-form-item prop="password">
            <el-input placeholder="Confirm password" v-model="loginForm.password" size="large" type="password"
                      :prefix-icon="EditPen"/>
          </el-form-item>
          <p class="subtitle" style="font-size: 1rem">Sign up as</p>
          <el-row class="mb-4 is-flex is-justify-content-center">
            <!-- <el-radio-group> -->
            <el-card shadow="always" align="center">
              <font-awesome-icon icon="fa-solid fa-graduation-cap" class="mb-2"/>
              <p class="subtitle mt-1" style="font-size: 0.75rem">A student,<br>looking for a course</p>
            </el-card>
            <el-col :span="2"></el-col>
            <el-card shadow="always" align="center">
              <font-awesome-icon icon="fa-solid fa-chalkboard-user" class="mb-2"/>
              <p class="subtitle mt-1" style="font-size: 0.75rem">A lecturer,<br>posting my course</p>
            </el-card>
            <!-- </el-radio-group> -->
          </el-row>
          <div class="field">
            <p :class="['control', 'is-flex', 'is-justify-content-center']">
              <el-button class="button is-success is-fullwidth mt-2" @click="onLogin" size="large">Sign up</el-button>
            </p>
            <p class="subtitle mt-3 is-flex is-justify-content-center" style="font-size: 1rem">
              Already have an account?
              <router-link to="/login">Log in</router-link>
            </p>
          </div>
        </el-form>
      </el-main>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>PBL6</strong> E-Learing. The source code is licensed.
          </p>
        </div>
      </footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {UserFilled, EditPen} from '@element-plus/icons-vue'

const loginFormRef = ref<FormInstance>()
const loginForm = reactive({
  email: '',
  password: '',
})

const onLogin = () => {
  alert('submit!')
}

</script>

<style scoped lang="scss">
@import "@/views/home/style.scss";
</style>
  