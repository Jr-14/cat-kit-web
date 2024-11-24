import type { LinksFunction } from "@remix-run/node";
import { Links, Meta, Outlet, Scripts, Link } from "@remix-run/react";

import appStylesHref from "./app.css?url";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: appStylesHref },
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <body>
        <nav className="navigation-home">
          <Link to={`/`}>Home</Link>
          <Link to={`/about`}>About</Link>
          <Link to={`/cats`}>Cats</Link>
        </nav>
        <Outlet />
        <Scripts />
      </body>
    </html>
  );
}
