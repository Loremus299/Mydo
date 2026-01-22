import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  allData,
  categoryType,
  deleteData,
  importData,
  taskType,
} from "@/db/db";
import { useQueryClient } from "@tanstack/react-query";

export default function Export() {
  const client = useQueryClient();
  return (
    <Card className="w-full break-inside-avoid mb-4">
      <CardHeader>
        <CardTitle>Data management</CardTitle>
        <CardDescription>
          Export or import data as json, do not modify json on your own
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <Button
            onClick={() => {
              deleteData();
              client.invalidateQueries();
            }}
          >
            Clear data
          </Button>
          <Button
            onClick={async () => {
              const blob = new Blob(
                [JSON.stringify(await allData(), null, 2)],
                {
                  type: "application/json",
                }
              );
              const link = document.createElement("a");
              link.href = URL.createObjectURL(blob);
              link.download = "data.json";
              link.click();
              URL.revokeObjectURL(link.href);
            }}
          >
            Export
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onClick={() => {
                  const input = document.createElement("input");
                  input.type = "file";
                  input.click();
                  input.addEventListener("change", (event) => {
                    //@ts-expect-error "typescript, just shut up"
                    const file = event.target.files[0];
                    const reader = new FileReader();

                    reader.onload = function (e) {
                      const content = e.target?.result?.toString();
                      if (content !== undefined) {
                        const json: {
                          cats: categoryType[];
                          tasks: taskType[];
                        } = JSON.parse(content);
                        console.log(json);
                        importData(json);
                      }
                    };

                    reader.readAsText(file);
                    client.invalidateQueries();
                  });
                }}
              >
                Import
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Importing Data</AlertDialogTitle>
                <AlertDialogDescription>
                  Importing data from the given file, the current data will be
                  erased. If there was an error in parsing json. the data will
                  not be erased.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </CardContent>
    </Card>
  );
}
