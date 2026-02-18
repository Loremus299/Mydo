import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Why() {
  return (
    <div className="grid grid-cols-2 grid-rows-2 portrait:grid-cols-1 portrait:grid-rows-4 min-h-screen landscape:p-8">
      <Card className="rounded-none hover:bg-main duration-300">
        <CardHeader>
          <CardTitle>Category Based</CardTitle>
        </CardHeader>
        <CardContent>
          There are multiple things going on in our lives simultaneously, the
          idea of having a simple checklist works but doesn&apos;t hold up as
          our checklist grows big and complex consisting of everything from work
          related tasks to personal goals and hobbies, the list becomes un
          manageable Categories add a lot of organization compared to a single
          checklist without adding much to complexity allowing you to manage
          many things at once :3
        </CardContent>
      </Card>
      <Card className="rounded-none hover:bg-main duration-300">
        <CardHeader>
          <CardTitle>Local First</CardTitle>
        </CardHeader>
        <CardContent>
          <strong>
            Note: The app is not local first rn, I am still working on it and it
            requires access to internet to fetch some React components even for
            PWA.
          </strong>{" "}
          Local first allows the app to be used anywhere with or without
          internet connection making it easier to manage work and accessibility
          and management when I am in low or no internet connection areas.
        </CardContent>
      </Card>
      <Card className="rounded-none hover:bg-main duration-300">
        <CardHeader>
          <CardTitle>Privacy First</CardTitle>
        </CardHeader>
        <CardContent>
          People put a lot of personal and important things in their to do
          lists, information that shouldn&apos;t be tracked or stored in some
          remote server by a corporation to be used for
          &quot;Personalization&quot; (Advertising & AI training) Mydo uses
          IndexedDB to store your tasks in your browser, not tracked or stored
          in some unknown remote server halfway across the world to be trained
          on by blackbox algorithms to advertise to you.
        </CardContent>
      </Card>
      <Card className="rounded-none hover:bg-main duration-300 portrait:h-min">
        <CardHeader>
          <CardTitle>Open Source</CardTitle>
        </CardHeader>
        <CardContent>
          The project is based on what I used prior to it &quot;Google
          Keep&quot; as I de-Googled my life I ran into issue where I
          couldn&apos;t find any functionally similar app to it so I made it
          myself and made it FOSS :3
        </CardContent>
      </Card>
    </div>
  );
}
