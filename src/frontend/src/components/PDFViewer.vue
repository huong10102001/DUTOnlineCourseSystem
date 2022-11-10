<template>
  <VuePdfViewer
    :source="pdfFile"
    :controls="controls"
    loading-text="Loading lesson"
    rendering-text="Loading lesson"
    style="height: 70vh; min-height: 700px; max-height: 800px"
  />
</template>

<script lang="ts">
import {Options, Vue} from 'vue-class-component';
import VuePdfViewer from "pdf-viewer-vue";
@Options({
  components: {
    VuePdfViewer
  },
  props: {
    pdfFile: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      controls: [
        'rotate',
        'zoom',
        'catalog',
        'switchPage',
      ] as string[]
    }
  }
})
export default class PDFViewer extends Vue {}
</script>
