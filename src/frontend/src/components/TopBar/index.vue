<template>
  <div class="top-bar">
    <el-row class="p-3" justify="space-between">
      <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="8" class="top-bar__greeting">
        <p class="top-bar__greeting__name">Welcome, {{ userName }}</p>
        <p class="top-bar__greeting__text">Have a good day!</p>
      </el-col>

      <el-col :xs="8" :sm="8" :md="8" :lg="8" :xl="8" class="top-bar__search-bar hidden-sm-and-down">
        <SearchBar :q="q" @textChange="q = $event"></SearchBar>
      </el-col>

      <el-col :xs="8" :sm="12" :md="8" :lg="8" :xl="8">
        <div class="top-bar__right-menu columns is-vcentered is-flex is-justify-content-end p-3">

          <Notification></Notification>

          <div class="top-bar__right-menu__avatar">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <figure class="image">
                  <img v-if="avatar" class="is-rounded" :src="avatar" alt="Avatar">
                  <img v-else class="is-rounded" src="@/assets/vectors/default_avatar.svg" alt="Avatar">
                </figure>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <router-link to="/profile" class="dropdown-item">
                    Profile
                  </router-link>
                  <router-link to="/profile/edit" class="dropdown-item">
                    Edit Profile
                  </router-link>
                  <hr class="dropdown-divider">
                  <router-link to="/logout" class="dropdown-item">
                    Log Out
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row justify="center">
      <el-col :span="22" class="top-bar__search-bar hidden-md-and-up">
        <SearchBar :q="q" @textChange="q = $event"></SearchBar>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import 'element-plus/theme-chalk/display.css'
import Notification from "@/components/TopBar/Notification.vue";
import SearchBar from "@/components/TopBar/SearchBar.vue";

@Options({
  components: {
    SearchBar,
    Notification
  },
  props: {
    userName: "",
    avatar: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      q: ""
    }
  }
})

export default class TopBar extends Vue {
  userName!: string;
  avatar!: string
}
</script>

<style scoped lang="scss">
.top-bar {

  &__greeting {
    min-width: 250px;
    display: inline-block;

    &__name {
      display: block;
      font-weight: 400;
      text-transform: capitalize;
    }

    &__text {
      display: block;
      font-size: 1rem;
    }
  }

  &__search-bar {

    .control {
      .input, .icon {
        transition: all 0.3s ease-in-out;
      }
    }
  }

  &__right-menu {
    &__avatar {
      img {
        height: 52px;
        width: 52px;
        cursor: pointer;
      }
    }

    #dropdown-menu {
      font-weight: 400;
      position: absolute;
      top: 50px;
      left: -130px;
      z-index: 1;
    }
  }
}
</style>