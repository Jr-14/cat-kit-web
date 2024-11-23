import { Outlet } from "@remix-run/react";

export default function CatHomePage() {
  return (
    <>
      <h1>Home</h1>

      <Outlet />
    </>
  );
}
