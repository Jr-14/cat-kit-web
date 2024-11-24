import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCatsDetails } from "../utils/fakeData";
import TileCats from "~/components/CatTiles";
import AddCatTile from "~/components/AddCatTile";

export const loader = async () => {
  const data = await getCatsDetails();
  if (!data) {
    throw new Error("Failed to retrieve data");
  }
  return json({ cats: data });
};

export const action = async () => {
  // TODO - Create action
  return json({});
};

export default function CatLayout() {
  const { cats } = useLoaderData<typeof loader>();
  return (
    <nav>
      <div className="tiles-layout">
        <Form method="post">
          <AddCatTile />
        </Form>
        <TileCats cats={cats} />
      </div>
    </nav>
  );
}
