import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;

const AddCatTile: React.FC = ({}: Props) => {
  return (
    <button className="tile-add-cat enlarge-on-hover" type="submit">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
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
            stroke-width="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>{" "}
        </g>
      </svg>
      <p>Add a cat</p>
    </button>
  );
};

export default AddCatTile;
