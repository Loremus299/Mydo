"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { createTaskInParent } from "@/db/db";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { useRef } from "react";

export default function AddTaskDialogBox(props: {
  children: React.ReactNode;
  id: number;
}) {
  const taskName = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const client = useQueryClient();
  const { mutate: addTask } = useMutation({
    mutationKey: ["task", `${props.id}`],
    mutationFn: () => {
      createTaskInParent(props.id, taskName.current?.value as string);
      return Promise.resolve();
    },
    onSuccess: () =>
      client.invalidateQueries({ queryKey: ["task", `${props.id}`] }),
  });
  return (
    <Dialog>
      <DialogTrigger asChild>{props.children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="New task name"
          ref={taskName}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              button.current?.click();
            }
          }}
        />
        <DialogFooter>
          <DialogClose asChild>
            <div className="flex gap-2">
              <Button ref={button} onClick={() => addTask()}>
                Create Task
              </Button>
              <Button variant="neutral">Cancel</Button>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
