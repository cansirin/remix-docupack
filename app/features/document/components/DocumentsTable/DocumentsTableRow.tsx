import type { FC } from "react";
import React, { useState } from "react";
import type { TDocument } from "~/models/document.server";
import { Link } from "@remix-run/react";
import { TableBall, TableCell } from "~/ui-library/Table";
import { Box, GappedBox } from "~/ui-library";
import { parseISOTime } from "../../../../../utils/parseISOTime";
import useInterval from "~/features/useInterval";
import { UserDropdown } from "~/ui-library/UserDropdown";

type Props = {
  document: TDocument;
};

export const DocumentsTableRow: FC<Props> = ({ document }) => {
  const [updatedAt, setUpdatedAt] = useState(
    parseISOTime(document.updatedAt.toString())
  );

  useInterval(() => {
    setUpdatedAt(parseISOTime(document.updatedAt.toString()));
  }, 1000);

  return (
    <tr key={document.id}>
      <TableCell>
        <GappedBox
          css={{ flexDirection: "row", alignItems: "center", gap: 10 }}
        >
          <TableBall />
          <Link to={`/documents/${document.id}`}>
            <span>{document.name}</span>
            <div className="text-sm text-gray-500">{document.description}</div>
          </Link>
        </GappedBox>
      </TableCell>
      <TableCell>
        <Box>
          <GappedBox>{document.type}</GappedBox>
        </Box>
      </TableCell>
      <TableCell css={{ width: "%16", textAlign: "right" }}>
        {updatedAt}
      </TableCell>
      <td className="pr-6 ">
        {/*<DocumentRowMenu document={document} />*/}
        <UserDropdown login="Can Sirin" />
      </td>
    </tr>
  );
};
