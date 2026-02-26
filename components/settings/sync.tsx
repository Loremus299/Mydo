import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Switch } from "../ui/switch";

export default function Sync() {
  const SwitchFunction = () => {
    const info = localStorage.getItem("sync");
    if (info && info == "1") {
      return (
        <>
          <Switch
            name="id"
            defaultChecked
            onCheckedChange={(event) => {
              localStorage.setItem("sync", event ? "1" : "0");
            }}
          />
        </>
      );
    } else {
      return (
        <Switch
          name="id"
          onCheckedChange={(event) => {
            localStorage.setItem("sync", event ? "1" : "0");
          }}
        />
      );
    }
  };
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sync with MyMap</CardTitle>
        <CardDescription>
          Automatically syncs your categories with mymaps whenever you change
          category.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-2">
        {SwitchFunction()}
      </CardContent>
    </Card>
  );
}
