"use client";
import { readAllCategories, readAllTasksInParent } from "@/db/db";
import { useQuery } from "@tanstack/react-query";
import CategoryTitle from "./CategoryTitle";
import AddTask from "./AddTask";
import Task from "./Task";
import HomeButton from "./HomeButton";
import { notFound } from "next/navigation";

export default function Parent(props: { input: number }) {
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: readAllCategories,
    staleTime: Infinity,
  });

  const { data: taskData } = useQuery({
    queryKey: ["task", `${props.input}`],
    queryFn: () => readAllTasksInParent(props.input),
    staleTime: Infinity,
  });

  if (data == undefined) {
    notFound();
  }

  return (
    <div className="m-4">
      <div className="mb-8">
        <CategoryTitle
          id={data?.filter((item) => item.id == props.input)[0].id ?? -1}
          name={data?.filter((item) => item.id == props.input)[0].name ?? ""}
          roll={
            data?.filter((item) => item.id == props.input)[0].pinned ?? false
          }
        />
      </div>
      {taskData?.map((item) => (
        <Task
          parent={props.input}
          id={item.id ?? -1}
          name={item.name}
          status={item.status}
          key={item.id ?? -1}
        />
      ))}
      <AddTask parentID={props.input} />
      <HomeButton />
    </div>
  );
}
