import { Outlet } from "@remix-run/react";

export default function CatHomePage() {
  return (
    <>
      <h1>These are all your cats!</h1>

      <Outlet />
    </>
  );
}
