<template>
  <vue-pdf-embed :source="certificate"/>
</template>

<script lang="ts">
import {Options, Vue} from "vue-class-component";
import VuePdfEmbed from "vue-pdf-embed";

@Options({
  props: {
    certificate: {
      type: String,
      default: ""
    }
  },
  components: {
    VuePdfEmbed
  }
})
export default class CertificationSection extends Vue {}
</script>
