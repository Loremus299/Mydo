import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen grid place-items-center p-8">
      <div className="flex gap-8 portrait:flex-col items-center justify-center">
        <div>
          <Image
            src={"/mydo.png"}
            width={500}
            height={500}
            alt="logo"
            className="w-[25vw]"
          />
        </div>
        <div className="grid gap-2 place-items-center">
          <h1 className="text-4xl text-center">CATEGORY NOT FOUND</h1>
          <p>Todo: Create a category with this ID.</p>
        </div>
      </div>
    </div>
  );
}
