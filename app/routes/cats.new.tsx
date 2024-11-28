import React from "react";
import { ActionFunctionArgs, redirect } from "@remix-run/node";
import { Form, useNavigate, useLoaderData } from "@remix-run/react";
import { createCat, getCatById } from "~/model/CatsModel";
import { CreateNewCatSchema } from "~/schemas/catSchema";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  // TODO-JR: Validate form data has the necessary schema
  const formData = await request.formData();
  const newCatData = Object.fromEntries(formData);
  const parsedCatData = CreateNewCatSchema.parse(newCatData);
  const createdCat = await createCat(parsedCatData);
  return redirect(`/cats/${createdCat.id}`);
};

export const loader = async () => {
  return null;
};

const NewCat: React.FC = () => {
  const navigate = useNavigate();
  useLoaderData<typeof loader>();

  return (
    <Form method="post">
      <p>
        <span>Name: </span>
        <input
          aria-label="Name"
          defaultValue="Name..."
          name="name"
          placeholder="Name"
          type="text"
        />
      </p>
      <p>
        <span>Microchip</span>
        <input
          aria-label="Microchip"
          defaultValue="Microchip..."
          name="microchip"
          placeholder="Microchip"
          type="text"
        />
      </p>
      <p>
        <span>Description</span>
        <input
          aria-label="Description"
          defaultValue="Description..."
          name="description"
          placeholder="Description"
          type="text"
        />
      </p>
      <p>
        <span>Breed</span>
        <input
          aria-label="Breed"
          defaultValue="Breed..."
          name="breed"
          placeholder="Breed"
          type="text"
        />
      </p>
      <p>
        <span>Sex</span>
        <input
          aria-label="Sex"
          defaultValue="Sex..."
          name="sex"
          placeholder="Sex"
          type="text"
        />
      </p>
      <p>
        <span>Weight</span>
        <input
          aria-label="weight"
          defaultValue="Weight..."
          name="weight"
          placeholder="Weight"
          type="text"
        />
      </p>
      <p>
        <span>Date of Birth</span>
        <input
          aria-label="Date of Birth"
          defaultValue="Date of birth..."
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
};

export default NewCat;
