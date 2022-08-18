import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";

import { getUser } from "./session.server";
import { styled } from "./stitches.config";
import tailwindStylesheetUrl from "./styles/tailwind.css";
import {
  CenteredContainer,
  GappedBox,
  Topnav,
  useClientStyle,
} from "./ui-library";
import { useEffect } from "react";
import { UserContextManager } from "~/features/auth/utils/user-context";

// export const links: LinksFunction = () => {
//   return [{ rel: "stylesheet", href: tailwindStylesheetUrl }];
// };

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "Remix Notes",
  viewport: "width=device-width,initial-scale=1",
});

type LoaderData = {
  user: Awaited<ReturnType<typeof getUser>>;
};

export const loader: LoaderFunction = async ({ request }) => {
  return json<LoaderData>({
    user: await getUser(request),
  });
};

const Html = styled("html", {
  height: "100%",
});

const Body = styled("body", {
  height: "100%",
});

interface DocumentProps {
  children: React.ReactNode;
}

const Document = ({ children }: DocumentProps) => {
  const clientStyle = useClientStyle();

  useEffect(() => {
    clientStyle.reset();
  }, [clientStyle]);

  return (
    <Html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>docupack</title>
        <Meta />
        <Links />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <style
          id="stitches"
          dangerouslySetInnerHTML={{ __html: clientStyle.sheet }}
          suppressHydrationWarning
        />
        <style
          id="global"
          dangerouslySetInnerHTML={{
            __html: `
            * { margin: 0; padding: 0; }
            body {
              font-family: Inter, sans-serif;
              background: var(--colors-gray1);
            }
          `,
          }}
        />
      </head>
      <Body>
        {children}
        <ScrollRestoration />
        <Scripts />
        {process.env.NODE_ENV === "development" && <LiveReload />}
      </Body>
    </Html>
  );
};

export default function App() {
  const { user } = useLoaderData();
  return (
    <Document>
      <UserContextManager user={user}>
        <Topnav />
        <Outlet />
      </UserContextManager>
    </Document>
  );
}
