"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteLinkAsTask } from "@/db/db";

export default function TaskLinkContextMenu(props: {
  children: React.ReactNode;
  from: number;
  parent: number;
}) {
  const client = useQueryClient();
  const { mutate: deleteLink } = useMutation({
    mutationKey: ["task", `${props.parent}`],
    mutationFn: () => deleteLinkAsTask(props.from),
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["task", `${props.parent}`] });
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
              deleteLink();
            }}
          >
            <Trash />
            Delete Link
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
