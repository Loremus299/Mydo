import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { readAllCategories, createLinkInCategory } from "@/db/db";
import { Link2 } from "lucide-react";

export default function CreateLink(props: { from: number }) {
  const client = useQueryClient();
  const { data } = useQuery({
    queryKey: ["categories"],
    queryFn: readAllCategories,
    staleTime: Infinity,
  });

  const { mutate: createLinkInDB } = useMutation({
    mutationKey: ["task", `${props.from}`],
    mutationFn: (f: HTMLFormElement) => {
      const formdata = new FormData(f);
      const to = formdata.get("to") as string;
      return createLinkInCategory(props.from, parseInt(to));
    },
    onSuccess: () => {
      client.invalidateQueries({ queryKey: ["task", `${props.from}`] });
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Link2 />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Link</DialogTitle>
          <DialogDescription>
            Create a link to another category from this category
          </DialogDescription>
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            createLinkInDB(e.currentTarget);
          }}
          className="grid gap-4"
        >
          <Select name="to" required>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {data?.map((item) => (
                  <SelectItem
                    value={(item.id ?? -1).toString()}
                    key={item.id ?? -1}
                  >
                    {item.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button type="submit">Save changes</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
