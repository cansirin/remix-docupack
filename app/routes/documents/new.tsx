import {
  Box,
  Button,
  CenteredContainer,
  Form,
  GappedBox,
  Input,
  Label,
} from "~/ui-library";
import type { ActionFunction } from "@remix-run/node";
import { json, redirect } from "@remix-run/node";
import { createDocument } from "~/models/document.server";
import { requireUserId } from "~/session.server";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get("name");
  const description = formData.get("description");
  const type = formData.get("type");

  if (!name || !description || !type) {
    return json(null, { status: 400 });
  }
  if (
    typeof name !== "string" ||
    typeof description !== "string" ||
    typeof type !== "string"
  ) {
    return json(null, { status: 400 });
  }

  const userId = await requireUserId(request);

  try {
    const document = await createDocument({ userId, name, description, type });
    return redirect(`/documents/${document.id}`);
  } catch {
    return json(null, { status: 500 });
  }
};

const NewDocumentPage = () => {
  return (
    <CenteredContainer>
      <Form method="post">
        <GappedBox css={{ flexDirection: "column", marginTop: 20 }}>
          <Label htmlFor="name">Name</Label>
          <Input id="name" name="name" size="2" />
          <Label htmlFor="description">Description</Label>
          <Input id="description" name="description" size="2" />
          <Label htmlFor="type">Type</Label>
          <Input id="type" name="type" size="2" />
          <Box>
            <Button size="2" type="submit" variant="green">
              Gönder
            </Button>
          </Box>
        </GappedBox>
      </Form>
    </CenteredContainer>
  );
};

export default NewDocumentPage;
