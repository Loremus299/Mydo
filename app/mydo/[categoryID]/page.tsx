"use client";
import Parent from "@/components/[categoryID]/Parent";
import { useParams } from "next/navigation";

export default function Page() {
  const params = useParams<{ categoryID: string }>();
  const categoryID = params.categoryID;

  return (
    <>
      <Parent input={parseInt(categoryID)} />
    </>
  );
}
