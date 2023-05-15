<template>
  <div
    class="toast show bg-light"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="toast-header">
      <strong class="me-auto">Success</strong>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="toast"
        aria-label="Close"
      ></button>
    </div>
    <div class="toast-body">{{ props.message }}</div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
const props = defineProps(["message"]);
</script>

<style scoped>
.toast {
  position: absolute;
  top: 80px;
  right: 10px;
}
</style>