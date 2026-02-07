import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "../ui/button";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { deleteTaskById } from "@/db/db";
import { Trash } from "lucide-react";

export default function TaskContextMenu(props: {
  children: React.ReactNode;
  id: number;
  status: boolean;
  parent: number;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteTask } = useMutation({
    mutationFn: () => deleteTaskById(props.id),
    mutationKey: ["task", `${props.parent}`],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task", `${props.parent}`],
      });
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Button
            variant={"noShadow"}
            className="border-none p-0"
            onClick={() => {
              window.confirm("This action cannot be undone");
              deleteTask();
            }}
          >
            <Trash />
            Delete Task
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
