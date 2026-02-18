import { Checkbox } from "@/components/ui/checkbox";
import { Trash, Pencil } from "lucide-react";
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
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteTaskById,
  updateTaskNameById,
  updateTaskStatusById,
} from "@/db/db";
import { useRef } from "react";

export default function Task(props: {
  id: number;
  name: string;
  status: boolean;
  parent: number;
}) {
  const queryClient = useQueryClient();
  const inp = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);

  const { mutate: updateStatus } = useMutation({
    mutationFn: () => {
      return updateTaskStatusById(props.id, !props.status);
    },
    mutationKey: ["task", `${props.parent}`],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task", `${props.parent}`],
      });
    },
  });

  const { mutate: updateName } = useMutation({
    mutationFn: () => {
      if (inp.current) {
        if (inp.current.value !== "") {
          return updateTaskNameById(props.id, inp.current.value);
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.reject();
      }
    },
    mutationKey: ["task", `${props.parent}`],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task", `${props.parent}`],
      });
    },
  });

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
    <div className="m-4 flex items-center space-x-2">
      {props.status ? (
        <Checkbox
          id={(props.id ?? -1).toString()}
          onCheckedChange={() => updateStatus()}
          defaultChecked
        />
      ) : (
        <Checkbox
          id={(props.id ?? -1).toString()}
          onCheckedChange={() => updateStatus()}
        />
      )}
      <Label className="font-normal" htmlFor={(props.id ?? -1).toString()}>
        {props.name}
      </Label>
      <Dialog>
        <DialogTrigger asChild>
          <Pencil className="ml-auto h-4" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          <Label>Name</Label>
          <Input
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                button.current?.click();
                updateName();
              }
            }}
            ref={inp}
            defaultValue={props.name}
          />
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex gap-2">
                <Button
                  ref={button}
                  onClick={() => updateName()}
                  className="ml-auto"
                >
                  Save changes
                </Button>{" "}
                <Button
                  variant={"neutral"}
                  onClick={() => {
                    window.confirm("This action cannot be undone");
                    deleteTask();
                  }}
                >
                  <Trash />
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
