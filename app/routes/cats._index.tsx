import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { getCatsDetails } from "../utils/fakeData";
import TileCats from "~/components/CatTiles";

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
    <div>
      <Form method="post">
        <button type="submit">New</button>
      </Form>
      <TileCats cats={cats} />
    </div>
  );
}
