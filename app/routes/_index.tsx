import { Outlet } from "@remix-run/react";

export default function HomePage() {
  return (
    <>
      <div>
        <h1>Home</h1>
        <p>Just for fun</p>
      </div>

      <Outlet />
    </>
  );
}
