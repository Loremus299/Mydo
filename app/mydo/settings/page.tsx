"use client";
import { Button } from "@/components/ui/button";
import ThemeCard from "@/components/settings/themeCard";
import Export from "@/components/settings/export";
import Order from "@/components/settings/order";
import { Home } from "lucide-react";
import Link from "next/link";
import Counter from "@/components/settings/counter";
import Sync from "@/components/settings/sync";

export default function CardDemo() {
  return (
    <div className="portrait:columns-1 columns-2 md:columns-3 break-inside-avoid m-4">
      <div>
        <ThemeCard />
        <Order />
        <Sync />
        <Export />
        <Counter />
      </div>
      <Link href={"/mydo"} className="fixed bottom-4 right-4">
        <Button>
          <Home />
        </Button>
      </Link>
    </div>
  );
}
