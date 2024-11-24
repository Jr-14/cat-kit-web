import React from "react";
import { Link } from "@remix-run/react";
import { CatDetails } from "~/model/CatsModel";

type Props = {
  cat: CatDetails;
};

const TileCat: React.FC<Props> = ({ cat }) => {
  return (
    <div className="tile-cat">
      {/* <Link to={`/cats/${cat.id}`} reloadDocument>{`It's ${cat.name}`}</Link> */}
      <Link to={`/cats/${cat.id}`}>
        {cat.image && (
          <img src={cat.image} alt={cat.name} width="300" height="300" />
        )}
        <p>{`${cat.name}`}</p>
      </Link>
    </div>
  );
};

export default TileCat;
