import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ kategorie: string }>;
}) {
  const { kategorie } = await params;
  return (
    <>
      <div>{kategorie}</div>
    </>
  );
}
