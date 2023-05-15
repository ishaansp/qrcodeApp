import { defineStore } from "pinia";
import SecureLS from "secure-ls";

var ls = new SecureLS({ isCompression: false });
export const useStore = defineStore("store", {
  state: () => ({
    compoundList: [
      { id: 1, compoundNo: "1" },
      { id: 2, compoundNo: "2" },
    ],
    mouldList: [
      { id: 1, mouldNo: "1" },
      { id: 2, mouldNo: "2" },
    ],
    machineList: [
      { id: 1, machineNo: "1" },
      { id: 2, machineNo: "2" },
    ],
    recipesList: [],
    plannerList: [],
    productList: [],
  }),
  getters: {
    getCompoundsList: (state) => state.compoundList,
    getMouldsList: (state) => state.mouldList,
    getMachinesList: (state) => state.machineList,
    getRecipesList: (state) => state.recipesList,
    getPlannerList: (state) => state.plannerList,
    getProductList: (state) => state.productList,
    getProductionCompletedProductList: (state) => {
      return state.productList.filter((data) => data.isProductionCompleted);
    },
  },
  actions: {
    addCompound(newValue) {
      this.compoundList.push(newValue);
    },
    addMould(newValue) {
      this.mouldList.push(newValue);
    },

    addMachine(newValue) {
      this.machineList.push(newValue);
    },
    addRecipe(newValue) {
      this.recipesList.push(newValue);
    },
    addPlannerList(newValue) {
      this.plannerList.push(newValue);
    },
    addProductList(newValue) {
      this.productList.push(newValue);
    },
    addPostProduction(Id, newData) {
      this.recipesList.forEach((it) => {
        if (it.id === Id) {
          it.postProduction = { ...newData };
        }
      });
    },
    changeProductionStatus(Id) {
      this.productList.forEach((it) => {
        if (it.uid === Id) {
          it.isProductionCompleted = !it?.isProductionCompleted;
        }
      });
    },
    changePostProductionStatus(uid, key) {
      this.productList.forEach((it) => {
        if (it.uid === uid) {
          switch (key) {
            case "isVisualInspectionCompleted":
              if (it.postProduction?.isVisualInspectionCompleted) {
                it.postProduction.isVisualInspectionCompleted =
                  !it.postProduction.isVisualInspectionCompleted;
              } else {
                it.postProduction = {
                  ...it.postProduction,
                  isVisualInspectionCompleted: true,
                };
              }
              break;
            case "isLeakTestingCompleted":
              if (it.postProduction?.isLeakTestingCompleted) {
                it.postProduction.isLeakTestingCompleted =
                  !it.postProduction.isLeakTestingCompleted;
              } else {
                it.postProduction = {
                  ...it.postProduction,
                  isLeakTestingCompleted: true,
                };
              }
              break;
            case "isCleaningCompleted":
              if (it.postProduction?.isCleaningCompleted) {
                it.postProduction.isCleaningCompleted =
                  !it.postProduction.isCleaningCompleted;
              } else {
                it.postProduction = {
                  ...it.postProduction,
                  isCleaningCompleted: true,
                };
              }
              break;
            default:
              break;
          }
        }
      });
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        // storage: localStorage,
        storage: {
          getItem: (key) => ls.get(key),
          setItem: (key, value) => ls.set(key, value),
          removeItem: (key) => ls.remove(key),
        },
      },
    ],
  },
});
