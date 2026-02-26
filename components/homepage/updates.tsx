import { Collapsible } from "@/components/ui/collapsible";

export default function Updates() {
  return (
    <Collapsible open={true} className="space-y-2">
      <div className="rounded-base flex items-center justify-between space-x-4 border-2 border-border text-main-foreground bg-main px-4 py-2">
        <h4 className="text-sm font-heading">Updates & Upcoming features</h4>
      </div>
      <div className="rounded-base border-2 border-border bg-main px-4 py-3 font-mono font-base text-main-foreground text-sm">
        Making the app actually local only
      </div>
      <div className="rounded-base border-2 border-border bg-main px-4 py-3 font-mono text-sm">
        My socials in settings
      </div>
      <div className="rounded-base border-2 border-border bg-main px-4 py-3 font-mono text-sm">
        Confirmation box for deleting tasks and categories
      </div>
      <div className="rounded-base border-2 border-border bg-main px-4 py-3 font-mono text-sm">
        Local version with Electron for Desktop and &quot;I don&apos;t know
        anything for this yet&quot; for Android.
      </div>
    </Collapsible>
  );
}
