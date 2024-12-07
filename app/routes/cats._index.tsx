import { Link, useLoaderData } from "@remix-run/react";
import { getCatsDetails } from "~/model/CatsModel";
import type { CatDetails, CatDetail } from "~/schemas/catSchema";
import TileCats from "~/components/CatTiles";
import { useMemo, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

export const loader = async () => {
  const data = await getCatsDetails();
  if (!data) {
    throw new Error("Failed to retrieve data");
  }
  return Response.json({ cats: data });
};

export const action = async () => {
  // TODO - Create action
  return Response.json({});
};

export default function CatLayout() {
  const { cats } = useLoaderData<{ cats: CatDetails }>();
  console.log("I am loading cats", { amount: cats.length });

  const [searchText, setSearchText] = useState<string>("");
  const [sortValue, setSortValue] = useState<string | null>(null);

  const catSortCompareFunction = (
    firstCat: CatDetail,
    secondCat: CatDetail,
  ): -1 | 0 | 1 => {
    switch (sortValue) {
      case "name":
        if (firstCat.name < secondCat.name) {
          return -1;
        } else if (firstCat.name > secondCat.name) {
          return 1;
        } else {
          return 0;
        }
      case "weight":
        if (firstCat.weight < secondCat.weight) {
          return -1;
        } else if (firstCat.weight > secondCat.weight) {
          return 1;
        } else {
          return 0;
        }
      default:
        if (firstCat.id < secondCat.id) {
          return -1;
        } else if (firstCat.id > secondCat.id) {
          return 1;
        } else {
          return 0;
        }
    }
  };

  const visibleCats = useMemo(() => {
    const filteredCats = searchText
      ? cats
          .filter((cat) =>
            cat.name.toLowerCase().includes(searchText.toLowerCase()),
          )
          .sort(catSortCompareFunction)
      : cats.sort(catSortCompareFunction);
    return filteredCats;
  }, [searchText, sortValue]);

  const searchDebounce = useDebouncedCallback((text) => {
    setSearchText(text);
  }, 500);

  const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = event.target.value;
    searchDebounce(searchValue);
  };

  const handleOnSortSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectValue = event.target.value;
    setSortValue(selectValue);
  };

  return (
    <>
      <input
        type="search"
        className="text-search"
        id="search-cat"
        name="find-my-cat"
        placeholder="cat..."
        aria-label="Search through cats"
        onChange={handleOnSearch}
      />
      <select
        name="sort-by"
        id="cat-tiles-sort-by"
        onChange={handleOnSortSelect}
        defaultValue="name"
      >
        <option value="name">Name</option>
        <option value="age">Age</option>
        <option value="dateOfBirth">Date of Birth</option>
        <option value="weight">Weight</option>
      </select>
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
          <TileCats cats={visibleCats} />
        </div>
      </nav>
    </>
  );
}
