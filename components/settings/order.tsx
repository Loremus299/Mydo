import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/react-query";
import { setOrder } from "@/db/db";

export default function Order() {
  const client = useQueryClient();

  const changeOrder = (e: HTMLFormElement) => {
    const data = new FormData(e);
    const order = data.get("order") as string;
    setOrder(order);
    client.invalidateQueries({ queryKey: ["order"] });
  };
  return (
    <Card className="w-full break-inside-avoid mb-4">
      <CardHeader>
        <CardTitle>Layout</CardTitle>
        <CardDescription>
          Order to arrange categories on your board
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeOrder(e.currentTarget);
          }}
        >
          <div className="grid gap-2">
            <p>Method</p>
            <Select name="order" required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="alphabetical">Alphabetical</SelectItem>
                  <SelectItem value="creation">Order of creation</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button className="mt-4">Apply</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
