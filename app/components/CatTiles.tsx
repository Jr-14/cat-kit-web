import React from "react";
import type { CatDetails } from "~/model/CatsModel";
import TileCat from "./CatTile";

type Props = {
  cats: CatDetails[];
};

const TileCats: React.FC<Props> = ({ cats }) => {
  return (
    <>
      <nav>
        <div className="tiles">
          {cats.map((cat) => (
            <TileCat cat={cat} />
          ))}
        </div>
      </nav>
    </>
  );
};

export default TileCats;
