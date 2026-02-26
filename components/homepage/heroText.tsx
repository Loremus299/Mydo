import { Button } from "../ui/button";
import Link from "next/link";

export default function HeroText() {
  return (
    <div className="w-1/2 portrait:w-full grid gap-2 portrait:mb-8">
      <h1 className="text-5xl">Mydo</h1>
      <p>
        Mydo is a category based , local first to do list I made mainly for
        myself :3 Simple checklists based on different categories and parts of
        your life. Don&apos;t overload yourself managing complex apps with
        multiple parts when all you need is a simple checklist.{" "}
      </p>
      <div className="flex gap-2 mt-4">
        <Link href={"/mydo"}>
          <Button>Get started</Button>
        </Link>
        <Link href={"/#why"}>
          <Button variant={"neutral"}>Tell me more</Button>
        </Link>
      </div>
    </div>
  );
}
