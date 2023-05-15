<template>
  <div class="form">
    <h5 class="heading">{{ props.heading }}</h5>
    <form @submit.prevent="props.submit()">
      <input
        class="input"
        type="text"
        :value="props.values"
        @input="$emit('update:values', $event.target.value)"
        required
      />
      <button class="submitBtn" type="submit">{{ props.btn }}</button>
    </form>
  </div>
</template>
<script setup>
import { defineProps, defineEmits } from "vue";
const props = defineProps(["submit", "values", "btn", "heading"]);

defineEmits(["update:values"]);
</script>
<style scoped>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: max-content;
  margin: 10px;
  background: rgb(238, 174, 202);
  background: radial-gradient(
    circle,
    rgba(238, 174, 202, 1) 0%,
    rgba(148, 187, 233, 1) 100%
  );
  border-radius: 5px;
}
.submitBtn {
  background-color: #198754;
  color: white;
  font-weight: 400;
  border-radius: 5px;
  margin: 10px;
  padding: 0px 10px;
  border: none;
  cursor: pointer;
}
.submitBtn:hover {
  opacity: 75%;
}
.heading {
  color: white;
  font-weight: bold;
  margin-top: inherit;
}
.input {
  border: none;
  border-radius: 5px;
  margin: 0px 5px;
}
</style>