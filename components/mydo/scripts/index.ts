import { categoryType } from "@/db/db";

export default function sortCategories(array: categoryType[], method: string) {
  if (method == "alphabetical") {
    return sortAlphabetically(array);
  }
  if (method == "creation") {
    return creation(array);
  }
}

function sortAlphabetically(array: categoryType[]) {
  return array.sort((a, b) => {
    if (a.name.toLowerCase() < b.name.toLowerCase()) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  });
}

function creation(array: categoryType[]) {
  return array.sort((a, b) => {
    if ((a.id ?? -1) < (b.id ?? -1)) {
      return -1;
    }
    if ((a.id ?? -1) > (b.id ?? -1)) {
      return 1;
    } else {
      return 0;
    }
  });
}
