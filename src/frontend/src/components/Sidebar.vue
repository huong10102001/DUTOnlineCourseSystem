<template>
  <aside :class="['sidebar', {'sidebar--collapse': is_collapse}]" ref="sidebar">
    <router-link to="/">
      <div :class="['logo', 'is-flex', 'is-justify-content-center', {'logo--collapse': is_collapse}]">
          <div :class="['logo__icon', {'logo__icon--collapse': is_collapse}]">e</div>
          <div :class="['logo__text', {'logo__text--collapse': is_collapse}]">learning</div>
      </div>
    </router-link>
    <div :class="{'collapse-toggle': true, 'collapse-toggle__off': is_collapse}" @click="is_collapse = !is_collapse; $emit('collapse', is_collapse)">
      <font-awesome-icon v-if="is_collapse" icon="fa-solid fa-arrow-right" />
      <font-awesome-icon v-else icon="fa-solid fa-arrow-left" />
    </div>
    <ul class="menu-list">
      <li v-for="item in items" class="menu-item">
        <router-link :to="item.route" :class="{is_collapse: is_collapse}"><font-awesome-icon :icon="item.icon" /><span :class="['menu-item__name', {'menu-item__name--collapse': is_collapse}]">{{ item.name }}</span></router-link>
      </li>
    </ul>
  </aside>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MenuItem from "@/types/sidebar/MenuItem";

@Options({
  props: {
    items: [] as MenuItem[],
  },
  data() {
    return {
      is_collapse: false
    }
  }
})

export default class Sidebar extends Vue {
  items!: MenuItem[]
}
</script>

<style scoped lang="scss">
.sidebar{
  display: inline-block;
  width: 250px;
  height: 100%;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  background-color: #ffffff;
  box-shadow: inset -5px 0 9px -7px rgba(0,0,0,0.7);
  transition: all 0.3s;

  &--collapse{
    width: 70px;
  }

  .menu-item{
    white-space: nowrap;
    overflow: hidden;

    .router-link-exact-active {
      background-color: #024547;
      color: #fff;
      margin: 5px 0;
      padding-left: 40px;
    }

    .router-link-exact-active:hover {
      background-color: #222;
      color: #fff;
    }

    &__name {
      font-weight: 500;
      margin-left: 20px;
      text-transform: capitalize;
      opacity: 1;
      transition: visibility 0s, opacity 0.5s linear;

      &--collapse{
        visibility: hidden;
        opacity: 0;
      }
    }

    a {
      transition: all 0.2s;
      color: #6D7C90;
      font-size: 1.2rem;
      padding: 15px 0 15px 20px;
      margin: 10px 20px;
      border-radius: inherit;
    }

    a:hover {
      background-color: transparent;
      color: #024547;
    }

    .is_collapse {
      padding: 15px 0 15px 17px;
      margin: 10px;
      border-radius: 4px;
    }
  }

  .logo {
    margin: 40px 20px;
    font-size: 2rem;
    font-weight: 300;
    text-align: center;

    &__icon {
      display: inline-block;
      height: 52px;
      width: 52px;
      background-color: #024547;
      border-radius: 14px;
      color: white;
      transition: all 0.3s;

      &--collapse {
        font-size: 1.6rem;
        border-radius: 8px;
        height: 36px;
        width: 36px;
        line-height: 32px;
        margin-bottom: 16px;
      }
    }

    &__text {
      display: inline-block;
      color: #024547;
      text-transform: capitalize;
      transition: visibility 0.8s, opacity 0.3s linear;
      margin-left: 10px;
      opacity: 1;
      overflow: hidden;

      &--collapse {
        display: none;
        opacity: 0;
        margin-left: 100px;
      }
    }

    &--collapse {
      margin: 40px 10px;
    }
  }

  .collapse-toggle {
    position: fixed;
    width: 30px;
    height: 30px;
    box-sizing: content-box;
    background-color: #024547;
    border-radius: 20px;
    text-align: center;
    color: white;
    font-size: 12px;
    line-height: 30px;
    opacity: 0.85;
    transition: all 0.3s;
    top: 85px;
    left: 235px;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;

    &__off{
      left: 55px;
    }
  }
  .collapse-toggle:hover {
    cursor: pointer;
    opacity: 1;
  }
}

</style>