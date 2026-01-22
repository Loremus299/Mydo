import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { setTheme } from "@/db/db";
import { useQueryClient } from "@tanstack/react-query";

export default function ThemeCard() {
  const client = useQueryClient();

  const changeTheme = (e: HTMLFormElement) => {
    const data = new FormData(e);
    const color = data.get("color") as string;
    const hs = data.get("hs") as string;
    const vs = data.get("vs") as string;
    setTheme({ color: color, hs: hs, vs: vs });
    client.invalidateQueries({ queryKey: ["theme"] });
    document.body.style.setProperty("--main", color);
    document.body.style.setProperty(
      "--shadow",
      `${hs}px ${vs}px 0px 0px var(--border)`
    );
  };
  return (
    <Card className="w-full break-inside-avoid mb-4">
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>Customize your theme</CardDescription>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changeTheme(e.currentTarget);
          }}
        >
          <div className="flex flex-col gap-4">
            <div className="grid gap-2">
              <p>Color</p>
              <Select name="color" required>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select primary color" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="oklch(67.28% 0.2147 24.22)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#FF6669]"></div>
                      Red
                    </SelectItem>
                    <SelectItem value="oklch(84.08% 0.1725 84.2)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#FFBF00]"></div>
                      Amber
                    </SelectItem>
                    <SelectItem value="oklch(83.29% 0.2331 132.51)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#7ACC00]"></div>
                      Lime
                    </SelectItem>
                    <SelectItem value="oklch(77.54% 0.1681 162.78)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#00BD84]"></div>
                      Emerald
                    </SelectItem>
                    <SelectItem value="oklch(76.89% 0.139164 219.13)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#009DBD]"></div>
                      Cyan
                    </SelectItem>
                    <SelectItem value="oklch(67.47% 0.1726 259.49)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#5294FF]"></div>
                      Blue
                    </SelectItem>
                    <SelectItem value="oklch(66.34% 0.1806 277.2)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#7A83FF]"></div>
                      Indigo
                    </SelectItem>
                    <SelectItem value="oklch(70.28% 0.1753 295.36)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#A985FF]"></div>
                      Violet
                    </SelectItem>
                    <SelectItem value="oklch(71.9% 0.198 310.03)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#D494FF]"></div>
                      Purple
                    </SelectItem>
                    <SelectItem value="oklch(71.5% 0.197 354.23)">
                      <div className="w-4 h-4 border-black border-2 rounded-full bg-[#FB3290]"></div>
                      Pink
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <p>Shadow</p>
              <div className="flex gap-2">
                <Select name="vs" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vertical" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
                <Select name="hs" required>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Horizontal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="0">0</SelectItem>
                      <SelectItem value="2">2</SelectItem>
                      <SelectItem value="4">4</SelectItem>
                      <SelectItem value="6">6</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full mt-2">
                Apply
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
