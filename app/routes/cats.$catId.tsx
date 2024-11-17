import { Form, useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getCatById } from "~/utils/fakeData";
import assert from "assert";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  assert(params.catId, "CatId required");
  const cat = await getCatById(params.catId);
  if (!cat) {
    throw new Response("Cat not found", { status: 404 });
  }
  return json({ cat });
};

export default function Cat() {
  const { cat } = useLoaderData<typeof loader>();

  return (
    <div id="cat">
      <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
      <p>Name: {cat.name ?? ""}</p>
      <p>Microchip: {cat.microchip ?? ""}</p>
      <p>Description: {cat.description ?? ""}</p>
      <p>Breed: {cat.breed ?? ""}</p>
      <p>Sex: {cat.sex ?? ""}</p>
      <p>Weight: {cat.weight ?? ""}</p>
      <p>
        Date of Birth:{" "}
        {cat.dateOfBirth ? new Date(cat.dateOfBirth).toDateString() : ""}
      </p>
      {cat.image && <img src={cat.image} alt={cat.name} />}
    </div>
  );
}
