import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLoaderData,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { getData } from "./utils/fakeData";

export const loader = async () => {
  const data = await getData();
  if (!data) {
    throw new Error('Failed to retrieve data');
  }
  return json({ cat: data });
};

export default function App() {
  const { cat } = useLoaderData<typeof loader>();
  return (
    <html>
      <head>
        <link
          rel="icon"
          href="data:image/x-icon;base64,AA"
        />
        <Meta />
        <Links />
      </head>
      <body>
        <h1>Hello world!</h1>
        <div id="cat">
          <p>Name: {cat.name ?? ''}</p>
          <p>Microchip: {cat.microchip ?? ''}</p>
          <p>Description: {cat.description ?? ''}</p>
          <p>Breed: {cat.breed ?? ''}</p>
          <p>Sex: {cat.sex ?? ''}</p>
          <p>Date of Birth: {cat.dateOfBirth ? (new Date(cat.dateOfBirth)).toDateString() : ''}</p>
          {cat.image && <img src={cat.image} alt={cat.name} />} 
        </div>
        <Outlet />

        <Scripts />
      </body>
    </html>
  );
}