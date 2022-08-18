import { ChevronRightIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { Badge } from "../../../../components";
import { Document } from "../../types";
import { cx } from "../../../../../utils/cx";
import { Color } from "../../../../../utils/color";

type Props = {
  documents: Document[];
};

const DocumentsList: FC<Props> = ({ documents }) => {
  return (
    <div className="mt-10 sm:hidden">
      <div className="px-4 sm:px-6">
        <h2 className="text-xs font-medium uppercase tracking-wide text-gray-500">
          Documents
        </h2>
      </div>
      <ul className="mt-3 divide-y divide-gray-100 border-t border-gray-200">
        {documents.map((doc) => (
          <li key={doc.id}>
            <a
              href="#"
              className="group flex items-center justify-between px-4 py-4 hover:bg-gray-50 sm:px-6"
            >
              <span className="flex items-center space-x-3 truncate">
                <span
                  className={cx(
                    "h-2.5 w-2.5 flex-shrink-0 rounded-full bg-purple-600"
                  )}
                  aria-hidden="true"
                />
                <span className="truncate text-sm font-medium leading-6">
                  {doc.name}
                </span>
              </span>
              <Badge size="sm" bgColor={Color.Purple} textColor={Color.Gray}>
                {doc.type}
              </Badge>
              <ChevronRightIcon
                className="ml-4 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                aria-hidden="true"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DocumentsList;
