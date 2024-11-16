import {
  Links,
  Meta,
  Outlet,
  Scripts,
  Link,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCatsDetails } from "./utils/fakeData";

export const loader = async () => {
  const data = await getCatsDetails();
  if (!data) {
    throw new Error("Failed to retrieve data");
  }
  return json({ cats: data });
};

export default function App() {
  const { cats } = useLoaderData<typeof loader>();

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
        <h1>Hello world!</h1>
        <nav>
          <ul>
            {cats.map((cat) => (
              <li key={cat.id}>
                <Link to={`/cats/${cat.id}`}>{`It's ${cat.name}`}</Link>
              </li>
            ))}
            <Outlet />
          </ul>
        </nav>

        <Scripts />
      </body>
    </html>
  );
}
