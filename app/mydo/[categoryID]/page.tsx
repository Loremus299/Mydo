import Parent from "@/components/[categoryID]/Parent";

export default async function Page(params: {
  params: Promise<{ categoryID: string }>;
}) {
  const param = await params.params;
  const categoryID = parseInt(param.categoryID);

  return (
    <>
      <Parent input={categoryID} />
    </>
  );
}
