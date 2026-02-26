"use client";
import Parent from "@/components/mydo/Parent";
import syncSendData from "@/db/sync";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    const info = localStorage.getItem("sync");
    if (info && info == "1") {
      syncSendData();
    }
  }, []);
  return <Parent />;
}
