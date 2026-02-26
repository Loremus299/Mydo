import Image from "next/image";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";

export default function NavBar() {
  return (
    <Card className="absolute w-full portrait:w-full top-0 left-0 rounded-none">
      <CardContent>
        <div></div>
        <nav className="flex landscape:space-x-6 items-center portrait:flex-col portrait:items-start portrait:space-y-2">
          <Image src={"/mydo.png"} width={32} height={32} alt="logo"></Image>
          <div className="w-1 landscape:h-8 bg-black border-0"></div>
          <Link href={"/"}>Home</Link>
          <Link href={"/#why"}>Why</Link>
          <Link href={"/#updates"}>Updates</Link>
          <Link href={"/#legal"}>License</Link>
        </nav>
      </CardContent>
    </Card>
  );
}
