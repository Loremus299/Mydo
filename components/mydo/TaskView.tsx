import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTaskStatusById } from "@/db/db";
import TaskContextMenu from "./TaskContextMenu";

export default function TaskView(props: {
  id: number;
  name: string;
  status: boolean;
  parent: number;
}) {
  const queryClient = useQueryClient();
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
  if (!props.name.startsWith("NOTATASKBUTALINK")) {
    return (
      <TaskContextMenu
        id={props.id}
        parent={props.parent}
        status={props.status}
      >
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
        </div>
      </TaskContextMenu>
    );
  }
}
