import { Link, useLoaderData } from "@remix-run/react";
import { CatDetails, getCatsDetails } from "~/model/CatsModel";
import TileCats from "~/components/CatTiles";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const loader = async () => {
  const data = await getCatsDetails();
  if (!data) {
    throw new Error("Failed to retrieve data");
  }
  const resp = Response.json({ cats: data });
  return resp;
};

export const action = async () => {
  // TODO - Create action
  return Response.json({});
};

export default function CatLayout() {
  const { cats } = useLoaderData<{ cats: CatDetails[] }>();
  console.log("I am loading cats", { amount: cats.length });

  const [searchText, setSearchText] = useState<string>("");

  const searchDebounce = useDebouncedCallback(
    (text) => setSearchText(text),
    500,
  );

  const handleOnSearch = (event: any) => {
    return searchDebounce(event.target.value);
  };

  const filteredCats = cats.filter((cat) =>
    cat.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  return (
    <>
      <form>
        <input
          type="search"
          id="search-cat"
          name="find-my-cat"
          placeholder="cat..."
          aria-label="Search through cats"
          onChange={handleOnSearch}
        />
      </form>
      <nav>
        <div className="tiles-layout">
          <div className="tile tile-add-cat enlarge-on-hover">
            <Link to={`/cats/new`}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M6 12H18M12 6V18"
                    stroke="#555555"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>{" "}
                </g>
              </svg>
              <p>Add a cat</p>
            </Link>
          </div>
          <TileCats cats={filteredCats} />
        </div>
      </nav>
    </>
  );
}
