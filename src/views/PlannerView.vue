<template>
  <hr />
  <h1>Planner Portal</h1>
  <hr />
  <Teleport v-if="status" to="body"
    ><ToastComponent :message="message"
  /></Teleport>
  <p class="heading">Make a Plan</p>
  <form class="insertPlan" @submit.prevent="insertPlan">
    <div class="labels">
      <label for="machine" class="machine">Select Machine: </label
      ><select id="machine" class="input" v-model="selectedMachine" required>
        <option v-for="data in machines" :key="data.id" :value="data.id">
          {{ data.machineNo }}
        </option>
      </select>
    </div>
    <div class="labels">
      <label for="recipe" class="recipe">Select Recipe/ Compound: </label>
      <select id="recipe" class="input" v-model="selectedRecipe" required>
        <option v-for="data in recipes" :key="data.id" :value="data.id">
          {{ data.recipeNo }}/{{ data.compoundNo }}
        </option>
      </select>
    </div>
    <button type="submit" class="btn btn-success">Submit</button>
  </form>
  <hr />
  <div v-if="data" class="heading">QRCode</div>
  <QrGenerator :data="data" name="PlannerQRCode" />
  <hr />
</template>

<script setup>
import { ref, watch } from "vue";
import { uuid } from "vue3-uuid";
import { useStore } from "../store/store";
import QrGenerator from "@/components/QrGenerator.vue";
import ToastComponent from "@/components/ToastComponent.vue";

const store = useStore();
const selectedMachine = ref("");
const selectedRecipe = ref("");
const status = ref(false);
const message = ref("");

const machines = ref(store.getMachinesList);
const recipes = ref(store.getRecipesList);

const data = ref("");
const insertPlan = () => {
  status.value = false;
  const machine = machines.value.find((it) => it.id === selectedMachine.value);
  const recipe = recipes.value.find((it) => it.id === selectedRecipe.value);
  selectedMachine.value = "";
  selectedRecipe.value = "";
  data.value = {
    ...machine,
    ...recipe,
    machineId: machine.id,
    recipeId: recipe.id,
    id: uuid.v1(),
    qrImg: "temporary",
  };
  store.addPlannerList(data.value);
  status.value = true;
  message.value = "Plan Created";
};
watch(
  () => status.value,
  () => {
    setTimeout(() => {
      if (status.value) {
        status.value = false;
      }
    }, 5000);
  }
);
</script>

<style scoped>
.insertPlan {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}
.heading {
  font-weight: 600;
  font-size: 20px;
}
.input {
  width: 100px;
}
.labels {
  display: flex;
  justify-content: space-between;
  width: 300px;
}
</style>