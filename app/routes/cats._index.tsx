import {
  Outlet,
  Link,
  useLoaderData,
  useViewTransitionState,
} from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCatsDetails } from "../utils/fakeData";

export const loader = async () => {
  const data = await getCatsDetails();
  if (!data) {
    throw new Error("Failed to retrieve data");
  }
  return json({ cats: data });
};

export default function CatLayout() {
  const { cats } = useLoaderData<typeof loader>();
  return (
    <nav>
      <ul>
        {cats.map((cat) => (
          <li key={cat.id}>
            {/* <Link to={`/cats/${cat.id}`} reloadDocument>{`It's ${cat.name}`}</Link> */}
            <Link to={`/cats/${cat.id}`}>
              <p>{`It's ${cat.name}`}</p>
              {cat.image && (
                <img src={cat.image} alt={cat.name} width="200" height="200" />
              )}
            </Link>
          </li>
        ))}
      </ul>
      <Outlet />
    </nav>
  );
}
