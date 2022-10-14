<template>
  <div class="base">
    <Sidebar :items="items" @collapse="is_collapse = $event"/>
    <div :class="['main', {'main--collapse': is_collapse}]">
      <TopBar></TopBar>
      <div class="container is-fullhd p-6">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import Sidebar from "@/components/Sidebar.vue";
import TopBar from "@/components/TopBar.vue";

@Options({
  components: {
    Sidebar,
    TopBar
  },
  data() {
    return {
      items: [
        {name: 'library', icon: 'fa-solid fa-grip', route: '/'},
        {name: 'my course', icon: 'fa-solid fa-book-open-reader', route: '/library'},
        {name: 'log out', icon: 'fa-solid fa-book-open-reader', route: '/library'},
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