<template>
  <div class="base">
    <Sidebar :items="items" @collapse="is_collapse = $event"/>
    <div :class="['main', {'main--collapse': is_collapse}]">
      <TopBar></TopBar>
      <div class="container is-fullhd p-4">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from "@/components/Sidebar.vue";
import TopBar from "@/components/TopBar.vue";
import { ROUTES } from '@/const/routes'

@Options({
  components: {
    Sidebar,
    TopBar

  },
  data() {
    return {
      items: [
        {name: 'library', icon: 'fa-solid fa-grip', route: ROUTES.LIBRARY},
        {name: 'my course', icon: 'fa-solid fa-book-open-reader', route: ROUTES.MY_COURSE},
      ],
      is_collapse: false
    }
  }
})

export default class BasePage extends Vue {}
</script>

<style lang="scss" scoped>
.main{
  height: 100%;
  margin-left: 250px;
  width: calc(100% - 250px);
  z-index: 2;
  transition: all 0.3s;

  &--collapse{
    margin-left: 70px;
    width: calc(100% - 70px);
  }
}
</style>