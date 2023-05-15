<template>
  <hr />
  <h1>Employee Portal</h1>
  <hr />
  <p class="heading">QRCode Generate</p>
  <form class="select" @submit.prevent="machineSelected">
    <div class="labels">
      <label for="machine">Select Machine : </label
      ><select id="machine" class="input" v-model="selectedMachine" required>
        <option
          v-for="data in plannerList"
          :key="data.id"
          :value="data.machineNo"
        >
          {{ data.machineNo }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">submit</button>
  </form>
  <hr v-if="data.machineNo" />
  <p v-if="data.machineNo">QRCode</p>
  <QrGenerator :data="data" name="PlannerQRCode" />
  <hr />
  <button @click="handleQRCode" class="btn btn-success">
    {{ isScanQRCode ? "Hide QRCode" : "Scan QRCode" }}
  </button>
  <div class="qrCodeReader" v-if="isScanQRCode">
    <QRCodeReader :output="output" :result="result" />
    <div class="output" v-if="result && !isObject">Result:{{ result }}</div>
    <div class="table">
      <TableComponent
        v-if="isObject"
        :data="result"
        :selected="selected"
        :header="headers"
        :type="tableType"
        :mould="mould"
        :compound="compound"
      />
    </div>
    <div v-if="tableType === 'planner'">
      <button
        v-if="!mould"
        @click="isMouldScanQRCode = !isMouldScanQRCode"
        class="btn btn-success"
      >
        {{ isMouldScanQRCode ? "Hide" : "Scan Mould QRCode" }}
      </button>
      <button
        v-if="!compound"
        @click="isCompoundScanQRCode = !isCompoundScanQRCode"
        class="btn btn-success"
      >
        {{ isCompoundScanQRCode ? "Hide" : "Scan compound QRCode" }}
      </button>
      <div v-if="isMouldScanQRCode">
        <QRCodeReader :output="mouldOutput" :result="mould" />
        <p class="alert alert-danger" v-if="errors?.mould">
          {{ errors.mould }}
        </p>
      </div>
      <div v-if="isCompoundScanQRCode">
        <QRCodeReader :output="compoundOutput" :result="compound" />
        <p class="alert alert-danger" v-if="errors?.compound">
          {{ errors.compound }}
        </p>
      </div>
    </div>
  </div>
  <button
    :disabled="!(mould && compound)"
    class="btn btn-success"
    @click="productQRGenerate"
  >
    Allow Production
  </button>
  <hr v-if="productQRCode" />
  <div class="productQRCodes" v-if="productQRCode">
    <QrGenerator
      v-for="product in productQRCode"
      :data="product"
      :key="product.uid"
      name="ProductQRCode"
    />
  </div>
  <hr />
  <div class="table">
    <TableComponent
      :data="productList"
      :header="productHeader"
      type="products"
    />
  </div>
  <hr />
  <!-- <p class="heading">QRCode Generate</p>
  <form class="select" @submit.prevent="mouldSelected">
    <div class="labels">
      <label for="mould">Select Mould: </label
      ><select id="mould" class="input" v-model="selectedMould" required>
        <option v-for="data in mouldList" :key="data.id" :value="data.mouldNo">
          {{ data.mouldNo }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">submit</button>
  </form>
  <hr v-if="mouldData" />
  <p v-if="mouldData">QRCode</p>
  <QrGenerator :data="mouldData" name="MouldQRCode" />
  <hr />
  <p class="heading">QRCode Generate</p>
  <form class="select" @submit.prevent="compoundSelected">
    <div class="labels">
      <label for="compound">Select Compound: </label
      ><select id="compound" class="input" v-model="selectedCompound" required>
        <option
          v-for="data in compoundList"
          :key="data.id"
          :value="data.compoundNo"
        >
          {{ data.compoundNo }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">submit</button>
  </form>
  <hr v-if="compoundData.compoundNo" />
  <p v-if="compoundData.compoundNo">QRCode</p>
  <QrGenerator :data="compoundData" name="CompoundQRCode" />
  <hr /> -->
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "../store/store";
import QrGenerator from "@/components/QrGenerator.vue";
import QRCodeReader from "@/components/QRCodeReader.vue";
import { onDecode } from "../utilities/utilities";
import TableComponent from "@/components/TableComponent.vue";
import { uuid } from "vue3-uuid";

const store = useStore();
const data = ref("");
// const mouldData = ref("");
// const compoundData = ref("");
const productHeader = ref([
  "Sl.no",
  "UId",
  "Job No",
  "Recipe No",
  "Production Status",
  "Visual Inspection",
  "Leak Testing",
  "Cleaning",
]);
const plannerList = ref(store.getPlannerList);
const productList = ref(store.getProductList);
// const mouldList = ref(store.getMouldsList);
// const compoundList = ref(store.getCompoundsList);
// const selectedMould = ref("");
const selectedMachine = ref("");
// const selectedCompound = ref("");
const mould = ref("");
const compound = ref("");
const isScanQRCode = ref(false);
const isMouldScanQRCode = ref(false);
const isCompoundScanQRCode = ref(false);
const errors = ref("");
const result = ref("");
const tableType = ref("");
const isObject = ref(false);
const selected = ref("");
const headers = ref("");
const productQRCode = ref("");
const output = async (QRData) => {
  const { type, object, value } = await onDecode(QRData);
  isObject.value = object;
  tableType.value = type;
  if (tableType.value === "compound") {
    selected.value = value;
    result.value = store.getCompoundsList;
    headers.value = ["Sl.no", "Compound Number"];
  } else if (tableType.value === "mould") {
    selected.value = value;
    result.value = store.getMouldsList;
    headers.value = ["Sl.no", "Machine Number"];
  } else {
    result.value = value;
    selected.value = "";
    headers.value = [
      "Sl.no",
      "RecipeNumber",
      "Machine Temperature",
      "Machine Pressure",
      "No.of Cavity / Mould",
      "Post Production",
      "Mould Number",
      "Compound Number",
      "Machine Number",
    ];
  }
  mould.value = "";
  compound.value = "";
  isMouldScanQRCode.value = false;
  isCompoundScanQRCode.value = false;
};

const mouldOutput = (QRData) => {
  const { type, value } = onDecode(QRData);
  if (type === "mould" && result.value.mouldNo === value.mouldNo) {
    mould.value = value.mouldNo;
    errors.value = "";
  } else {
    mould.value = "";
    errors.value = { mould: "Incorrect Mould" };
  }
};

const compoundOutput = (QRData) => {
  const { type, value } = onDecode(QRData);
  if (type === "compound" && result.value.compoundNo === value.compoundNo) {
    compound.value = value.compoundNo;
    errors.value = "";
  } else {
    compound.value = "";
    errors.value = { compound: "Incorrect Compound" };
  }
};

const machineSelected = () => {
  data.value = plannerList.value.find(
    (it) => it.machineNo === selectedMachine.value
  );
};

const handleQRCode = () => {
  isScanQRCode.value = !isScanQRCode.value;
  isObject.value = "";
  tableType.value = "";
  result.value = "";
  mould.value = "";
  compound.value = "";
};

const productQRGenerate = () => {
  let count = result.value.noOfCavities;
  let data = [];
  let jobNo = Math.round(Math.random() * 10000);
  for (let i = 1; i <= count; i++) {
    let temp = {
      uid: uuid.v1(),
      jobNo: "J" + jobNo,
      recipeNo: result.value.recipeNo,
      plannerId: result.value.id,
      isProductionCompleted: false,
      postProduction: { ...result.value.postProduction },
    };
    store.addProductList(temp);
    data.push(temp);
  }
  productQRCode.value = data;
  handleQRCode();
};

// const mouldSelected = () => {
//   mouldData.value = mouldList.value.find(
//     (it) => it.mouldNo === selectedMould.value
//   );
// };
// const compoundSelected = () => {
//   compoundData.value = compoundList.value.find(
//     (it) => it.compoundNo === selectedCompound.value
//   );
// };
</script>

<style  scoped>
.select {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.qrCodeReader {
  margin-top: 10px;
}
.input {
  width: 100px;
}
.labels {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
.table {
  display: flex;
  justify-content: center;
}
.btn {
  margin: 5px;
}
.productQRCodes {
  display: flex;
  justify-content: center;
  gap: 20px;
}
</style>
