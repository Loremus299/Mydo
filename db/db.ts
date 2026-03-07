import { Table, Dexie } from "dexie";

export interface taskType {
  id?: number;
  name: string;
  status: boolean;
  parent: number;
}

export interface categoryType {
  id?: number;
  name: string;
  pinned: boolean;
}

const db = new Dexie("Mydo");
db.version(1).stores({
  task: "++id, name, status, parent",
  category: "++id, name, pinned",
});

const taskTable: Table<taskType> = db.table("task");
const categoryTable: Table<categoryType> = db.table("category");

export async function allData() {
  return {
    cats: await categoryTable.toArray(),
    tasks: await taskTable.toArray(),
  };
}

export async function importData(arg: {
  cats: categoryType[];
  tasks: taskType[];
}) {
  db.delete({ disableAutoOpen: false });
  categoryTable.bulkPut(arg.cats);
  taskTable.bulkPut(arg.tasks);
}

export async function deleteData() {
  db.delete({ disableAutoOpen: false });
}

export async function createCategory(name: string) {
  await categoryTable.add({
    name: name,
    pinned: false,
  });
}

export async function readCategoryById(id: number) {
  const d = await categoryTable.where("id").equals(id).first();
  if (d == undefined) {
    return Promise.reject();
  }
  return Promise.resolve(d);
}

export async function readAllCategories() {
  return await categoryTable.toArray();
}

export async function updateCategoryNameById(id: number, name: string) {
  await categoryTable.where("id").equals(id).modify({ name: name });
}

export async function updateCategoryPinById(id: number, pin: boolean) {
  await categoryTable.where("id").equals(id).modify({ pinned: pin });
}

export async function deleteCategoryById(id: number) {
  await categoryTable.where("id").equals(id).delete();
}

export async function createTaskInParent(parentID: number, name: string) {
  await taskTable.add({
    name: name,
    status: false,
    parent: parentID,
  });
}

export async function readAllTasksInParent(parentID: number) {
  return await taskTable.where("parent").equals(parentID).toArray();
}

export async function updateTaskStatusById(id: number, status: boolean) {
  await taskTable.where("id").equals(id).modify({ status: status });
}

export async function updateTaskNameById(id: number, name: string) {
  await taskTable.where("id").equals(id).modify({ name: name });
}

export async function deleteTaskById(id: number) {
  await taskTable.where("id").equals(id).delete();
}

export async function deleteTaskByParentID(parentID: number) {
  await taskTable.where("parent").equals(parentID).delete();
}

export async function getTheme() {
  return {
    color: localStorage.getItem("color"),
    vs: localStorage.getItem("vs"),
    hs: localStorage.getItem("hs"),
  };
}

export async function setTheme(args: {
  color: string;
  vs: string;
  hs: string;
}) {
  localStorage.setItem("color", args.color);
  localStorage.setItem("vs", args.vs);
  localStorage.setItem("hs", args.hs);
}

export async function setOrder(val: string) {
  localStorage.setItem("order", val);
}

export async function getOrder() {
  const val = localStorage.getItem("order");
  if (val) {
    return val;
  } else {
    setOrder("creation");
    return "creation";
  }
}
