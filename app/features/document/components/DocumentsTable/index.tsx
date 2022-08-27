import type { FC } from "react";
import type { TDocument } from "~/models/document.server";
import React, { useState } from "react";
import { DocumentsTableRow } from "./DocumentsTableRow";
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from "~/ui-library/Table";
import { Button, GappedBox, Link } from "~/ui-library";

type Props = {
  documents: TDocument[];
};

export const DocumentsTable: FC<Props> = ({ documents }) => {
  // const [deleteDocument] = useDeleteDocument();
  const [allDocuments] = useState(documents);
  const [modalState, setModalState] = useState({
    isOpen: false,
    documentId: null,
  });

  if (!allDocuments.length) {
    return <GappedBox>You don't have any document yet.</GappedBox>;
  }

  const refetch = async () => {
    // const refetched = await fetchDocuments(API);
    // setDocs(refetched);
  };

  const deleteAndRefetch = async (id: string) => {
    // await deleteDocument(id);
    await refetch();
  };

  const openDeleteModal = (id: string) => {
    // setModalState({ isOpen: true, documentId: id });
  };

  const closeDeleteModal = () => {
    setModalState({ isOpen: false, documentId: null });
  };

  const deleteDocText = {
    title: "Deleting a documents",
    message: "Do you really want to delete this documents of yours?",
  };

  return (
    <div className="sm:block">
      <GappedBox css={{ float: "right" }}>
        <Button variant="green" size="3" as={Link} to="/documents/new">
          Add new document
        </Button>
      </GappedBox>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHeaderCell>
              <span className="lg:pl-2">Documents</span>
            </TableHeaderCell>
            <TableHeaderCell>Type</TableHeaderCell>
            <TableHeaderCell css={{ width: "16%", textAlign: "right" }}>
              Last updated
            </TableHeaderCell>
            <TableHeaderCell css={{ width: "0", textAlign: "right" }} />
          </TableRow>
        </TableHeader>
        <TableBody>
          {allDocuments?.map((doc) => (
            <DocumentsTableRow key={doc.id} document={doc} />
          ))}
        </TableBody>
      </Table>
      {/*{allDocuments.length === 0 ? (*/}
      {/*  <EmptyState*/}
      {/*    message="You don't have any document yet."*/}
      {/*    link="/documents/new"*/}
      {/*    icon={<AddDocument />}*/}
      {/*  />*/}
      {/*) : (*/}
      {/*  ""*/}
      {/*)}*/}
    </div>
  );
};
