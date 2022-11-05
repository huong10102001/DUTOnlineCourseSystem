<template>
  <div class="columns is-flex is-vcentered pl-3 pr-3 mt-3">
    <div class="column is-flex is-justify-content-start">
        <button class="button is-text p-0" @click="$router.back()">
          <font-awesome-icon icon="fa-solid fa-arrow-left"/>
        </button>
    </div>
    <div class="column is-flex is-justify-content-end">
      {{ title }}
      <div v-if="$route.name == 'course-detail' && userInfo.role != ROLES.USER">
        <button class="button is-text p-0 ml-2" style="font-size: 0.8rem"
                @click="$router.push({path: `${$route.params.course_slug}/edit`})">
          <font-awesome-icon icon="fa-solid fa-pen" />
        </button>
      </div>
    </div>
	</div>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import { mapState } from "vuex";
import {ROLES} from "@/const/roles";

@Options({
  props: {
    title: ""
  },
  computed: {
    ...mapState("user", ["userInfo"])
  },
  created() {
    this.ROLES = ROLES
  }
})

export default class AddCoursePage extends Vue {
  title!: string
}
</script>