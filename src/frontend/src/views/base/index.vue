<template>
  <div class="base">
    <Sidebar :items="items" @collapse="is_collapse = $event"/>
    <div :class="['main', {'main--collapse': is_collapse}]">
      <TopBar></TopBar>
      <div class="container p-4">
        <div class="is-loading-bar has-text-centered" :class="{'is-loading': is_loading }">
          <div class="lds-dual-ring"></div>
        </div>
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import {mapState} from "vuex";
import Sidebar from "@/components/Sidebar.vue";
import TopBar from "@/components/TopBar.vue";
import {ROUTES} from '@/const/routes'

@Options({
  components: {
    Sidebar,
    TopBar
  },
  data() {
    return {
      items: [
        {name: 'library', icon: 'fa-solid fa-book-atlas', route: ROUTES.LIBRARY},
        {name: 'my course', icon: 'fa-solid fa-bookmark', route: ROUTES.MY_COURSE},
      ],
      is_collapse: false
    }
  },
  computed: {
    ...mapState(["is_loading"])
  }
})

export default class BasePage extends Vue {
}
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  margin-left: 250px;
  width: calc(100% - 250px);
  z-index: 2;
  transition: all 0.3s;

  &--collapse {
    margin-left: 70px;
    width: calc(100% - 70px);
  }
}


.is-loading-bar {
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading {
    height: 80px;
  }
}

.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}

.lds-dual-ring:after {
  content: " ";
  display: block;
  width: 64px;
  height: 64px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid #ccc;
  border-color: #ccc transparent #ccc transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}

@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

</style>