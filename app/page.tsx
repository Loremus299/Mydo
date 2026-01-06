import NavBar from "@/components/homepage/navbar";
import Acco from "@/components/homepage/acco";
import HeroText from "@/components/homepage/heroText";
import Why from "@/components/homepage/why";
import Updates from "@/components/homepage/updates";
import Image from "next/image";

export default function Page() {
  return (
    <div className="pl-4 pr-4 bg-neutral-200">
      <NavBar />
      <div className="min-h-screen flex items-center justify-evenly portrait:flex-col portrait:pt-60 bg-cha">
        <HeroText />
        <Acco />
      </div>
      <div id="why" className="portrait:pt-8">
        <Why />
      </div>
      <div id="updates" className="landscape:pr-8 landscape:pl-8 mb-8">
        <Updates />
      </div>
      <div className="landscape:pr-8 landscape:pl-8 pt-8 h-40">
        <div className="flex items-center gap-4">
          <Image
            src={"/mydo.png"}
            width={64}
            height={64}
            alt="logo"
            className="h-max"
          ></Image>
          <div id="legal">
            Gay Agenda License - 1.0 <br />
            Loremus 2025 <br />
            Be gay, do crimes.
          </div>
        </div>
      </div>
    </div>
  );
}
