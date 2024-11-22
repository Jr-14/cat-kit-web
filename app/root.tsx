import { Links, Meta, Outlet, Scripts, Link } from "@remix-run/react";

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
        <nav>
          <Link to={`/`}>Home</Link>
          <Link to={`/about`}>About</Link>
          <Link to={`/cats`}>Cats</Link>
          <Outlet />
        </nav>
        <Scripts />
      </body>
    </html>
  );
}
