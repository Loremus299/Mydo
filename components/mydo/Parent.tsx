import { useQuery } from "@tanstack/react-query";
import CategoryView from "./CategoryView";
import { getTheme, readAllCategories } from "@/db/db";
import AddCategory from "@/components/mydo/AddCategory";
import { Button } from "../ui/button";
import { Settings } from "lucide-react";
import Link from "next/link";

export default function Parent() {
  const { status, data } = useQuery({
    queryKey: ["categories"],
    queryFn: readAllCategories,
    staleTime: Infinity,
  });
  const { data: theme } = useQuery({
    queryKey: ["theme"],
    queryFn: getTheme,
    staleTime: Infinity,
  });

  if (theme) {
    document.body.style.setProperty(
      "--main",
      theme.color ?? "oklch(76.89% 0.139164 219.13);"
    );
    document.body.style.setProperty(
      "--shadow",
      `${theme.hs ?? 0}px ${theme.vs ?? 4}px 0px 0px var(--border)`
    );
  }

  if (status == "pending") return <div>loading</div>;
  if (status == "error") return <div>Error</div>;

  return (
    <div className="portrait:columns-1 columns-2 md:columns-3 break-avoid m-4">
      {data.map((item) => (
        <CategoryView
          id={item.id ?? -1}
          key={item.id ?? -1}
          name={item.name}
          roll={item.pinned}
        />
      ))}
      <AddCategory />
      <Link className="fixed right-4 bottom-4" href={"/mydo/settings"}>
        <Button>
          <Settings />
        </Button>
      </Link>
    </div>
  );
}
