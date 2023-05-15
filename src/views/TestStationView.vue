<template>
  <hr />
  <h1>Test Station</h1>
  <hr />
  <button @click="handleQRCode" class="btn btn-success">
    {{ isScanQRCode ? (result ? "Re-Scan" : "Hide") : "Scan QRcode" }}
  </button>
  <div class="" v-if="isScanQRCode">
    <QRCodeReader :output="output" :result="result" />
    <div class="table">
      <TableComponent
        v-if="isObject"
        :data="result"
        :header="headers"
        :type="tableType"
      />
    </div>
  </div>
  <hr />
  <div class="table">
    <TableComponent :data="productList" :header="productHeader" type="Tests" />
  </div>
  <hr />
</template>

<script setup>
import QRCodeReader from "@/components/QRCodeReader.vue";
import TableComponent from "@/components/TableComponent.vue";
import { useStore } from "@/store/store";
import { onDecode } from "@/utilities/utilities";
import { ref } from "vue";

const store = useStore();
const result = ref("");
const isScanQRCode = ref(false);
const headers = ref();
const tableType = ref("");
const isObject = ref(false);
const productList = ref(store.getProductionCompletedProductList);

const productHeader = ref([
  "Sl.no",
  "UId",
  "Job No",
  "Recipe No",
  "Production Status",
  "Visual Inspection",
  "Leak Testing",
  "Cleaning",
  // "Update Status",
]);

const handleQRCode = () => {
  if (result.value) {
    result.value = "";
    tableType.value = "";
    isObject.value = false;
    headers.value = "";
  } else {
    isScanQRCode.value = !isScanQRCode.value;
  }
};
const output = async (QRData) => {
  const { type, object, value } = await onDecode(QRData);
  if (type === "product") {
    isObject.value = object;
    result.value = value;
    tableType.value = type;
    headers.value = ["Sl.no", "UId", "Job No", "Recipe No"];
  }
};
</script>

<style scoped>
.table {
  display: flex;
  justify-content: center;
}
</style>