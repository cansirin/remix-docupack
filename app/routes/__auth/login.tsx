import React from "react";
import {
  ActionFunction,
  json,
  LoaderFunction,
  redirect,
} from "@remix-run/node";
import { safeRedirect } from "~/utils";
import { verifyLogin } from "~/models/user.server";
import { createUserSession, getUserId } from "~/session.server";
import { Form, useActionData, useSearchParams } from "@remix-run/react";
import { GappedBox } from "~/ui-library";

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

const LoginPage = () => {
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "/documents";
  const actionData = useActionData<ActionData>();

  const fieldErrors = actionData?.errors;

  return (
    <GappedBox>
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-1 flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Log in
              </h2>
              <p className="max-w mt-2 text-sm text-gray-600">
                Do not you have an account?{" "}
                <a className="font-medium text-indigo-600 hover:text-indigo-500">
                  Sign up
                </a>
              </p>
            </div>
            {fieldErrors && (
              <div className="mt-6">
                <p>{fieldErrors.username}</p>
                <p>{fieldErrors.password}</p>
              </div>
            )}

            <div className="mt-8">
              <div className="mt-6">
                <Form method="post" className="space-y-6">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Username
                    </label>
                    <div className="mt-1">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="text"
                        placeholder="iron-man"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Password
                    </label>
                    <div className="mt-1">
                      <input
                        id="password"
                        name="password"
                        placeholder="super-secret-password"
                        type="password"
                        autoComplete="current-password"
                        required
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <a
                        href="#"
                        className="font-medium text-indigo-600 hover:text-indigo-500"
                      >
                        Forgot your password?
                      </a>
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      Log in
                    </button>
                    <input type="hidden" name="redirectTo" value={redirectTo} />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden w-0 flex-1 lg:block">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1505904267569-f02eaeb45a4c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
            alt=""
          />
        </div>
      </div>
    </GappedBox>
  );
};

export default LoginPage;
