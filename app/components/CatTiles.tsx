import React from "react";
import type { CatDetails } from "~/model/CatsModel";
import TileCat from "./CatTile";

type Props = {
  cats: CatDetails[];
};

const TileCats: React.FC<Props> = ({ cats }) => {
  return (
    <>
      {cats.map((cat) => (
        <TileCat cat={cat} />
      ))}
    </>
  );
};

export default TileCats;
