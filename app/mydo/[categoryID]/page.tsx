"use client";
import Parent from "@/components/[categoryID]/Parent";
import { useParams } from "next/navigation";

export default function Page() {
  const param = useParams<{ categoryID: string }>();
  const categoryID = parseInt(param.categoryID);

  return (
    <>
      <Parent input={categoryID} />
    </>
  );
}
