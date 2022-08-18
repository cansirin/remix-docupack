import React from "react";
import {
  Box,
  Button,
  CenteredContainer,
  Form,
  GappedBox,
  Input,
  Label,
} from "~/ui-library";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import {
  getDocument,
  TDocument,
  updateDocument,
} from "~/models/document.server";
import { useLoaderData, useTransition } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return null;
  const document = await getDocument({ id: params.id });
  return json({ document });
};

export const action: ActionFunction = async ({ request, params }) => {
  if (!params.id) return null;
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const type = formData.get("type");

  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof type !== "string"
  ) {
    return json(null, { status: 400 });
  }

  try {
    const document = await updateDocument({
      id: params.id,
      data: { name, description, type },
    });
    if (!document) return json(null, { status: 404 });
    return redirect(`/documents/${document.id}`);
  } catch {
    return json(null, { status: 500 });
  }
};

type LoaderData = {
  document: TDocument;
};

const EditDocumentPage = () => {
  const { document } = useLoaderData<LoaderData>();
  const transition = useTransition();

  return (
    <CenteredContainer>
      <Form method="post">
        <Label htmlFor="name">Name</Label>
        <Input id="name" name="name" size="2" defaultValue={document.name} />
        <Label htmlFor="description">Description</Label>
        <Input
          id="description"
          name="description"
          size="2"
          defaultValue={document.description}
        />
        <Label htmlFor="type">Type</Label>
        <Input id="type" name="type" size="2" defaultValue={document.type} />
        <Box>
          <Button size="2" type="submit" variant="green">
            {transition.submission ? "Processing..." : "Submit"}
          </Button>
        </Box>
      </Form>
    </CenteredContainer>
  );
};

export default EditDocumentPage;
