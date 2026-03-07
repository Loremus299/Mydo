import {
  deleteCategoryById,
  deleteTaskByParentID,
  updateCategoryNameById,
  updateCategoryPinById,
} from "@/db/db";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { Pencil, Trash, Pin, PinOff } from "lucide-react";
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
import { useRef } from "react";
import { useRouter } from "next/navigation";

export default function CategoryTitle(props: {
  id: number;
  name: string;
  roll: boolean;
}) {
  const inp = useRef<HTMLInputElement>(null);
  const button = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: updateName } = useMutation({
    mutationFn: () => {
      if (inp.current) {
        const newName = inp.current.value;
        if (newName !== "") {
          updateCategoryNameById(props.id, newName);
          return Promise.resolve();
        } else {
          return Promise.reject();
        }
      } else {
        return Promise.reject();
      }
    },
    mutationKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const { mutate: updateRoll } = useMutation({
    mutationFn: () => updateCategoryPinById(props.id, !props.roll),
    mutationKey: ["categories"],
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: () => {
      deleteTaskByParentID(props.id);
      deleteCategoryById(props.id);
      return Promise.resolve();
    },
    onSuccess: () => {
      router.push("/mydo");
      queryClient.invalidateQueries({
        queryKey: ["categories"],
      });
    },
  });

  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger asChild>
          <Pencil className="mt-1.5 mr-4" />
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Category Name</DialogTitle>
          </DialogHeader>
          <Input
            ref={inp}
            defaultValue={props.name}
            onKeyDown={(e) => {
              if (e.key == "Enter") {
                button.current?.click();
                updateName();
              }
            }}
          />
          <DialogFooter>
            <DialogClose asChild>
              <div className="flex gap-2">
                <Button
                  ref={button}
                  className="ml-auto"
                  onClick={() => updateName()}
                >
                  Save changes
                </Button>
                <Button variant="neutral">Cancel</Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <h1 className="text-3xl">{props.name}</h1>
      <div className="ml-auto">
        <Button
          variant={"noShadow"}
          className="bg-transparent border-none"
          onClick={() => updateRoll()}
        >
          {props.roll ? <PinOff /> : <Pin />}
        </Button>
        <Button
          variant="noShadow"
          onClick={() => {
            window.confirm("This action cannot be undone");
            deleteCategory();
          }}
          className="bg-transparent border-none"
        >
          <Trash />
        </Button>
      </div>
    </div>
  );
}
