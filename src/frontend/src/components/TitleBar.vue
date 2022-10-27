<template>
  <div class="columns is-flex is-vcentered pl-3 pr-3 mt-3">
    <div class="column is-flex is-justify-content-start">
        <button class="button is-text p-0" @click="$router.back()">
          <font-awesome-icon icon="fa-solid fa-arrow-left"/>
        </button>
    </div>
    <div class="column is-flex is-justify-content-end">
      {{ title }}
    </div>
	</div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";

@Options({
  props: {
    title: ""
  }
})

export default class AddCoursePage extends Vue {
  title!: string
}
</script>