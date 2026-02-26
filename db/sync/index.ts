import { allData } from "../db";

export default async function syncSendData() {
  const data = JSON.stringify((await allData()).cats);
  window.parent.postMessage(data, "https://mymap.loremus.gay");
}
