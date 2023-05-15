<template>
  <div v-if="data" class="home">
    <VueQRCodeComponent
      :text="JSON.stringify(props.data)"
      :size="200"
      color="blue"
      error-level="L"
      id="qrCode"
    ></VueQRCodeComponent>
    <button class="btn btn-success" @click="download()">Download</button>
  </div>
</template>
<script setup>
import VueQRCodeComponent from "vue-qr-generator";
import { defineProps } from "vue";
const props = defineProps(["data", "name"]);
function download() {
  var myDiv = document.getElementById("qrCode");
  var myImage = myDiv.children[1];
  const a = document.createElement("a");
  a.download = props.name ? props.name : "QRCode";
  a.href = myImage.src;
  document.body.append();
  a.click();
  a.remove();
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}
.inputField {
  max-width: 100px;
}
</style>
  