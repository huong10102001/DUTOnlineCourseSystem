<template>
  <p class="control has-icons-left">
    <input
      class="input is-rounded"
      v-model="_q"
      @change="$emit('textChange', _q)"
      type="text"
      placeholder="Search">
    <span class="icon is-small is-left">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass"/>
    </span>
  </p>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  props: {
    q: "",
  },
  data(){
    return {
      _q: this.q
    }
  }
})
export default class SearchBar extends Vue {
}
</script>

<style scoped>

</style>