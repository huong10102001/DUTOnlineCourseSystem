<template>
  <el-form
    size="large"
    :model="topic"
    label-width="90px"
    @change="$emit('updateTopic', topic)"
  >
    <el-form-item label="Title">
      <el-input v-model="topic.title" placeholder="Enter title" autocomplete="off"/>
    </el-form-item>

    <el-form-item label="Description">
      <el-input type="textarea" v-model="topic.description" placeholder="Enter description..." autocomplete="off"/>
    </el-form-item>
  </el-form>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import TopicItem from "@/types/course/TopicItem";

@Options({
  props: {
    topic: {} as TopicItem
  }
})

export default class TopicForm extends Vue {}
</script>