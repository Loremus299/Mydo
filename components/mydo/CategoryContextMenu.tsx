"use client";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Button } from "../ui/button";
import { ExternalLink, Trash } from "lucide-react";
import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteTaskByParentID, deleteCategoryById } from "@/db/db";

export default function CategoryContextMenu(props: {
  children: React.ReactNode;
  id: number;
}) {
  const queryClient = useQueryClient();
  const { mutate: deleteCategory } = useMutation({
    mutationFn: () => {
      deleteTaskByParentID(props.id);
      deleteCategoryById(props.id);
      return Promise.resolve();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return (
    <ContextMenu>
      <ContextMenuTrigger>{props.children}</ContextMenuTrigger>
      <ContextMenuContent className="w-64">
        <ContextMenuItem>
          <Link href={`/mydo/${props.id}`}>
            <Button variant={"noShadow"} className="border-none p-0">
              <ExternalLink />
              Navigate
            </Button>
          </Link>
        </ContextMenuItem>
        <ContextMenuItem>
          <Button
            variant={"noShadow"}
            className="border-none p-0"
            onClick={() => {
              window.confirm("This action cannot be undone");
              deleteCategory();
            }}
          >
            <Trash />
            Delete
          </Button>
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
