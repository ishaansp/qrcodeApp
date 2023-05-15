<template>
  <QrCapture @decode="props.output" v-if="!props?.result"></QrCapture>
  <div class="cam" v-if="!props?.result">
    <QrStream @decode="props.output" @init="onInit"> </QrStream>
  </div>
  <p class="alert alert-danger" v-if="errors && !props?.result">{{ errors }}</p>
  <!-- <div class="output" v-if="result && !isObject">Result:{{ result }}</div>
  <p class="error">{{ errors }}</p>
  <div class="table">
    <TableComponent
      v-if="isObject"
      :data="result"
      :selected="selected"
      :header="headers"
      :type="tableType"
    />
  </div> -->
</template>

<script setup>
import { ref } from "vue";
import { QrStream, QrCapture } from "vue3-qr-reader";
// import TableComponent from "./TableComponent.vue";
import { defineProps } from "vue";

const props = defineProps(["output", "result"]);
// import { onDecode } from "../utilities/utilities";
// import { useStore } from "@/store/store";
const errors = ref("");
// const result = ref("");
// const tableType = ref("");
// const isObject = ref(false);
// const selected = ref("");
// const headers = ref("");
// const store = useStore();
// const output = (data) => {
//   const { type, object, value } = onDecode(data);
//   isObject.value = object;
//   tableType.value = type;
//   if (tableType.value === "compound") {
//     selected.value = value;
//     result.value = store.getCompoundsList;
//     headers.value = ["Sl.no", "Compound Number"];
//   } else if (tableType.value === "mould") {
//     selected.value = value;
//     result.value = store.getMouldsList;
//     headers.value = ["Sl.no", "Machine Number"];
//   } else {
//     result.value = value;
//     selected.value = "";
//     headers.value = [
//       "Sl.no",
//       "RecipeNumber",
//       "Machine Temperature",
//       "Machine Pressure",
//       "No .of Shots / Mould",
//       "Mould Number",
//       "Compound Number",
//       "Machine Number",
//     ];
//   }
// };

const onInit = async (promise) => {
  try {
    // eslint-disable-next-line
    const { capabilities } = await promise;
  } catch (error) {
    switch (error.name) {
      case "NotAllowedError":
        errors.value = "user denied camera access permission";
        break;
      case "NotFoundError":
        errors.value = "no suitable camera device installed";
        break;
      case "NotSupportedError":
        errors.value = "page is not served over HTTPS (or localhost)";
        break;
      case "NotReadableError":
        errors.value = "maybe camera is already in use";
        break;
      case "OverconstrainedError":
        errors.value =
          "did you requested the front camera although there is none?";
        break;
      default:
        errors.value = "browser seems to be lacking features";
        break;
    }
  }
};
</script>

<style scoped>
.output {
  margin-top: 10px;
}
.cam {
  max-height: min-content;
}

.table {
  display: flex;
  justify-content: center;
}
</style>