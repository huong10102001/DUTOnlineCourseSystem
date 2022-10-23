<template>
    <el-form
      :model="dynamicValidateForm"
    >
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
        ]"
      >
        <el-input v-model="dynamicValidateForm.email" />
      </el-form-item>
    </el-form>
  </template>
  
  <script lang="ts" setup>
  import { reactive} from 'vue'

  const dynamicValidateForm = reactive<{
    email: string
  }>({
    email: '',
  })
  

  </script>