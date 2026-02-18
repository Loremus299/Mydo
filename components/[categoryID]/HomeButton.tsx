import { Button } from "../ui/button";
import Link from "next/link";
import { Home } from "lucide-react";

export default function HomeButton() {
  return (
    <div className="fixed bottom-4 right-4">
      <Link href={"/mydo"}>
        <Button>
          <Home />
        </Button>
      </Link>
    </div>
  );
}
