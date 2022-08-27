import { json, LoaderFunction } from "@remix-run/node";
import { getDocument, TDocument } from "~/models/document.server";
import {
  Button,
  CenteredContainer,
  Form,
  Label,
  Link,
  Text,
} from "~/ui-library";
import { useLoaderData } from "@remix-run/react";

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.id) return null;
  const document = await getDocument({ id: params.id });
  return json({ document });
};

type LoaderData = {
  document: TDocument;
};

const SingleDocument = () => {
  const { document } = useLoaderData<LoaderData>();

  return (
    <CenteredContainer>
      <Form>
        <Label htmlFor="name">Name</Label>
        <Text id="name">{document.name}</Text>
        <Label htmlFor="description">Description</Label>
        <Text id="description">{document.description}</Text>
        <Label htmlFor="type">Type</Label>
        <Text id="type">{document.type}</Text>
      </Form>
      <Button
        size="2"
        variant="blue"
        as={Link}
        to={`/documents/${document.id}/edit`}
      >
        Edit
      </Button>
    </CenteredContainer>
  );
};

export default SingleDocument;
