<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column has-text-centered" ref="certificate">

      <h1 class="is-size-3">Earn a Certificate upon completion</h1>
      <p class="mt-3 mb-5">
        You will receive a certificate when your course process is completed.
      </p>

      <vue-pdf-embed :source="certificate"/>
    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
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

export default class CertificateSection extends Vue {
}
</script>
