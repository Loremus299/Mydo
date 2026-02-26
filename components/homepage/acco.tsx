import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "../ui/checkbox";

export default function Acco() {
  return (
    <Accordion
      type="single"
      collapsible
      className="w-full max-w-xl"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>What is Mydo ?</AccordionTrigger>
        <AccordionContent>
          <div className="grid gap-4">
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked></Checkbox>
              Category Based
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked></Checkbox>
              Local First
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked></Checkbox>
              Privacy Focused
            </div>
            <div className="flex gap-2 items-center">
              <Checkbox defaultChecked></Checkbox>
              Open Source
            </div>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
