import {
  Button,
  CenteredContainer,
  Form,
  GappedBox,
  Input,
  Label,
  Link,
  Text,
} from "~/ui-library";
import { useActionData, useSearchParams } from "@remix-run/react";
import { createUserSession, getUserId } from "~/session.server";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { safeRedirect } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { useRef } from "react";

interface ActionData {
  errors?: {
    username?: string;
    password?: string;
  };
}

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");

  if (typeof username !== "string" || username.length < 3) {
    return json<ActionData>({
      errors: {
        username: "Username is too short",
      },
    });
  }
  if (typeof password !== "string" || password.length < 8) {
    return json<ActionData>({
      errors: {
        password: "Password is too short",
      },
    });
  }

  const user = await verifyLogin(username, password);
  if (!user) {
    return json<ActionData>({
      errors: {
        username: "Username or password is incorrect",
      },
    });
  }

  return createUserSession({
    request,
    userId: user.id,
    redirectTo,
    remember: true,
  });
};
const Login = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/documents";
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const actionData = useActionData<ActionData>();
  const fieldErrors = actionData?.errors;

  return (
    <CenteredContainer>
      <h1>Log in</h1>
      <Form method="post">
        <GappedBox css={{ flexDirection: "column" }}>
          <Label htmlFor="username">Username</Label>
          <Input
            ref={usernameRef}
            id="username"
            name="username"
            type="text"
            placeholder="iron-man"
            size={2}
          />
          {fieldErrors?.username && (
            <Text
              size={2}
              css={{
                marginTop: "0.3rem",
                marginBottom: "0.3rem",
                color: "$red11",
              }}
            >
              {fieldErrors.username}
            </Text>
          )}

          <Label htmlFor="password">Password</Label>
          <Input
            ref={passwordRef}
            id="password"
            size={2}
            name="password"
            placeholder="super-secret-password"
            type="password"
          />
          {fieldErrors?.password && (
            <Text
              size={2}
              css={{
                marginTop: "0.3rem",
                marginBottom: "0.3rem",
                color: "$red11",
              }}
            >
              {fieldErrors.password}
            </Text>
          )}

          <GappedBox css={{ flexDirection: "column" }}>
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button size="3" variant="green" type="submit">
              Login
            </Button>
          </GappedBox>
          <GappedBox css={{ justifyContent: "space-between" }}>
            <Button
              variant="orange"
              as={Link}
              to={{
                pathname: "/forgot-password",
                search: searchParams.toString(),
              }}
            >
              Forgot your password?
            </Button>
            <Button
              variant="blue"
              as={Link}
              to={{
                pathname: "/register",
                search: searchParams.toString(),
              }}
            >
              Don't you have an account? Register here.
            </Button>
          </GappedBox>
        </GappedBox>
      </Form>
    </CenteredContainer>
  );
};

export default Login;
