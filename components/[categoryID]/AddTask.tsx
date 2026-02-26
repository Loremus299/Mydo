import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTaskInParent } from "@/db/db";
import { useRef } from "react";

export default function AddTask(props: { parentID: number }) {
  const inp = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const { mutate: createName } = useMutation({
    mutationFn: () => {
      if (inp.current) {
        if (inp.current.value !== "") {
          createTaskInParent(props.parentID, inp.current.value);
          inp.current.value = "";
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.reject();
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["task", `${props.parentID}`],
      });
    },
  });

  return (
    <div className="flex mt-4 gap-4">
      <Button
        onClick={() => {
          createName();
        }}
      >
        <CirclePlus />
      </Button>
      <Input
        placeholder="new task"
        ref={inp}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            createName();
          }
        }}
      />
    </div>
  );
}
