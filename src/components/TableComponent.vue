<template>
  <div class="tableComponent">
    <p class="header">{{ type.toUpperCase() }}</p>
    <p v-if="isNotFound" class="alert alert-danger">
      {{ props.selected }} not found
    </p>
    <table class="table table-bordered border-dark">
      <thead>
        <tr>
          <th
            v-for="data in props.header"
            :key="data.id"
            :class="data === 'Sl.no' ? 'sl' : ''"
          >
            {{ data }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="props.type === 'planner'">
          <td class="sl">{{ index + 1 }}</td>
          <td>
            {{ props.data.recipeNo }}
          </td>
          <td>
            {{ props.data.machineTemp }}
          </td>
          <td>
            {{ props.data.machinePressure }}
          </td>
          <td>
            {{ props.data.noOfCavities }}
          </td>
          <td>
            {{ data.postProduction ? Object.keys(data.postProduction) : "" }}
          </td>
          <td
            :class="
              props.data.mouldNo === props.mould
                ? 'bg-success text-white'
                : 'bg-danger text-white'
            "
          >
            {{ props.data.mouldNo }}
          </td>
          <td
            :class="
              props.data.compoundNo === props.compound
                ? 'bg-success text-white'
                : 'bg-danger text-white'
            "
          >
            {{ props.data.compoundNo }}
          </td>
          <td>
            {{ props.data.machineNo }}
          </td>
        </tr>
        <tr v-else-if="props.type === 'product'">
          <td class="sl">{{ index + 1 }}</td>
          <td>{{ props.data.uid }}</td>
          <td>{{ props.data.jobNo }}</td>
          <td>{{ props.data.recipeNo }}</td>
        </tr>
        <tr
          v-else-if="props.type === 'products'"
          v-for="(data, index) in props.data"
          :key="data.uid"
        >
          <td class="sl">{{ index + 1 }}</td>
          <td>{{ data.uid }}</td>
          <td>{{ data.jobNo }}</td>
          <td>{{ data.recipeNo }}</td>
          <td>
            <button class="btn btn-success" @click="productionStatus(data.uid)">
              {{
                data?.isProductionCompleted
                  ? "Production Completed"
                  : "Make Production Completed"
              }}
            </button>
          </td>
          <td>
            {{
              data.postProduction?.visualInspection
                ? "required"
                : "Not required"
            }}
          </td>
          <td>
            {{ data.postProduction?.leakTesting ? "required" : "Not required" }}
          </td>
          <td>
            {{ data.postProduction?.cleaning ? "required" : "Not required" }}
          </td>
        </tr>
        <tr
          v-else-if="props.type === 'Tests'"
          v-for="(data, index) in props.data"
          :key="index"
        >
          <td class="sl">{{ index + 1 }}</td>
          <td>{{ data.uid }}</td>
          <td>{{ data.jobNo }}</td>
          <td>{{ data.recipeNo }}</td>
          <td v-if="data.isProductionCompleted">Production Completed</td>
          <td>
            <input
              type="checkbox"
              :disabled="!data.postProduction?.visualInspection"
              :checked="data.postProduction?.isVisualInspectionCompleted"
              @change="handleChange(data.uid, 'isVisualInspectionCompleted')"
            />
          </td>
          <td>
            <input
              type="checkbox"
              :disabled="!data.postProduction?.leakTesting"
              :checked="data.postProduction?.isLeakTestingCompleted"
              @change="handleChange(data.uid, 'isLeakTestingCompleted')"
            />
          </td>
          <td>
            <input
              type="checkbox"
              :disabled="!data.postProduction?.cleaning"
              :checked="data.postProduction?.isCleaningCompleted"
              @change="handleChange(data.uid, 'isCleaningCompleted')"
            />
          </td>
        </tr>
        <tr
          v-else
          v-for="(data, index) in props.data"
          :key="data.id"
          :class="
            props.selected
              ? data.id === props.selected.id
                ? 'bg-success text-white'
                : 'bg-danger text-white'
              : ''
          "
        >
          <td class="sl">{{ index + 1 }}</td>
          <td v-if="['recipe'].includes(props.type)">
            {{ data.recipeNo }}
          </td>
          <td v-if="['recipe'].includes(props.type)">
            {{ data.machineTemp }}
          </td>
          <td v-if="['recipe'].includes(props.type)">
            {{ data.machinePressure }}
          </td>
          <td v-if="['recipe'].includes(props.type)">
            {{ data.noOfCavities }}
          </td>
          <td v-if="['recipe'].includes(props.type)">
            {{ postProduction(data) }}
          </td>
          <td v-if="['mould', 'recipe'].includes(props.type)">
            {{ data.mouldNo }}
          </td>
          <td v-if="['compound', 'recipe'].includes(props.type)">
            {{ data.compoundNo }}
          </td>
          <td v-if="['machine'].includes(props.type)">
            {{ data.machineNo }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script setup>
import { useStore } from "@/store/store";
import { computed, defineProps, ref } from "vue";

const props = defineProps([
  "data",
  "type",
  "header",
  "selected",
  "mould",
  "compound",
]);
const store = useStore();
const index = ref(0);
const isNotFound = computed(() => {
  return props.selected
    ? !props.data?.find((it) => it.id === props.selected?.id)
    : false;
});

const postProduction = (data) => {
  let required = [];
  if (data?.postProduction) {
    let keys = Object.keys(data?.postProduction);
    if (keys) {
      for (let key of keys) {
        if (data?.postProduction?.[key]) {
          required.push(key);
        }
      }
    }
  }
  return required;
};

const handleChange = (uid, key) => {
  store.changePostProductionStatus(uid, key);
};
const productionStatus = (uid) => {
  store.changeProductionStatus(uid);
};
</script>
<style scoped>
.sl {
  text-align: left;
}

.tableComponent {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: max-content;
}
.header {
  font-weight: bold;
  font-size: 15px;
  margin-bottom: 5px;
}
</style>