import { DocumentsTable } from "~/features/document";
import React from "react";
import { json, LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getDocumentListItems } from "~/models/document.server";
import { useLoaderData } from "@remix-run/react";
import { GappedBox } from "~/ui-library";

type LoaderData = {
  documents: Awaited<ReturnType<typeof getDocumentListItems>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const documents = await getDocumentListItems({ userId });
  return json<LoaderData>({ documents });
};

const Documents = () => {
  const data = useLoaderData() as unknown as LoaderData;
  const { documents } = data;

  return (
    <GappedBox>
      <DocumentsTable documents={documents} />
    </GappedBox>
  );
};

export default Documents;
