"use client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { createCategory } from "@/db/db";
import { useRef } from "react";
import { CirclePlus } from "lucide-react";
import { Home } from "lucide-react";
import Link from "next/link";
import { useQueryClient } from "@tanstack/react-query";

export default function AddCategory() {
  const client = useQueryClient();
  const inp = useRef<HTMLInputElement>(null);

  const createCategoryInDB = () => {
    if (inp.current) {
      const term = inp.current.value;
      if (term !== "") {
        createCategory(term);
        client.invalidateQueries({ queryKey: ["categories"] });
        inp.current.value = "";
      }
    }
  };

  return (
    <div>
      <Input
        className="mb-4"
        ref={inp}
        placeholder="Category Name"
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            createCategoryInDB();
          }
        }}
      />
      <Button className="w-full" onClick={createCategoryInDB}>
        <CirclePlus />
        Add Category
      </Button>
      <div className="fixed bottom-4 right-4">
        <Link href={"/mydo"}>
          <Button>
            <Home />
          </Button>
        </Link>
      </div>
    </div>
  );
}
