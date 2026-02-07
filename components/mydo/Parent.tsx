import { useQuery } from "@tanstack/react-query";
import CategoryView from "./CategoryView";
import { getOrder, readAllCategories } from "@/db/db";
import AddCategory from "@/components/mydo/AddCategory";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";
import sortCategories from "./scripts";

export default function Parent() {
  const { status, data } = useQuery({
    queryKey: ["categories"],
    queryFn: readAllCategories,
    staleTime: Infinity,
  });

  const { data: order } = useQuery({
    queryKey: ["order"],
    queryFn: getOrder,
    staleTime: Infinity,
  });

  if (status == "pending") return <div>loading</div>;
  if (status == "error") return <div>Error</div>;

  const renderData = sortCategories(data, order ?? "creation");

  return (
    <div className="portrait:columns-1 columns-2 md:columns-3 break-avoid m-4">
      {renderData?.map((item) => (
        <CategoryView
          id={item.id ?? -1}
          key={item.id ?? -1}
          name={item.name}
          roll={item.pinned}
        />
      ))}
      <div className="grid gap-4">
        <AddCategory />
      </div>
      <Link className="fixed right-4 bottom-4" href={"/mydo/settings"}>
        <Button>
          <Settings />
        </Button>
      </Link>
    </div>
  );
}
