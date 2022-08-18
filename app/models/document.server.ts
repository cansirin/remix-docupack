import { User, Prisma } from "@prisma/client";

import { prisma } from "~/db.server";

const selectDocumentWithPacks = Prisma.validator<Prisma.DocumentArgs>()({
  include: {
    packs: {
      include: {
        owner: true,
      },
    },
  },
});

export type DocumentWithPacks = Prisma.DocumentGetPayload<
  typeof selectDocumentWithPacks
>;

const selectDocumentWithOwner = Prisma.validator<Prisma.DocumentArgs>()({
  include: {
    owner: true,
  },
});

export type DocumentWithOwner = Prisma.DocumentGetPayload<
  typeof selectDocumentWithOwner
>;

export type TDocument = DocumentWithPacks & DocumentWithOwner;

type UpdateDocumentArgs = {
  id: string;
  data: Partial<Omit<TDocument, "id">>;
};

export function updateDocument({ id, data }: UpdateDocumentArgs) {
  return prisma.document.update({
    where: { id },
    data: {
      name: data.name,
      description: data.description,
      type: data.type,
    },
  });
}

export function getDocument({ id }: Pick<TDocument, "id">) {
  return prisma.document.findFirst({
    where: { id },
    include: {
      packs: {
        include: {
          owner: true,
        },
      },
      owner: true,
    },
  });
}

export function getDocumentListItems({ userId }: { userId: User["id"] }) {
  return prisma.document.findMany({
    where: { userId },
    include: {
      packs: {
        include: {
          owner: true,
        },
      },
      owner: true,
    },
    orderBy: { updatedAt: "desc" },
  });
}

export function createDocument({
  name,
  description,
  type,
  userId,
}: Pick<TDocument, "name" | "description" | "type"> & {
  userId: User["id"];
}) {
  return prisma.document.create({
    data: {
      name,
      description,
      type,
      owner: {
        connect: {
          id: userId,
        },
      },
    },
  });
}

export function deleteDocument({
  id,
  userId,
}: Pick<TDocument, "id"> & { userId: User["id"] }) {
  return prisma.document.deleteMany({
    where: { id, userId },
  });
}
