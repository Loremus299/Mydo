import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "../ui/button";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { GET, POST } from "@/db/server";

export default function Counter() {
  const queryClient = useQueryClient();

  const counter = useQuery({
    queryKey: ["userCount"],
    queryFn: GET,
    staleTime: Infinity,
  });

  const CountUp = () => {
    POST();
    queryClient.invalidateQueries({ queryKey: ["userCount"] });
  };
  return (
    <Card className="w-full break-inside-avoid mb-4">
      <CardHeader>
        <CardTitle>Make yourself count!</CardTitle>
        <CardDescription>
          hey :3 it really motivates me to see people using my app, if you are
          using this app. Just click the button below and{" "}
          <strong>make yourself count :3</strong>
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-2">
        <h4>{`Total users so far: ${counter.data?.value ?? "loading"}`}</h4>
        <Button className="w-full" onClick={CountUp}>
          Make yourself count
        </Button>
      </CardContent>
    </Card>
  );
}
