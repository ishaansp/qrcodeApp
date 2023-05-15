export const onDecode = (data) => {
  let objectData =
    data[0] == "[" || data[0] == "{"
      ? { object: true, value: JSON.parse(data) }
      : { object: false, value: data };
  let temp = Object.keys(objectData.value);
  let type = temp.includes("machineId")
    ? "planner"
    : temp.includes("jobNo")
    ? "product"
    : temp.includes("recipeNo")
    ? "recipe"
    : temp.includes("mouldNo")
    ? "mould"
    : temp.includes("compoundNo")
    ? "compound"
    : "";
  return { ...objectData, type: type };
};
