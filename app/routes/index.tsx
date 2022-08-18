import { json, LoaderFunction } from "@remix-run/node";
import { requireUserId } from "~/session.server";
import { getDocumentListItems, TDocument } from "~/models/document.server";
import { useLoaderData } from "@remix-run/react";
import { DocumentsTable } from "~/features/document";
import { CenteredContainer } from "~/ui-library";

type LoaderData = {
  documents: TDocument[];
};

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await requireUserId(request);

  const documents = await getDocumentListItems({ userId });

  return json<LoaderData>({ documents });
};

export default function Index() {
  const data = useLoaderData();
  const { documents } = data as unknown as LoaderData;

  return (
    <CenteredContainer>
      {/*<PinnedDocuments />*/}

      {/* Projects list (only on smallest breakpoint) */}
      {/*<DocumentsList documents={data.documents} />*/}
      {/* Projects table (small breakpoint and up) */}
      {documents.length != 0 && <DocumentsTable documents={documents} />}
      {/*{templates.length != 0 && <TemplatesTable templates={templates} />}*/}
      {/*{packs.length != 0 && <PackagesTable packages={packs} />}*/}
    </CenteredContainer>
  );
}
