import {
  Link,
  useActionData,
  useSearchParams,
  useTransition,
} from "@remix-run/react";
import {
  Button,
  CenteredContainer,
  Form,
  GappedBox,
  Input,
  Label,
  Text,
} from "~/ui-library";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { createUser, getUserByEmail } from "~/models/user.server";
import {
  safeRedirect,
  validateEmail,
  validatePassword,
  validateUsername,
} from "~/utils";
import { createUserSession, getUserId } from "~/session.server";
import { useEffect, useRef } from "react";

export const loader: LoaderFunction = async ({ request }) => {
  const userId = await getUserId(request);
  if (userId) return redirect("/");
  return json({});
};

interface ActionData {
  errors: {
    email?: string;
    password?: string;
    username?: string;
  };
}

export const action: ActionFunction = async ({ request, params }) => {
  const formData = await request.formData();
  const redirectTo = safeRedirect(formData.get("redirectTo"), "/");
  const username = formData.get("username");
  const password = formData.get("password");
  const email = formData.get("email");

  if (!validateUsername(username)) {
    return json<ActionData>(
      { errors: { username: "Username is invalid" } },
      { status: 400 }
    );
  }

  if (!validateEmail(email)) {
    return json<ActionData>(
      { errors: { email: "Email is invalid" } },
      { status: 400 }
    );
  }

  if (!validatePassword(password)) {
    return json<ActionData>(
      { errors: { password: "Password can't be less than 8 characters" } },
      { status: 400 }
    );
  }

  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    return json<ActionData>(
      { errors: { email: "A user already exists with this email" } },
      { status: 400 }
    );
  }

  const user = await createUser(email, password, username);

  return createUserSession({
    request,
    userId: user.id,
    remember: false,
    redirectTo,
  });
};

const Register = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? undefined;
  const transition = useTransition();
  const actionData = useActionData() as ActionData;
  const usernameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const fieldErrors = actionData?.errors;

  useEffect(() => {
    if (actionData?.errors?.username) {
      usernameRef.current?.focus();
    } else if (actionData?.errors?.email) {
      emailRef.current?.focus();
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus();
    }
  }, [actionData]);

  return (
    <CenteredContainer>
      <GappedBox css={{ flexDirection: "column", marginTop: 20 }}>
        <Form method="post">
          <GappedBox css={{ flexDirection: "column" }}>
            <Label>Username</Label>
            <Input
              ref={usernameRef}
              autoFocus={true}
              id="username"
              name="username"
              size={2}
              placeholder="Username"
              aria-invalid={fieldErrors?.username ? true : undefined}
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
            <Label>Email address</Label>
            <Input
              ref={emailRef}
              id="email"
              name="email"
              size={2}
              placeholder="Email address"
              aria-invalid={fieldErrors?.email ? true : undefined}
            />
            {fieldErrors?.email && (
              <Text
                size={2}
                css={{
                  marginTop: "0.3rem",
                  marginBottom: "0.3rem",
                  color: "$red11",
                }}
              >
                {fieldErrors.email}
              </Text>
            )}
            <Label>Password</Label>
            <Input
              ref={passwordRef}
              id="password"
              name="password"
              type="password"
              size={2}
              placeholder="Password"
              aria-invalid={fieldErrors?.password ? true : undefined}
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
            <input type="hidden" name="redirectTo" value={redirectTo} />
            <Button size="2" type="submit" variant="blue">
              {transition.submission ? "Processing..." : "Register"}
            </Button>
          </GappedBox>
        </Form>
        <GappedBox>
          <Button
            size="2"
            as={Link}
            to={{ pathname: "/login", search: searchParams.toString() }}
          >
            Already have an account?
          </Button>
        </GappedBox>
      </GappedBox>
    </CenteredContainer>
  );
};

export default Register;
