import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { deleteLinkAsTask, readCategoryById } from "@/db/db";
import { Button } from "../ui/button";
import TaskLinkContextMenu from "./TaskLinkContextMenu";

export default function TaskLink(props: {
  id: number;
  name: string;
  status: boolean;
  parent: number;
}) {
  const from = props.id;
  const to = parseInt(props.name.substring(16));
  const { data: linkData, isError } = useQuery({
    queryKey: ["tasklink", `${from}`],
    queryFn: () => readCategoryById(to),
    staleTime: Infinity,
  });

  if (props.name.startsWith("NOTATASKBUTALINK")) {
    if (linkData) {
      return (
        <TaskLinkContextMenu from={from} parent={props.parent}>
          <Link href={`/mydo/${linkData?.id ?? -1}`} className="w-full">
            <Button variant={"noShadow"} className="w-full">
              {linkData?.name}
            </Button>
          </Link>
        </TaskLinkContextMenu>
      );
    } else if (isError) {
      deleteLinkAsTask(from);
    }
  }
}
