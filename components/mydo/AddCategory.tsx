import Link from "next/link";
import { Button } from "../ui/button";
import { CirclePlus } from "lucide-react";

export default function AddCategory() {
  return (
    <Link href={"/mydo/add-category"}>
      <Button className="w-full">
        <CirclePlus />
        Add Category
      </Button>
    </Link>
  );
}
