import { json, redirect } from "@remix-run/node";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { updateCatById, getCatById } from "~/model/CatsModel";
import assert from "assert";
import { Form, useLoaderData, useNavigate } from "@remix-run/react";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  assert(params.catId, "Missing catId");
  const cat = await getCatById(params.catId);

  if (!cat) {
    throw new Response("Cat not found", { status: 404 });
  }

  return json({ cat });
};

export const action = async ({ params, request }: ActionFunctionArgs) => {
  console.log("sup");
  assert(params.catId, "Missing catId params");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await updateCatById(params.catId, updates);
  return redirect(`/cats/${params.catId}`);
};

export default function EditCat() {
  const { cat } = useLoaderData<typeof loader>();
  const navigate = useNavigate();

  return (
    <Form key={cat.id} method="post">
      <p>
        <span>Name: </span>
        <input
          aria-label="Name"
          defaultValue={cat.name}
          name="name"
          placeholder="Name"
          type="text"
        />
      </p>
      <p>
        <span>Microchip</span>
        <input
          aria-label="Microchip"
          defaultValue={cat.microchip ?? ""}
          name="microchip"
          placeholder="Microchip"
          type="text"
        />
      </p>
      <p>
        <span>Description</span>
        <input
          aria-label="Description"
          defaultValue={cat.description ?? ""}
          name="description"
          placeholder="Description"
          type="text"
        />
      </p>
      <p>
        <span>Breed</span>
        <input
          aria-label="Breed"
          defaultValue={cat.breed ?? ""}
          name="breed"
          placeholder="Breed"
          type="text"
        />
      </p>
      <p>
        <span>Sex</span>
        <input
          aria-label="Sex"
          defaultValue={cat.sex ? String(cat.sex) : ""}
          name="sex"
          placeholder="Sex"
          type="text"
        />
      </p>
      <p>
        <span>Weight</span>
        <input
          aria-label="weight"
          defaultValue={cat.weight ?? ""}
          name="Weight"
          placeholder="Weight"
          type="text"
        />
      </p>
      <p>
        <span>Date of Birth</span>
        <input
          aria-label="Date of Birth"
          defaultValue={cat.dateOfBirth ?? ""}
          name="dateOfBirth"
          placeholder="Date of Birth"
          type="text"
        />
      </p>
      <p>
        <button type="submit">Save</button>
        <button onClick={() => navigate(-1)} type="button">
          Cancel
        </button>
      </p>
    </Form>
  );
}
