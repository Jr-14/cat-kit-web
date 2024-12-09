import React from "react";
import type { CatDetails } from "~/schemas/catSchema";
import TileCat from "./CatTile";

type Props = {
  cats: CatDetails;
};

const TileCats: React.FC<Props> = ({ cats }) => {
  return (
    <>
      {cats.map((cat) => (
        <TileCat cat={cat} key={cat.id} />
      ))}
    </>
  );
};

export default TileCats;
