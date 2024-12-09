import { Form, useLoaderData } from "@remix-run/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { getCatById } from "~/model/CatsModel";
import CatPlaceholderIcon from "~/components/svg/CatPlaceholderIcon";
import assert from "assert";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  assert(params.catId, "CatId required");
  const cat = await getCatById(params.catId);
  if (!cat) {
    throw new Response("Cat not found", { status: 404 });
  }
  return Response.json({ cat });
};

export default function Cat() {
  const { cat } = useLoaderData<typeof loader>();

  return (
    <div id="cat">
      <Form action="edit">
        <button type="submit">Edit</button>
      </Form>
      <Form
        action="destroy"
        method="post"
        onSubmit={(event) => {
          const response = confirm(
            "Please confirm you want to delete the record",
          );
          if (!response) {
            event.preventDefault();
          }
        }}
      >
        <button type="submit">Delete</button>
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
      {cat.image ? (
        <img src={cat.image} alt={cat.name} />
      ) : (
        <CatPlaceholderIcon />
      )}
    </div>
  );
}
