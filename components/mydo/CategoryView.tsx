import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { readAllTasksInParent } from "@/db/db";
import TaskView from "./TaskView";
import CategoryContextMenu from "./CategoryContextMenu";
import AddTaskDialogBox from "./AddTaskDialogBox";

export default function CategoryView(props: {
  id: number;
  name: string;
  roll: boolean;
}) {
  const { data } = useQuery({
    queryKey: ["task", `${props.id}`],
    queryFn: () => readAllTasksInParent(props.id),
    staleTime: Infinity,
  });

  return (
    <Accordion
      type="single"
      collapsible
      className="mb-4"
      defaultValue={props.roll ? "item-1" : "none"}
    >
      <AccordionItem value="item-1">
        <CategoryContextMenu id={props.id}>
          <AccordionTrigger>
            {props.name}
            <Link
              href={`/mydo/${props.id ?? -1}`}
              className="ml-auto"
              prefetch={false}
            >
              <ExternalLink className="h-4" />
            </Link>
          </AccordionTrigger>
        </CategoryContextMenu>
        <AccordionContent>
          {data?.map((item) => (
            <TaskView
              key={item.id ?? -1}
              id={item.id ?? -1}
              name={item.name}
              status={item.status}
              parent={item.parent}
            />
          ))}
          <AddTaskDialogBox id={props.id}>
            <p className="pl-4 hover:cursor-pointer">+ Add Task...</p>
          </AddTaskDialogBox>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
