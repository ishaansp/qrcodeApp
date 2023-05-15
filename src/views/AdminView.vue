<template>
  <hr />
  <h1>Admin Portal</h1>
  <Teleport v-if="status" to="body"
    ><ToastComponent :message="message"
  /></Teleport>
  <div class="forms">
    <FormComponent
      v-model:submit="insertCompound"
      v-model:values="compoundNo"
      btn="Add"
      heading="Create Compound"
    />
    <FormComponent
      v-model:submit="insertMachine"
      v-model:values="machineNo"
      btn="Add"
      heading="Create Machine"
    />
    <FormComponent
      v-model:submit="insertMould"
      v-model:values="mouldNo"
      btn="Add"
      heading="Create Mould"
    />
  </div>
  <hr />
  <div class="recipeSection">
    <p class="heading">Make a recipe</p>
    <form class="recipe" @submit.prevent="insertRecipe">
      <div class="labels">
        <label for="recipe">Recipe Number: </label>
        <input
          type="text"
          id="recipe"
          class="input"
          v-model="recipe.recipeNo"
        />
      </div>
      <div class="labels">
        <label for="machineTemperature">Machine Temperature: </label
        ><input
          type="text"
          id="machineTemperature"
          class="input"
          v-model="recipe.machineTemp"
        />
      </div>
      <div class="labels">
        <label for="machinePressure">Machine Pressure: </label
        ><input
          type="text"
          id="machinePressure"
          v-model="recipe.machinePressure"
          class="input"
        />
      </div>
      <div class="labels">
        <label for="noOfCavities">No .of Cavities / Mould: </label
        ><input
          type="text"
          id="noOfCavities"
          class="input"
          v-model="recipe.noOfCavities"
        />
      </div>
      <div class="labels">
        <label for="mouldNo">Mould No: </label
        ><select id="mouldNo" v-model="recipe.mouldNo" class="input" required>
          <option v-for="data in moulds" :key="data.id" :value="data.mouldNo">
            {{ data.mouldNo }}
          </option>
        </select>
      </div>
      <div class="labels">
        <label for="compoundNo">Compound No: </label
        ><select
          id="compoundNo"
          v-model="recipe.compoundNo"
          class="input"
          required
        >
          <option
            v-for="data in compounds"
            :key="data.id"
            :value="data.compoundNo"
          >
            {{ data.compoundNo }}
          </option>
        </select>
      </div>
      <button type="submit" class="btn btn-success">Submit</button>
    </form>
  </div>
  <div class="recipeSection">
    <hr />
    <form class="recipe" @submit.prevent="addPostProduction">
      <p class="heading">Post Production</p>
      <div class="labels">
        <label for="recipe" class="recipe">Select Recipe : </label>
        <select id="recipe" class="input" v-model="selectedRecipe" required>
          <option v-for="data in recipes" :key="data.id" :value="data.id">
            {{ data.recipeNo }}
          </option>
        </select>
      </div>
      <div class="labels">
        <label for="visualInspection">Visual Inspection</label>
        <input
          type="checkbox"
          id="visualInspection"
          class="input"
          v-model="postProduction.visualInspection"
        />
      </div>
      <div class="labels">
        <label for="cleaning">Cleaning</label>
        <input
          type="checkbox"
          id="cleaning"
          class="input"
          v-model="postProduction.cleaning"
        />
      </div>
      <div class="labels">
        <label for="leakTesting"> Leak Testing</label>
        <input
          type="checkbox"
          id="leakTesting"
          class="input"
          v-model="postProduction.leakTesting"
        />
      </div>
      <button type="submit" class="btn btn-success">Add</button>
    </form>
  </div>
  <hr />
  <p class="heading">Edit/update</p>
  <hr />
  <p class="heading">All details</p>
  <div class="tables">
    <TableComponent
      type="compound"
      :data="compounds"
      :header="compoundHeaders"
    />
    <TableComponent type="mould" :data="moulds" :header="mouldHeaders" />
    <TableComponent type="machine" :data="machines" :header="machineHeaders" />
    <TableComponent type="recipe" :data="recipes" :header="recipeHeaders" />
  </div>
  <hr />
</template>

<script setup>
import { ref, watch } from "vue";
import { useStore } from "../store/store";
import { uuid } from "vue3-uuid";
import TableComponent from "@/components/TableComponent.vue";
import FormComponent from "@/components/FormComponent.vue";
import ToastComponent from "@/components/ToastComponent.vue";

const store = useStore();
const compoundNo = ref("");
const machineNo = ref("");
const mouldNo = ref("");
const recipe = ref({});
const status = ref(false);
const message = ref("");
const postProduction = ref({});
const selectedRecipe = ref("");

let mouldHeaders = ["Sl.no", "Moulds"];
let compoundHeaders = ["Sl.no", "Compounds"];
let machineHeaders = ["Sl.no", "Machines"];
let recipeHeaders = [
  "Sl.no",
  "Recipe Number",
  "Machine Temperature",
  "Machine Pressure",
  "No .of cavities / Mould",
  "Post Production",
  "Mould Number",
  "Compound Number",
];

const moulds = ref(store.getMouldsList);
const compounds = ref(store.getCompoundsList);
const machines = ref(store.getMachinesList);
const recipes = ref(store.getRecipesList);

const insertCompound = () => {
  let data = { id: uuid.v1(), compoundNo: compoundNo.value };
  store.addCompound(data);
  compoundNo.value = "";
  status.value = true;
  message.value = "Compound created";
};
const insertMachine = () => {
  let data = { id: uuid.v1(), machineNo: machineNo.value };
  store.addMachine(data);
  machineNo.value = "";
  status.value = true;
  message.value = "Machine created";
};
const insertMould = () => {
  let data = { id: uuid.v1(), mouldNo: mouldNo.value };
  store.addMould(data);
  mouldNo.value = "";
  status.value = true;
  message.value = "Mould created";
};
const insertRecipe = () => {
  let data = { id: uuid.v1(), ...recipe.value };
  store.addRecipe(data);
  recipe.value = {};
  status.value = true;
  message.value = "Recipe created";
};

const addPostProduction = () => {
  store.addPostProduction(selectedRecipe.value, postProduction.value);
  selectedRecipe.value = "";
  postProduction.value = "";
  status.value = true;
  message.value = "Created post-production requirements";
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
.forms {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.recipe {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.tables {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
}
.heading {
  font-weight: bold;
  font-size: 20px;
}
.recipe {
  gap: 5px;
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