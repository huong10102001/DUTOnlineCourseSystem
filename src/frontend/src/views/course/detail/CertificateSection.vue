<template>
  <div class="course-detail__section has-background-white p-3 columns">
    <div class="column has-text-centered">
      <h1 class="is-size-3">Earn a Certificate upon completion</h1>
      <p class="mt-3 mb-5">
        Learn to Program and Analyze Data with Python. Develop programs to gather, clean, analyze, and visualize data.
      </p>

      <figure class="image mt-3 m-auto" style="max-width: 450px">
        <img src="@/assets/images/certificate_example.png">
      </figure>

    </div>
  </div>
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';

@Options({
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
  }
})

export default class CertificateSection extends Vue {
}
</script>
