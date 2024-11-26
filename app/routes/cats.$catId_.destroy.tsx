import type { ActionFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import assert from "assert";

import { deleteCatById } from "~/model/CatsModel";

export const action = async ({ params }: ActionFunctionArgs) => {
  assert(params.catId, "Missing contactId param");
  await deleteCatById(params.catId);
  return redirect("/cats");
};
